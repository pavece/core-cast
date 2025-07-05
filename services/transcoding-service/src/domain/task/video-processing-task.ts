import { videoProcessingTask } from '@core-cast/prisma/generated/prisma';
import { VideoProcessingTaskRepository } from '../../infrastructure/repositories/video-task.repo.impl';
import { generateThumbnail } from '../processing-functions/generate-thumbnail';
import { generatePreview } from '../processing-functions/generate-preview';
import path from 'path';

import 'dotenv/config';
import fs from 'fs';
import { ObjectRepository } from '../../infrastructure/repositories/object.repository.impl';

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
	private objectRepo: ObjectRepository;

	constructor(videoProcessingRecordId: string) {
		this.videoProcessingRecordId = videoProcessingRecordId;
		this.videoProcessingTaskRepo = new VideoProcessingTaskRepository();
		this.objectRepo = new ObjectRepository();
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
		let resultPaths: string[] = [];

		try {
			resultPaths = [...resultPaths, ...(await generateThumbnail(this.presignedUrl, tempMediaDir))];
			resultPaths = [...resultPaths, ...(await generatePreview(this.presignedUrl, tempMediaDir))];

			await this.uploadResults(resultPaths, tempMediaDir, this.videoProcessingTaskRecord?.objectName!); //TODO: update to videoId when in place
		} finally {
			this.fsCleanup(tempMediaDir);
			this.objectCleanup();
		}
	}

	private async checkIfObjectExtsists() {
		const objectExists = await this.objectRepo.checkIfObjectExists(
			this.videoProcessingTaskRecord?.objectName!,
			this.privateBucket
		);

		if (!objectExists) throw new Error('The specified object does not exist, cannot run processing task');
	}

	//TODO: the video inside S3 must be inside a path named with the same id as the video record
	private async uploadResults(fileNames: string[], currentMediaPath: string, videoId: string) {
		const uploadPromises = [];

		for (const name of fileNames) {
			const uploadPromise = this.objectRepo.putObject(
				`${videoId}/${name}`,
				this.publicBucket,
				fs.readFileSync(path.join(currentMediaPath, name))
			);

			uploadPromises.push(uploadPromise);
		}

		await Promise.all(uploadPromises);
	}

	private async generatePresignedVideoUrl() {
		this.presignedUrl = await this.objectRepo.getPresignedUrl(
			this.videoProcessingTaskRecord?.objectName!,
			this.privateBucket
		);
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

	private async objectCleanup() {
		await this.objectRepo.deleteObject(this.videoProcessingTaskRecord?.objectName!, this.privateBucket);
	}
}
