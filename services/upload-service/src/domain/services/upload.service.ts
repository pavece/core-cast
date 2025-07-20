import { CompleteMultipartUploadCommand, CreateMultipartUploadCommand, UploadPartCommand } from '@aws-sdk/client-s3';
import 'dotenv/config';

import { ApiError } from '../errors/api-error';
import { Upload } from '@core-cast/types';

import { Logger } from '../logging/logger';
import { Prometheus } from '../logging/prometheus';

import { RabbitMQ } from '@core-cast/rabbitmq';
import { ObjectStore } from '@core-cast/object-store';
import {
	UploadRepository,
	VideoProcessingTaskRepository,
	MultipartUploadRepository,
	VideoRepository,
} from '@core-cast/repositories';

import { Prisma } from '@core-cast/prisma';
import { RedisClient } from '@core-cast/redis';

export class UploadService {
	private pendingUploadRepo = new UploadRepository(Prisma.getInstance().prismaClient);
	private videoProcessingTaskRepo = new VideoProcessingTaskRepository(Prisma.getInstance().prismaClient);
	private videoRepo = new VideoRepository(Prisma.getInstance().prismaClient);
	private multipartUploadRepo = new MultipartUploadRepository(RedisClient.getInstance().getClient());
	private objectStoreClient = ObjectStore.getInstance().s3Client;
	private rabbitMQ = RabbitMQ.getInstance();

	private logger = new Logger().getLogger();
	private prometheus = new Prometheus();

	private async validateUpload(videoId: string, userId: string) {
		const video = await this.videoRepo.getVideoById(videoId);
		const pendingUpload = await this.pendingUploadRepo.getPendingUploadByVideoId(videoId);

		if (video?.userId !== userId) {
			throw new ApiError(403, 'You are not the owner of this video');
		}
		if (video.hlsMaterList) {
			throw new ApiError(403, 'Video already contains media');
		}
		if (pendingUpload) {
			throw new ApiError(400, `Video contains a pending upload, please continue ${pendingUpload.multipartId}`);
		}
	}

	public async initializeChunkedUpload(
		originalObjectName: string,
		totalChunks: number,
		videoId: string,
		userId: string
	) {
		await this.validateUpload(videoId, userId);

		const objectName = crypto.randomUUID() + '-' + originalObjectName;

		try {
			const { UploadId } = await this.objectStoreClient.send(
				new CreateMultipartUploadCommand({ Bucket: process.env.OBJECT_STORE_PRIVATE_BUCKET || '', Key: objectName })
			);

			if (!UploadId) {
				throw new Error('Upload id is undefined');
			}

			await this.multipartUploadRepo.createMultipartUpload(UploadId, objectName, totalChunks, videoId);
			await this.pendingUploadRepo.createPendingUpload(UploadId, userId, videoId);

			this.logger.info({ message: 'New multupart upload init', partialUploadId: UploadId.slice(0, 20) + '(...)' });

			return UploadId;
		} catch (error) {
			this.logger.error({ message: `Failed to initialize multipart upload for object ${objectName}`, error });
			throw new ApiError(500, 'Failed to start multipart upload');
		}
	}

	//No need to check for upload ownsership
	//Upload ids are not public
	public async uploadChunk(uploadId: string, chunkNumber: number, chunk: Buffer) {
		try {
			const redisUploadRecord = await this.multipartUploadRepo.getMultipartUploadById(uploadId);
			if (!redisUploadRecord?.objectName || !chunkNumber) {
				throw new ApiError(404, 'Upload not found, the upload may be outdated');
			}

			//Upload the chunk to the bucket
			const { ETag } = await this.objectStoreClient.send(
				new UploadPartCommand({
					Bucket: process.env.OBJECT_STORE_PRIVATE_BUCKET,
					UploadId: uploadId,
					Body: chunk,
					Key: redisUploadRecord.objectName,
					PartNumber: chunkNumber,
				})
			);

			if (!ETag) {
				throw new Error('Failed to upload chunk');
			}

			//Prevent same chunk / part reuploading
			const parts = await this.multipartUploadRepo.getChunks(uploadId);
			if (!parts.find(p => p.PartNumber == chunkNumber || p.ETag == ETag)) {
				await this.multipartUploadRepo.addChunk(uploadId, chunkNumber, ETag);
			}

			this.prometheus.uploadBytesCounter?.inc(chunk.byteLength);
			this.prometheus.uploadChunksCounter?.inc();

			return {
				message: `Chunk ${chunkNumber} uploaded`,
				uploaded: parts.length + 1,
				total: Number(redisUploadRecord.totalChunks),
			};
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}

			this.logger.error({ message: `Chunk upload failed  for upload ${uploadId} chunk ${chunkNumber}`, error });
			throw new ApiError(500, 'Failed to upload chunk');
		}
	}

	public async finishChunkedUpload(uploadId: string) {
		try {
			const redisUploadRecord = await this.multipartUploadRepo.getMultipartUploadById(uploadId);
			if (!redisUploadRecord) {
				throw new ApiError(404, 'Upload not found, the upload may be outdated');
			}

			const parts = await this.multipartUploadRepo.getChunks(uploadId);
			if (parts.length != redisUploadRecord.totalChunks) {
				throw new ApiError(400, 'Upload all the chunks before completing the upload');
			}

			await this.objectStoreClient.send(
				new CompleteMultipartUploadCommand({
					Bucket: process.env.OBJECT_STORE_PRIVATE_BUCKET,
					Key: redisUploadRecord.objectName,
					UploadId: uploadId,
					MultipartUpload: {
						Parts: parts,
					},
				})
			);

			await this.multipartUploadRepo.deleteMultipartUpload(uploadId);
			await this.pendingUploadRepo.deletePendingUploadByMultipartId(uploadId);

			this.prometheus.uploadFilesCounter?.inc();

			//Create video processing task & send to queue
			const videoProcessingTask = await this.videoProcessingTaskRepo.createTask(
				redisUploadRecord.objectName,
				redisUploadRecord.videoId
			);
			const videoProcessingMessage: Upload.VideoProcessingTaskMessage = { processingTaskId: videoProcessingTask.id };

			this.rabbitMQ?.videoProcessingChannel?.sendToQueue(
				this.rabbitMQ.videoProcessingQueueName,
				Buffer.from(JSON.stringify(videoProcessingMessage)),
				{ persistent: true }
			);
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}

			this.logger.error({ message: `Upload completion failed for upload: ${uploadId}`, error });
			throw new ApiError(500, 'Failed to upload chunk');
		}
	}

	public async getPendingUploads(userId: string) {
		try {
			const pendingUploads = await this.pendingUploadRepo.getPendingUploadsByUser(userId);
			const modifiedPendingUploads: Upload.PendingUpload[] = [];

			//Chunks can arrive at any order, client must be aware of all the uploaded chunks so he can skip them
			for (const upload of pendingUploads) {
				const uploadedChunks = await this.multipartUploadRepo.getChunks(upload.multipartId);

				modifiedPendingUploads.push({
					uploadedChunks: uploadedChunks.map(c => c.PartNumber),
					uploadId: upload.multipartId,
				});
			}

			return modifiedPendingUploads;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}

			this.logger.error({ message: `Failed to retrieve pending uploads for user: ${userId}`, error });
			throw new ApiError(500, 'Failed to retrieve pending uploads');
		}
	}
}
