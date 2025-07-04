import { RedisUploadRecord, ChunkData } from '@core-cast/types/upload/upload.types';
import { IMultipartUploadRepository } from '../../domain/interfaces/repositories/multipart-upload.type';
import { RedisClient } from '../database/redis';

export class MultipartUploadRepository implements IMultipartUploadRepository {
	private redisClient = new RedisClient().getClient();

	async createMultipartUpload(id: string, objectName: string, totalChunks: number): Promise<RedisUploadRecord> {
		const upload: RedisUploadRecord = { objectName, totalChunks, startedAt: new Date().toISOString() };
		await this.redisClient.hset(id, upload);
		return upload;
	}

	async getMultipartUploadById(id: string): Promise<RedisUploadRecord | null> {
		const result = await this.redisClient.hgetall(id);
		if (!result) return null;
		return result as unknown as RedisUploadRecord;
	}

	async deleteMultipartUpload(id: string): Promise<RedisUploadRecord | null> {
		const record = await this.getMultipartUploadById(id);
		if (!record) return null;

		await this.redisClient.del(id);
		await this.redisClient.del(`parts:${id}`);
		return record;
	}

	async getChunks(uploadId: string): Promise<ChunkData[]> {
		return (await this.redisClient.lrange(`parts:${uploadId}`, 0, -1))
			.map(p => ({ ETag: p.split(':')[0], PartNumber: Number(p.split(':')[1]) } as ChunkData))
			.sort((a, b) => a.PartNumber - b.PartNumber);
	}

	async addChunk(uploadId: string, chunkNumber: number, Etag: string): Promise<ChunkData> {
		await this.redisClient.rpush(`parts:${uploadId}`, `${Etag}:${chunkNumber}`);
		return { ETag: Etag, PartNumber: chunkNumber } as ChunkData;
	}
}
