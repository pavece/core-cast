'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { deleteVideo } from '@/api/coreApi';
import { ExternalLink, Pen, Trash } from 'lucide-react';
import { DestructiveAction } from '../../../../components/ui/destructive-action';
import { Button } from '@/components/ui/button';
import { handleApiError } from '@/api/errors';
import { toast } from 'sonner';

type Props = {
	selectedVideoId: string | null;
};

export const VideoActions = ({ selectedVideoId }: Props) => {
	const router = useRouter();

	const onDeleteVideo = async () => {
		try {
			await deleteVideo(selectedVideoId || '');
			toast.success('Video removed');
		} catch (error) {
			handleApiError(error);
		}
	};

	return (
		<div className='flex gap-2'>
			<Button
				disabled={!selectedVideoId}
				onClick={() => {
					router.push(`/uploads/${selectedVideoId}`);
				}}
			>
				<Pen /> Edit
			</Button>
			<Button
				disabled={!selectedVideoId}
				onClick={() => {
					router.push(`/video/${selectedVideoId}`);
				}}
			>
				<ExternalLink /> Open
			</Button>
			<DestructiveAction action={onDeleteVideo}>
				<Button variant='destructive' disabled={!selectedVideoId}>
					<Trash /> Delete
				</Button>
			</DestructiveAction>
		</div>
	);
};
