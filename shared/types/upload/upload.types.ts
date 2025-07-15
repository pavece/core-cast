export interface ChunkData {
	ETag: string;
	PartNumber: number;
}

export interface RedisUploadRecord {
	startedAt: string;
	totalChunks: number;
	objectName: string;
	videoId: string
}

export interface PendingUpload {
	uploadId: string;
	uploadedChunks: number[];
}

export interface VideoProcessingTaskMessage {
	processingTaskId: string;
}
