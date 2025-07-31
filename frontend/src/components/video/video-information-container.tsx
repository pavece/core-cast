'use client';

import React from 'react';
import { LikeButton } from './like-button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useRouter } from 'next/navigation';

type Props = {
	title: string;
	description: string;
	likes: number;
	views: number;
	videoId: string;
	creatorName: string;
	creatorAvatar: string;
	creatorId: string;
};

export const VideoInformationContainer = ({
	title,
	description,
	likes,
	views,
	videoId,
	creatorId,
	creatorAvatar,
	creatorName,
}: Props) => {
	const router = useRouter();

	return (
		<div className='mt-4'>
			<div>
				<h1 className='text-lg font-medium'>{title}</h1>
				<div className='flex justify-between mt-4'>
					<div
						className='rounded-full p-2 px-4 bg-card flex gap-2 items-center cursor-pointer border'
						onClick={() => router.push(`/channel/${creatorId}`)}
					>
						<Avatar>
							<AvatarImage src={creatorAvatar} />
							<AvatarFallback>{creatorName.slice(0, 2).toUpperCase()}</AvatarFallback>
						</Avatar>
						<h3 className='font-medium'>{creatorName}</h3>
					</div>
					<LikeButton videoId={videoId} likes={likes} />
				</div>
			</div>

			<div className='mt-4 w-full bg-card text-card-foreground p-4 rounded-md'>
				<h3 className='mb-2'>
					<span className='font-medium'>{views}</span> Views
				</h3>
				<p className='text-muted-foreground'>{description}</p>
			</div>
		</div>
	);
};
