export interface ChunkData {
	ETag: string;
	PartNumber: number;
}

export interface RedisUploadRecord {
	startedAt: Date;
	totalChunks: number;
	objectName: string;
}

export interface PendingUpload {
	uploadId: string;
	uploadedChunks: number[];
}

export interface VideoProcessingTask {
	videoName: string;
	// videoId: string //TODO: remove when implemented
}
