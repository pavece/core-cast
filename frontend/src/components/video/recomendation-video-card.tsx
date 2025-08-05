'use client';

import { cutString } from '@/lib/utils';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

type Props = {
	title: string;
	id: string;
	thumbnail: string;
	previewClip: string;
	username: string;
};

export const RecommendationVideoCard = ({ thumbnail, title, username, id, previewClip }: Props) => {
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
			className='group flex gap-3 w-full cursor-pointer hover:bg-card transition-all duration-300 rounded-md bg-card border'
			onClick={() => router.push(`/video/${id}`)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className='relative w-[45%] min-w-[150px] aspect-video rounded-l-md overflow-hidden  flex-shrink-0'>
				<div
					className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105'
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

			<div className='flex-1 min-w-0 flex flex-col justify-start p-2'>
				<h3 className='font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-200 mb-1'>
					{cutString(title, 50)}
				</h3>

				<div className='flex items-center gap-2 mb-2'>
					<p className='text-sm text-muted-foreground truncate'>{username}</p>
				</div>
			</div>
		</article>
	);
};
