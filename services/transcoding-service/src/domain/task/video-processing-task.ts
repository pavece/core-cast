import { videoProcessingTask } from '@core-cast/prisma/generated/prisma';
import { VideoProcessingTaskRepository } from '@/infrastructure/repositories/video-task.repo.impl';

// 1. Get the object name from the database + update status to started
// 2. Get a presigned URL for the original video from the object store
// 3.1 Execute all the video processing subtask (thumbnail extraction, preview clip extraction, HLS transcoding)
// 3.2 Upload results to object store
// 3.3 Update video record to include those object urls
// 4. Remove original video from object store
// 5. Remove pending task record from DB + mark video record as fully processed

export class VideoProcessingTask {
	private videoProcessingRecordId: string;
	private videoProcessingTaskRecord: videoProcessingTask | undefined;

	private videoProcessingTaskRepo: VideoProcessingTaskRepository;

	constructor(videoProcessingRecordId: string) {
		this.videoProcessingRecordId = videoProcessingRecordId;
		this.videoProcessingTaskRepo = new VideoProcessingTaskRepository();
	}

	public async loadTaskData() {
		const videoProcessingRecord = await this.videoProcessingTaskRepo.markTaskAsStarted(this.videoProcessingRecordId);

		if (!videoProcessingRecord?.objectName) {
			throw new Error("Video processing task not found, can't start task");
		}

		this.videoProcessingTaskRecord = videoProcessingRecord;
	}

	public run() {
		if (!this.videoProcessingTaskRecord) throw new Error("Video processing task not found, can't start task");

		this.generatePresignedVideoUrl();
	}

	private generatePresignedVideoUrl() {}
}
