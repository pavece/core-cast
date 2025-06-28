import { CompleteMultipartUploadCommand, CreateMultipartUploadCommand, S3Client, UploadPartCommand } from '@aws-sdk/client-s3';
import Redis from 'ioredis';
import 'dotenv/config';

import { RedisClient } from '../../infrastructure/database/redis';
import { ObjectStore } from '../../infrastructure/object-store/object-store';
import { ApiError } from '../errors/api-error';
import { ChunkData, PendingUpload, RedisUploadRecord } from '../interfaces/upload-interfaces';
import { Prisma } from '../../infrastructure/database/prisma';
import { PrismaClient } from '../../generated/prisma';

export class UploadService {
	private redisClient: Redis;
	private objectStoreClient: S3Client;
	private prismaClient: PrismaClient;

	constructor() {
		this.redisClient = new RedisClient().getClient();
		this.prismaClient = new Prisma().getClient();
		this.objectStoreClient = new ObjectStore().getClient();
	}

	public async initializeChunkedUpload(originalObjectName: string, totalChunks: number) {
		const objectName = crypto.randomUUID() + '-' + originalObjectName;

		try {
			const { UploadId } = await this.objectStoreClient.send(
				new CreateMultipartUploadCommand({ Bucket: process.env.OBJECT_STORE_PRIVATE_BUCKET || '', Key: objectName })
			);
			if (!UploadId) {
				throw new Error('Upload id is undefined');
			}

			await this.redisClient.hset(UploadId, { startedAt: new Date().toISOString(), totalChunks, objectName });
			await this.prismaClient.upload.create({ data: { multipartId: UploadId, user: 'TEMP USER' } });

			return UploadId;
		} catch (error) {
			console.error(`Failed to initialize multipart upload for object ${objectName}`, error);
			throw new ApiError(500, 'Failed to start multipart upload');
		}
	}

	public async uploadChunk(uploadId: string, chunkNumber: number, chunk: Buffer) {
		try {
			const redisUploadRecord = (await this.redisClient.hgetall(uploadId)) as unknown as RedisUploadRecord;
			if (!redisUploadRecord.objectName || !chunkNumber) {
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

			//Prevent same chunk / part reuploading
			const parts = await this.redisClient.lrange(`parts:${uploadId}`, 0, -1);
			if (!parts.find(p => Number(p.split(':')[1]) == chunkNumber || p.split(':')[0] == ETag)) {
				this.redisClient.rpush(`parts:${uploadId}`, `${ETag}:${chunkNumber}`);
			}

			return {
				message: `Chunk ${chunkNumber} uploaded`,
				uploaded: parts.length,
				total: Number(redisUploadRecord.totalChunks),
			};
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}

			console.error(`Chunk upload failed  for upload ${uploadId} chunk ${chunkNumber}`, error);
			throw new ApiError(500, 'Failed to upload chunk');
		}
	}

	public async finishChunkedUpload(uploadId: string) {
		try {
			const redisUploadRecord = (await this.redisClient.hgetall(uploadId)) as unknown as RedisUploadRecord;
			if (!redisUploadRecord) {
				throw new ApiError(404, 'Upload not found, the upload may be outdated');
			}

			const parts = (await this.redisClient.lrange(`parts:${uploadId}`, 0, -1))
				.map(p => ({ ETag: p.split(':')[0], PartNumber: Number(p.split(':')[1]) } as ChunkData))
				.sort((a, b) => a.PartNumber - b.PartNumber);

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

			await this.redisClient.del(uploadId);
			await this.redisClient.del(`parts:${uploadId}`);

			await this.prismaClient.upload.delete({ where: { multipartId: uploadId } });
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}

			console.error(`Upload completion failed for upload: ${uploadId}`, error);
			throw new ApiError(500, 'Failed to upload chunk');
		}
	}

	public async getPendingUploads(userId: string) {
		try {
			const pendingUploads = await this.prismaClient.upload.findMany();
			const modifiedPendingUploads: PendingUpload[] = [];

			//Chunks can arrive at any order, client must be aware of all the uploaded chunks so he can skip them
			for (const upload of pendingUploads) {
				const uploadedChunks = (await this.redisClient.lrange(`parts:${upload.multipartId}`, 0, -1)).map(p =>
					Number(p.split(':')[1])
				);

				modifiedPendingUploads.push({
					uploadedChunks: uploadedChunks,
					uploadId: upload.multipartId,
				});
			}

			return modifiedPendingUploads;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}

			console.error(`Failed to retrieve pending uploads for user: ${userId} `, error);
			throw new ApiError(500, 'Failed to retrieve pending uploads');
		}
	}
}
