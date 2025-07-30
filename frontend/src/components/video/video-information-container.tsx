import { ThumbsUp } from 'lucide-react';
import React from 'react';
import { LikeButton } from './like-button';

type Props = {
	title: string;
	description: string;
	likes: number;
	views: number;
	videoId: string;
};

export const VideoInformationContainer = ({ title, description, likes, views, videoId }: Props) => {
	return (
		<div className='mt-2'>
			<div className='flex justify-between'>
				<h1 className='text-lg font-medium'>{title}</h1>
				<LikeButton videoId={videoId} likes={likes} />
			</div>

			<div className='mt-4 w-full bg-card text-card-foreground p-4 rounded-md'>
				<h3 className='mb-2'>
					<span className='font-medium'>{views}</span> Views
				</h3>
				<p>{description}</p>
			</div>
		</div>
	);
};
