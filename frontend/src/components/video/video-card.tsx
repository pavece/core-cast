'use client';

import { cutString } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { Dot, User } from 'lucide-react';

type Props = {
	title: string;
	id: string;
	thumbnail: string;
	previewClip: string;
	username?: string;
	className?: string;
};

export const VideoCard = ({ thumbnail, title, username, id, previewClip, className }: Props) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [shouldLoad, setShouldLoad] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);
	const router = useRouter();

	const handleMouseEnter = () => {
		setIsHovered(true);
		if (!shouldLoad) setShouldLoad(true);

		setTimeout(() => {
			videoRef.current?.play().catch(() => {});
		}, 300);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		videoRef.current?.pause();
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
		}
	};

	const handleVideoLoaded = () => {
		setIsVideoLoaded(true);
	};

	return (
		<article
			className={`group flex flex-col w-full cursor-pointer border rounded-md bg-card ${className}`}
			onClick={() => router.push(`/video/${id}`)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className='relative w-full aspect-video rounded-t-md overflow-hidden'>
				<div className='absolute inset-0 bg-black/20 z-30 hover:opacity-0 transition-all duration-200' />

				<div
					className='absolute inset-0 bg-cover bg-center bg-no-repeat'
					style={{ backgroundImage: `url(${thumbnail})` }}
				/>

				<video
					ref={videoRef}
					className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
						isVideoLoaded && isHovered ? 'opacity-100' : 'opacity-0'
					}`}
					loop
					muted
					playsInline
					preload='none'
					onLoadedData={handleVideoLoaded}
					{...(shouldLoad ? { src: previewClip } : {})}
				/>
			</div>

			<div className='px-4 py-4 flex gap-1 flex-col'>
				<h3 className='text-foreground text-md line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-200 capitalize'>
					{cutString(title, 30)}
				</h3>

				<span className='text-sm text-muted-foreground'>{username}</span>
			</div>
		</article>
	);
};
