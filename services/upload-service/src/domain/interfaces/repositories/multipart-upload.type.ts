import { ChunkData, RedisUploadRecord } from '@core-cast/types/upload/upload.types';

export interface IMultipartUploadRepository {
	createMultipartUpload(id: string, objectName: string, totalChunks: number, videoId: string): Promise<RedisUploadRecord>;
	getMultipartUploadById(id: string): Promise<RedisUploadRecord | null>;
	deleteMultipartUpload(id: string): Promise<RedisUploadRecord | null>;
	addChunk(uploadId: string, chunkNumber: number, Etag: string): Promise<ChunkData>;
	getChunks(uploadId: string): Promise<ChunkData[]>;
}
