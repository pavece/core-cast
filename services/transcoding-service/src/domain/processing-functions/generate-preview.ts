import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import path from 'path';

export async function generatePreview(videoUrl: string, currentMediaDir: string) {
	ffmpeg.setFfmpegPath(ffmpegPath.path);

	return new Promise((resolve, reject) => {
		ffmpeg(videoUrl)
			.outputOptions(['-preset veryfast'])
			.outputOptions(['-ss 00:00:05', '-t 5', '-q:v 1', '-an'])
			.videoFilters(["scale='if(gt(iw,ih),-2,1280)':'if(gt(ih,iw),-2,720)'"]) //Downscale to a max of 1280*720 but keep aspect ratio
			.output(path.join(currentMediaDir, 'preview.mp4'))

			.on('end', resolve)
			.on('error', reject)
			.run();
	});
}
