import { videoProcessingTask } from '@core-cast/prisma/generated/prisma';
import { VideoProcessingTaskRepository } from '../../infrastructure/repositories/video-task.repo.impl';
import { ObjectStore } from '@core-cast/object-store';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { generateThumbnail } from '../processing-functions/generate-thumbnail';
import path from 'path';

import 'dotenv/config';
import fs from 'fs';

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
	private presignedUrl: string | undefined;

	private privateBucket = process.env.OBJECT_STORE_PRIVATE_BUCKET || 'uploads';
	private publicBucket = process.env.OBJECT_STORE_PUBLIC_BUCKET || 'cdn';

	private videoProcessingTaskRepo: VideoProcessingTaskRepository;
	private objectStore: S3Client;

	constructor(videoProcessingRecordId: string) {
		this.videoProcessingRecordId = videoProcessingRecordId;
		this.videoProcessingTaskRepo = new VideoProcessingTaskRepository();
		this.objectStore = ObjectStore.getInstance().s3Client;
	}

	public async loadTaskData() {
		const videoProcessingRecord = await this.videoProcessingTaskRepo.markTaskAsStarted(this.videoProcessingRecordId);

		if (!videoProcessingRecord?.objectName) {
			throw new Error("Video processing task not found, can't start task");
		}

		this.videoProcessingTaskRecord = videoProcessingRecord;
	}

	public async run() {
		if (!this.videoProcessingTaskRecord) throw new Error("Video processing task not found, can't start task");

		await this.checkIfObjectExtsists();
		await this.generatePresignedVideoUrl();
		await this.runProcessingTasks();
	}

	private async runProcessingTasks() {
		if (!this.presignedUrl) throw new Error(`Presigned URL does not extsit for task, cannot process video`);
		const tempMediaDir = this.createTempVideoDir();

		try {
			await generateThumbnail(this.presignedUrl, tempMediaDir);
		} finally {
			//this.fsCleanup(tempMediaDir);
		}
	}

	private checkIfObjectExtsists() {
		const object = this.objectStore.send(
			new GetObjectCommand({ Bucket: this.privateBucket, Key: this.videoProcessingTaskRecord?.objectName })
		);

		if (!object) throw new Error('The specified object does not exist, cannot run processing task');
	}

	private async generatePresignedVideoUrl() {
		const command = new GetObjectCommand({
			Bucket: this.privateBucket,
			Key: this.videoProcessingTaskRecord?.objectName,
		});

		this.presignedUrl = await getSignedUrl(this.objectStore, command, {
			expiresIn: 60 * 60 * 24,
		});
	}

	private createTempVideoDir() {
		const tempDir = process.env.TEMP_DIR || path.join(__dirname, '../../../temp');
		const videoDir = path.join(tempDir, this.videoProcessingTaskRecord?.objectName!);

		if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
		if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir);

		return videoDir;
	}

	private fsCleanup(videoDir: string) {
		if (fs.existsSync(videoDir)) fs.rmSync(videoDir, { force: true, recursive: true });
	}
}
