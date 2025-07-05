import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import path from 'path';

export async function generateThumbnail(videoUrl: string, currentMediaDir: string): Promise<string[]> {
	ffmpeg.setFfmpegPath(ffmpegPath.path);

	const outputPath = path.join(currentMediaDir, 'thumbnail.jpg');

	return new Promise((resolve, reject) => {
		ffmpeg(videoUrl)
			.outputOptions(['-preset veryfast'])
			.outputOptions(['-ss 00:00:05', '-vframes 1', '-q:v 1'])
			.output(outputPath)
			.on('end', () => resolve(['thumbnail.jpg']))
			.on('error', reject)
			.run();
	});
}
