'use client';

import { getPersonalVideoInteractions, giveLike } from '@/api/coreApi';
import { handleApiError } from '@/api/errors';
import { ThumbsUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type Props = {
	likes: number;
	videoId: string;
};

export const LikeButton = ({ likes, videoId }: Props) => {
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		const onGetPersonalInteractions = async () => {
			try {
				const { data } = await getPersonalVideoInteractions(videoId);
				setLiked(data.interactions.videoLiked);
			} catch {
				setLiked(false);
			}
		};
		onGetPersonalInteractions();
	}, []);

	const onLikeVideo = async () => {
		try {
			const { data } = await giveLike(videoId);
			setLiked(data.videoLiked);
		} catch (error) {
			handleApiError(error);
		}
	};

	return (
		<div
			className='bg-card flex gap-2 items-center text-md rounded-full px-4 p-2 text-md cursor-pointer border'
			onClick={onLikeVideo}
		>
			<ThumbsUp fill={liked ? 'white' : ''} className='w-6' /> {likes}
		</div>
	);
};
