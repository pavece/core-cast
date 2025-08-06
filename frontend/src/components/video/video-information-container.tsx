'use client';

import React, { useState } from 'react';
import { LikeButton } from './like-button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, Dot } from 'lucide-react';

type Props = {
	title: string;
	description: string;
	likes: number;
	views: number;
	videoId: string;
	creatorName: string;
	creatorAvatar: string;
	creatorId: string;
	createdAt: Date;
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
	createdAt,
}: Props) => {
	const router = useRouter();

	return (
		<div className='mt-6 space-y-6'>
			<div>
				<h1 className='text-xl font-bold text-foreground leading-tight capitalize'>{title}</h1>
			</div>

			<div className='flex items-center justify-between gap-4'>
				<div
					className='group flex items-center gap-3 bg-card hover:bg-muted/50 border border-border hover:border-primary/20 rounded-md px-4 py-3 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md flex-1 max-w-sm'
					onClick={() => router.push(`/channel/${creatorId}`)}
				>
					<Avatar className='w-10 h-10 ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300'>
						<AvatarImage src={creatorAvatar} className='object-cover' />
						<AvatarFallback className='bg-card text-white font-semibold'>
							{creatorName.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className='flex-1 min-w-0'>
						<h3 className='font-semibold text-foreground group-hover:text-primary transition-colors duration-300 truncate'>
							{creatorName}
						</h3>
						<p className='text-sm text-muted-foreground'>Creator</p>
					</div>
				</div>

				<div className='flex-shrink-0'>
					<LikeButton videoId={videoId} likes={likes} />
				</div>
			</div>

			<div className='bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
				<div className='flex items-center gap-2 mb-2 text-muted-foreground'>
					<div className='flex items-center gap-1'>
						<span className='text-foreground'>{new Date(createdAt).toLocaleDateString()}</span>
						<Dot />
						<div className='flex gap-1 items-center'>
							<span className='font-medium text-foreground'>{views}</span>
							<span className='text-muted-foreground'>views</span>
						</div>
					</div>
				</div>

				<div className='text-muted-foreground leading-relaxed transition-all duration-300'>{description}</div>
			</div>
		</div>
	);
};
