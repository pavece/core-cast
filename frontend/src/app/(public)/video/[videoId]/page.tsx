import { discoveryGetVideo, discoveryRelatedVideos, getVideoInteractions } from '@/api/coreApi';
import { RecommendationVideoCard } from '@/components/video/recomendation-video-card';
import { VideoInformationContainer } from '@/components/video/video-information-container';
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
		const { data: getVideoInteractionsResponse } = await getVideoInteractions(videoId);

		if (!getVideoResponse.video.hlsMaterList) return notFound();

		return (
			<section className='grid grid-cols-1 md:grid-cols-10 gap-4'>
				<div className='col-span-7'>
					<VideoPlayer hlsMasterList={getVideoResponse.video.hlsMaterList!} videoId={getVideoResponse.video.id} />
					<VideoInformationContainer
						videoId={videoId}
						title={getVideoResponse.video.title}
						description={getVideoResponse.video.description}
						likes={getVideoInteractionsResponse.interactions.likeCount as number}
						views={getVideoInteractionsResponse.interactions.viewCount as number}
					/>
				</div>
				<div className='col-span-3 flex gap-4 flex-col'>
					{getSimilarResponse.videos.map(v => {
						if (v.id !== getVideoResponse.video.id) {
							return <RecommendationVideoCard key={v.id} {...v} />;
						}
					})}
				</div>
			</section>
		);
	} catch (error) {
		notFound(); //TODO: Add video does not exist fallback
	}
}
