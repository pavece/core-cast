import { ThumbsUp } from 'lucide-react';
import React from 'react';

type Props = {
	title: string;
	description: string;
	likes: number;
	views: number;
};

export const VideoInformationContainer = ({ title, description, likes, views }: Props) => {
	return (
		<div className='mt-2'>
			<div className='flex justify-between'>
				<h1 className='text-lg font-medium'>{title}</h1>
				<div className='bg-card flex gap-2 items-center text-md rounded-md p-2 text-md cursor-pointer'>
					<ThumbsUp className='w-6' /> {likes}
				</div>
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
