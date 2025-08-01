'use client';

import { discoveryGetVideo, getVideoInteractions } from '@/api/coreApi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { cutString } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
	videoId: string;
};

export const BasicInfoContainer = ({ videoId }: Props) => {
	const router = useRouter();
	const {
		data: videoData,
		isLoading,
		isError,
	} = useQuery({ queryFn: () => discoveryGetVideo(videoId), queryKey: ['video', videoId] });

	if (isLoading) {
		return <Loading />;
	}

	if (isError) return notFound();

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>{videoData?.data.video.title}</CardTitle>
				<CardDescription>{cutString(videoData?.data.video.description || '', 200)}</CardDescription>
			</CardHeader>
			<CardContent className='flex items-center justify-center'>
				<img src={videoData?.data.video.thumbnail || ''} alt='Video thumbnail' className='max-h-[300px] rounded-md' />
			</CardContent>
			<CardFooter>
				<Button onClick={() => router.push(`/video/${videoId}`)}>
					<Eye /> Watch video
				</Button>
			</CardFooter>
		</Card>
	);
};
