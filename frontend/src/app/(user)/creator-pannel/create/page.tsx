import React from 'react';
import { VideoCreationForm } from './video-creation-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CreateVideoPage = () => {
	return (
		<section className='flex flex-col gap-4 items-center justify-center h-full'>
			<Card className='max-w-[550px] w-full'>
				<CardHeader>
					<CardTitle>Create video</CardTitle>
					<CardDescription>Choose a title and description to start creating your video</CardDescription>
				</CardHeader>
				<CardContent>
					<VideoCreationForm />
				</CardContent>
			</Card>
		</section>
	);
};

export default CreateVideoPage;
