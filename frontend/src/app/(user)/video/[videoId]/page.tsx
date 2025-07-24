import React from 'react';

type VideoPageProps = {
	params: Promise<{ videoId: string }>;
};

export default async function VideoPage({ params }: VideoPageProps) {
	const { videoId } = await params;

	return <div>Video {videoId}</div>;
}
