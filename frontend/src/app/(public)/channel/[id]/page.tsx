import { getChannel } from '@/api/coreApi';
import React from 'react';
import { ChannelHeader } from './channel-header';
import { VideoCard } from '@/components/video/video-card';

type Props = {
	params: Promise<{ id: string }>;
};

const ChannelPage = async ({ params }: Props) => {
	const { id } = await params;
	const { data } = await getChannel(id);

	return (
		<>
			<ChannelHeader {...data.user} />
			<section className='mt-8 grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(250px,_350px))] justify-center gap-4'>
				{data.videos.map(v => (
					<VideoCard {...v} thumbnail={v.thumbnail || ''} previewClip={v.previewClip || ''} key={v.id} skipCreator />
				))}
			</section>
		</>
	);
};

export default ChannelPage;
