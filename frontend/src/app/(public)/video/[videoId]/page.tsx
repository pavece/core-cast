import { discoveryGetVideo, discoveryRelatedVideos } from '@/api/coreApi';
import { VideoPlayer } from '@/components/video/video-player';
import { notFound } from 'next/navigation';
import React from 'react';

type VideoPageProps = {
	params: Promise<{ videoId: string }>;
};

export default async function VideoPage({ params }: VideoPageProps) {
	const { videoId } = await params;
	try {
		const { data: getVideoResponse } = await discoveryGetVideo(videoId);
		const { data: getSimilarResponse } = await discoveryRelatedVideos(videoId);

		return (
			<section className='grid grid-cols-1 md:grid-cols-7'>
				<div className='col-span-5'>
					<VideoPlayer hlsMasterList={getVideoResponse.video.hlsMaterList!} />
				</div>
				<div></div>
			</section>
		);
	} catch (error) {
		console.log(error);
		notFound(); //TODO: Add video does not exists fallback
	}
}
