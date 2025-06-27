import { CreateMultipartUploadCommand, S3Client, UploadPartCommand } from '@aws-sdk/client-s3';
import Redis from 'ioredis';
import 'dotenv/config';

import { RedisClient } from '../../infrastructure/database/redis';
import { ObjectStore } from '../../infrastructure/object-store/object-store';
import { ApiError } from '../errors/api-error';
import { ChunkData, RedisUploadRecord } from '../interfaces/upload-interfaces';

export class UploadService {
	private redisClient: Redis;
	private objectStoreClient: S3Client;

	constructor() {
		this.redisClient = new RedisClient().getClient();
		this.objectStoreClient = new ObjectStore().getClient();
	}

	public async initializeChunkedUpload(originalObjectName: string, totalChunks: number) {
		//TODO: Check auth before initiating the upload
		//TODO: Insert a new pending upload record relating to the multipart key (for resumable uploads)

		const objectName = crypto.randomUUID() + '-' + originalObjectName;

		try {
			const { UploadId } = await this.objectStoreClient.send(
				new CreateMultipartUploadCommand({ Bucket: process.env.OBJECT_STORE_PRIVATE_BUCKET || '', Key: objectName })
			);
			if (!UploadId) {
				throw new Error('Upload id is undefined');
			}

			this.redisClient.hset(UploadId, { startedAt: new Date().toISOString(), lastChunk: 0, totalChunks, objectName });

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

			const { ETag } = await this.objectStoreClient.send(
				new UploadPartCommand({
					Bucket: process.env.OBJECT_STORE_PRIVATE_BUCKET,
					UploadId: uploadId,
					Body: chunk,
					Key: redisUploadRecord.objectName,
					PartNumber: chunkNumber,
				})
			);

			const parts = (await this.redisClient.lrange(`parts:${uploadId}`, 0, -1)).map(p => JSON.parse(p));
			if (!parts.find(p => p.PartNumber == chunkNumber || p.ETag == ETag)) {
				this.redisClient.rpush(`parts:${uploadId}`, JSON.stringify({ ETag, PartNumber: chunkNumber } as ChunkData));
			}

			if (redisUploadRecord.lastChunk == chunkNumber) {
				//TODO: Close the upload
			}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}

			console.error(`Chunk upload failed  for upload ${uploadId} chunk ${chunkNumber}`, error);
			throw new ApiError(500, 'Failed to upload chunk');
		}
	}
}
