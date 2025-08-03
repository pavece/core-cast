import { discoveryGetVideo, discoveryRelatedVideos, getVideoInteractions } from '@/api/coreApi';
import { RecommendationVideoCard } from '@/components/video/recomendation-video-card';
import { VideoInformationContainer } from '@/components/video/video-information-container';
import { VideoPlayer } from '@/components/video/video-player';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

type Props = {
	params: Promise<{ videoId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { videoId } = await params;

	const {
		data: { video },
	} = await discoveryGetVideo(videoId);

	return {
		title: 'Video - ' + video.title,
		description: video.description,
		openGraph: {
			images: [video.thumbnail || ''],
			description: video.description,
			title: video.title,
		},
	};
}

export default async function VideoPage({ params }: Props) {
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
						creatorAvatar={getVideoResponse.video.uploadedBy.avatar || ''}
						creatorName={getVideoResponse.video.uploadedBy.username}
						creatorId={getVideoResponse.video.uploadedBy.id}
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
