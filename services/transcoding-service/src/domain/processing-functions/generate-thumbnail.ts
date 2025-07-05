import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import path from 'path';

export async function generateThumbnail(videoUrl: string, currentMediaDir: string) {
	ffmpeg.setFfmpegPath(ffmpegPath.path);

	return new Promise((resolve, reject) => {
		ffmpeg(videoUrl)
			.outputOptions(['-preset veryfast'])
			.outputOptions(['-ss 00:00:05', '-vframes 1', '-q:v 2'])
			.output(path.join(currentMediaDir, 'thumbnail.png'))
			.on('end', resolve)
			.on('error', reject)
			.run();
	});
}
