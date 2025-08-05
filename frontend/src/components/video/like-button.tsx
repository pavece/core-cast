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
		<button
			className={`group bg-card hover:bg-muted/50 border border-border hover:border-primary/20 
				flex items-center gap-3 rounded-md px-5 py-3 font-medium transition-all duration-300 
				shadow-sm hover:shadow-md cursor-pointer
				${liked ? 'bg-primary/5 border-primary/20' : ''}
			`}
			onClick={onLikeVideo}
		>
			<ThumbsUp
				fill={liked ? 'currentColor' : 'none'}
				className={`w-5 h-5 transition-colors duration-200 ${
					liked ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
				}`}
			/>
			<span
				className={`font-semibold transition-colors duration-200 ${
					liked ? 'text-primary' : 'text-foreground group-hover:text-primary'
				}`}
			>
				{likes}
			</span>
		</button>
	);
};
