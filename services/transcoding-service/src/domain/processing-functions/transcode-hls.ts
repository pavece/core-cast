import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';

export async function transcodeHLS(
	videoUrl: string,
	currentMediaDir: string,
	verticalResolution: number,
	birtrateKbps: number
) {
	ffmpeg.setFfmpegPath(ffmpegPath.path);

	return new Promise((resolve, reject) => {
		ffmpeg(videoUrl)
			.on('error', reject)
            .videoCodec('libx264')
			.videoFilters([ `scale=-2:${verticalResolution}:force_original_aspect_ratio=decrease`, `pad=ceil(iw/2)*2:${verticalResolution}:(ow-iw)/2:(oh-ih)/2`])
            .outputOptions(['-preset veryfast', `-b:v ${birtrateKbps}K`, '-aspect 16:9'])
            .outputOptions(['-hls_time 6', '-hls_list_size 0', `-hls_segment_filename ${currentMediaDir}/segment-${verticalResolution}p-%03d.ts`])
			.output(`${currentMediaDir}/${verticalResolution}p.m3u8`)
			.on('end', resolve)
			.run();
	});
}
