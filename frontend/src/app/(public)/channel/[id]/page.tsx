import { getChannel } from '@/api/coreApi';
import React from 'react';
import { ChannelHeader } from './channel-header';
import { VideoCard } from '@/components/video/video-card';
import { Metadata } from 'next';

type Props = {
	params: Promise<{ id: string }>;
};

export async function  generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const { data: {user} } = await getChannel(id);

	return {
		title: "Channel - " + user.username,
		description: user.channelDescription,
		openGraph: {
			images: [user.channelCover || ""],
			description: user.channelDescription,
			title: "Channel - " + user.username
		}
	}
}

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
