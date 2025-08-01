'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMultipartUpload } from '@/hooks/use-multipart-upload';
import { UploadSuccessCard } from './success';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { notFound } from 'next/navigation';
import { Loading } from '@/components/ui/loading';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { getPendingUploadByVideo } from '@/api/uploadApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
	videoId: string;
};

export const UploadVideoForm = ({ videoId }: Props) => {
	const {
		isLoading,
		data: apiResponse,
		isError,
	} = useQuery({ queryFn: () => getPendingUploadByVideo(videoId), queryKey: ['pendingUpload', videoId] });

	const [file, setFile] = useState<File | null>(null);
	const { onConfirmUpload, totalChunks, uploadedChunks, uploading, finished } = useMultipartUpload(
		videoId,
		apiResponse?.data.upload || null
	);

	const onUpload = async () => {
		if (!file) {
			toast.error('Please upload a file');
			return;
		}
		await onConfirmUpload(file);
	};

	if (isLoading) return <Skeleton className='w-full max-w-[550px] h-[300px]' />;
	if (isError) notFound();

	if (finished) return <UploadSuccessCard />;

	return (
		<Card className='max-w-[550px] w-full'>
			<CardHeader>
				<CardTitle>Upload video</CardTitle>
				<CardDescription>Select a video file and upload it</CardDescription>
			</CardHeader>
			<CardContent>
				{uploading ? (
					<div className='mb-4 flex items-center justify-center flex-col gap-2'>
						<p className='text-ms text-muted-foreground italic'>Uploading, please wait</p>
						<Progress value={(uploadedChunks / totalChunks) * 100} />
					</div>
				) : (
					<div className='mb-4'>
						<Label htmlFor='file-input' className='mb-2'>
							Video file
						</Label>
						<Input
							type='file'
							id='file-input'
							onChange={e => {
								setFile(e.target.files?.[0] || null);
							}}
						/>
					</div>
				)}

				<Button className='w-full' disabled={file == null || uploading} onClick={onUpload}>
					<Upload /> Upload video
				</Button>
			</CardContent>
		</Card>
	);
};
