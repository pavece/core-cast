export interface ChunkData {
	ETag: string;
	PartNumber: number;
}

export interface RedisUploadRecord {
	startedAt: Date;
	totalChunks: number;
	objectName: string;
}
