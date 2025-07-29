import { getPendingUploadByVideo } from '@/api/uploadApi';
import React from 'react';
import { UploadVideoForm } from './upload-video-form';

// Check if current video has media attached to it (if so throw error and go back to videos page)
// Check if there is a pending upload with that video id (pending API endpoint)
// Get the file and split into chunks
// If there is an upload calculate progress by counting uploaded chunks and total current chunks
// Push upload promises to promise array (skip already uploaded ones)
// Execute uploads in batches (with rate limiting)
// Once ended go to videos page (showing pending processing status)

type Props = {
	params: Promise<{ videoId: string }>;
};

const UploadVideoFilePage = async ({ params }: Props) => {
	const { videoId } = await params;

	return (
		<div className='flex items-center justify-center h-full w-full'>
			<UploadVideoForm videoId={videoId} />
		</div>
	);
};

export default UploadVideoFilePage;
