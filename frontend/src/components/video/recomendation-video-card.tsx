'use client';

import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

type Props = {
	title: string;
	id: string;
	thumbnail: string;
	previewClip: string;
	description: string;
	username: string;
};

export const RecommendationVideoCard = ({ thumbnail, title, description, username, id, previewClip }: Props) => {
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
		<article className='flex gap-2 w-full cursor-pointer' onClick={() => router.push(`/video/${id}`)}>
			<div
				className='w-[40%]  aspect-video rounded-md !bg-cover !bg-center bg-no-repeat'
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
				<h2 className='text-md font-medium'>{title}</h2>
				<p className='text-sm text-muted-foreground'>{description}</p>
				<p className='mt-2 text-muted-foreground flex gap-1'>
					<User className='w-5' />
					{username}
				</p>
			</div>
		</article>
	);
};
