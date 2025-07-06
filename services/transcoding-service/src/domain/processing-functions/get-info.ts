import ffmpeg, { FfprobeData } from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';

export async function getVideoInfo(videoUrl: string): Promise<FfprobeData> {
	ffmpeg.setFfmpegPath(ffmpegPath.path);

	return new Promise((resolve, reject) => {
		ffmpeg.ffprobe(videoUrl, (err, metadata) => {
			if (err) reject(err);

			resolve(metadata);
		});
	});
}
