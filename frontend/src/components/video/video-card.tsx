'use client';

import { cutString } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { CSSProperties, useRef, useState } from 'react';

type Props = {
	title: string;
	id: string;
	thumbnail: string;
	previewClip: string;
	description: string;
	username: string;
	className?: string;
};

export const VideoCard = ({ thumbnail, title, description, username, id, previewClip, className }: Props) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [shouldLoad, setShouldLoad] = useState(false);
	const router = useRouter();

	const handleMouseEnter = () => {
		if (!shouldLoad) setShouldLoad(true);

		setTimeout(() => {
			videoRef.current?.play().catch(() => {});
		}, 0);
	};

	const handleMouseLeave = () => {
		videoRef.current?.pause();
		videoRef.current!.currentTime = 0;
	};

	return (
		<article
			className={`flex gap-2 w-full flex-col cursor-pointer ${className}`}
			onClick={() => router.push(`/video/${id}`)}
		>
			<div
				className='w-full aspect-video rounded-md !bg-cover !bg-center bg-no-repeat'
				style={{ background: `url(${thumbnail})` }}
			>
				<video
					ref={videoRef}
					className='w-full h-full rounded-md'
					loop
					muted
					playsInline
					preload='none'
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					{...(shouldLoad ? { src: previewClip } : {})}
				></video>
			</div>
			<div>
				<h2 className='text-md font-medium'>{cutString(title, 35)}</h2>
				<p className='text-sm text-muted-foreground'>{cutString(description, 30)}</p>
				<p className='mt-1 text-muted-foreground flex gap-1 italic'>{username}</p>
			</div>
		</article>
	);
};
