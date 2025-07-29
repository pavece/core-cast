'use client';

import { getPendingUploadByVideo } from '@/api/uploadApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loading } from '@/components/ui/loading';
import { useMultipartUpload } from '@/hooks/use-multipart-upload';
import { useQuery } from '@tanstack/react-query';
import { Upload } from 'lucide-react';
import { notFound } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

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
	const { onConfirmUpload, totalChunks, uploadedChunks, uploading } = useMultipartUpload(
		videoId,
		apiResponse?.data.upload || null
	);

	if (isLoading) return <Loading />;
	if (isError) notFound();

	const onUpload = async () => {
		if (!file) {
			toast.error('Please upload a file');
			return;
		}
		await onConfirmUpload(file);
	};

	return (
		<Card className='max-w-[550px] w-full'>
			<CardHeader>
				<CardTitle>Upload video</CardTitle>
				<CardDescription>Select a video file and upload it</CardDescription>
			</CardHeader>
			<CardContent>
				{uploading ? (
					<div className='mb-4'>
						<h1>Uploading, please wait</h1>
						<p>{(uploadedChunks / totalChunks) * 100} %</p>
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

				<Button className='w-full' disabled={file == null} onClick={onUpload}>
					<Upload /> Upload video
				</Button>
			</CardContent>
		</Card>
	);
};
