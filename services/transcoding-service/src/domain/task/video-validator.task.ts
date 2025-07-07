import { FfprobeData } from 'fluent-ffmpeg';
import { getVideoInfo } from '../processing-functions/get-info';

export class VideoValidator {
	private videoRecordId: string;
	private videoMetadata: FfprobeData | undefined;

	constructor(videoRecordId: string) {
		this.videoRecordId = videoRecordId;
	}

	public async validate(videoUrl: string) {
		this.videoMetadata = await getVideoInfo(videoUrl);

		try {
			this.validateGeneralFormat();
			this.validateResolution();
			this.validateDuration();
		} catch (error) {
			//TODO: Update database record to notify the error
			throw error;
		}

		return this.videoMetadata;
	}

	//Must include at least one video & audio channel
	private validateGeneralFormat() {
		if (this.videoMetadata?.streams.length || 0 < 2) {
			throw new Error('Video must include at least one audio and video stream ');
		}

		const audioStream = this.videoMetadata?.streams.find(s => s.codec_type == 'audio');
		const videoStream = this.videoMetadata?.streams.find(s => s.codec_type == 'video');

		if (!audioStream) {
			throw new Error('Video must incldue an audio stream');
		}

		if (!videoStream) {
			throw new Error('Video must include a video stream');
		}
	}

	//Must have at least 640 * 360 (360p)
	private validateResolution() {
		const videoStream = this.videoMetadata?.streams.find(s => s.codec_type == 'video');

		if ((videoStream?.width || 0) < 640 || (videoStream?.height || 0) < 360) {
			throw new Error(`Video must have at least 640x360 resolution`);
		}
	}

	//Must be at least 10s long
	private validateDuration() {
		if (this.videoMetadata?.format.duration || 0 < 10) {
			throw new Error('Video must be at least 10s long');
		}
	}
}
