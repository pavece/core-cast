import { CreateMultipartUploadCommand, S3Client } from '@aws-sdk/client-s3';
import Redis from 'ioredis';
import 'dotenv/config';

import { RedisClient } from '../../infrastructure/database/redis';
import { ObjectStore } from '../../infrastructure/object-store/object-store';

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

			this.redisClient.hset(UploadId, { startedAt: new Date().toISOString(), lastChunk: 0, totalChunks, parts: [] });

			return UploadId;
		} catch (error) {
			console.error(`Failed to initialize multipart upload for object ${objectName}`, error);
		}
	}
}
