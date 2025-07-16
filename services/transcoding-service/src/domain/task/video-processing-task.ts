import { videoProcessingTask } from '@core-cast/prisma/generated/prisma';
import { VideoProcessingTaskRepository } from '@core-cast/repositories';
import { generateThumbnail } from '../processing-functions/generate-thumbnail';
import { generatePreview } from '../processing-functions/generate-preview';
import path from 'path';

import 'dotenv/config';
import fs from 'fs';
import { ObjectRepository } from '../../infrastructure/repositories/object.repository.impl';
import { FfprobeData } from 'fluent-ffmpeg';
import { VideoValidator } from './video-validator.task';
import { transcodeHLS } from '../processing-functions/transcode-hls';
import { generateMasterList } from '../processing-functions/generate-masterlist';
import { batchPromises } from '../utils/promise-batcher';
import { Prisma } from '@core-cast/prisma';

const ABRLadder = [
	{ vr: 360, br: 700 },
	{ vr: 480, br: 1500 },
	{ vr: 720, br: 3000 },
	{ vr: 1080, br: 5500 },
];

export class VideoProcessingTask {
	private videoProcessingRecordId: string;
	private videoProcessingTaskRecord: videoProcessingTask | undefined;
	private presignedUrl: string | undefined;
	private videoInfo: FfprobeData | undefined;

	private privateBucket = process.env.OBJECT_STORE_PRIVATE_BUCKET || 'uploads';
	private publicBucket = process.env.OBJECT_STORE_PUBLIC_BUCKET || 'cdn';

	private videoProcessingTaskRepo: VideoProcessingTaskRepository;
	private objectRepo: ObjectRepository;
	private videoValidator: VideoValidator;

	constructor(videoProcessingRecordId: string) {
		this.videoProcessingRecordId = videoProcessingRecordId;
		this.videoProcessingTaskRepo = new VideoProcessingTaskRepository(Prisma.getInstance().prismaClient);
		this.objectRepo = new ObjectRepository();
		this.videoValidator = new VideoValidator('TEMP'); //TODO: Uopdate when video records are in place
	}

	public async loadTaskData() {
		const videoProcessingRecord = await this.videoProcessingTaskRepo.markTaskAsStarted(this.videoProcessingRecordId);

		if (!videoProcessingRecord?.objectName) {
			throw new Error("Video processing task not found, can't start task");
		}

		this.videoProcessingTaskRecord = videoProcessingRecord;
		await this.checkIfObjectExtsists();
		await this.generatePresignedVideoUrl();
		this.videoInfo = await this.videoValidator.validate(this.presignedUrl!);
	}

	public async runProcessingTasks() {
		if (!this.presignedUrl) throw new Error(`Presigned URL does not extsit for task, cannot process video`);

		const tempMediaDir = this.createTempVideoDir();

		try {
			await generateThumbnail(this.presignedUrl, tempMediaDir);
			await generatePreview(this.presignedUrl, tempMediaDir);
			await this.transcode(tempMediaDir);

			await this.uploadResults(tempMediaDir, this.videoProcessingTaskRecord?.objectName!); //TODO: update to videoId when in place
			await this.removeTaskRecord();
		} finally {
			this.fsCleanup(tempMediaDir);
			this.objectCleanup();
		}
	}

	private async transcode(tempMediaDir: string) {
		const originalVerticalResolution = this.videoInfo?.streams.find(s => s.codec_type == 'video')?.height || 0;
		const tiers = [];

		for (const tier of ABRLadder) {
			if (tier.vr > originalVerticalResolution) continue;
			await transcodeHLS(this.presignedUrl!, tempMediaDir, tier.vr, tier.br);
			tiers.push(tier);
		}

		generateMasterList(tempMediaDir, tiers);
	}

	private async checkIfObjectExtsists() {
		const objectExists = await this.objectRepo.checkIfObjectExists(
			this.videoProcessingTaskRecord?.objectName!,
			this.privateBucket
		);

		if (!objectExists) throw new Error('The specified object does not exist, cannot run processing task');
	}

	private async uploadResults(currentMediaPath: string, videoId: string) {
		const uploadPromises = [];

		const files = fs.readdirSync(currentMediaPath);

		for (const name of files) {
			const uploadPromise = this.objectRepo.putObject(
				`${videoId}/${name}`,
				this.publicBucket,
				fs.readFileSync(path.join(currentMediaPath, name))
			);

			uploadPromises.push(uploadPromise);
		}

		await batchPromises(uploadPromises, 20);
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

	private async updateVideoRecord() {
		//TODO: Check if the video is valid
		//TODO: Add thumbnail, masterlist and preview links to the video record + mark as processed
		//TODO: Generate Embeding and store into database
		//TODO: Add video search information to meilisearch
	}

	private async removeTaskRecord() {
		await this.videoProcessingTaskRepo.deleteTaskById(this.videoProcessingTaskRecord?.id!);
	}

	private fsCleanup(videoDir: string) {
		if (fs.existsSync(videoDir)) fs.rmSync(videoDir, { force: true, recursive: true });
	}

	private async objectCleanup() {
		await this.objectRepo.deleteObject(this.videoProcessingTaskRecord?.objectName!, this.privateBucket);
	}
}
