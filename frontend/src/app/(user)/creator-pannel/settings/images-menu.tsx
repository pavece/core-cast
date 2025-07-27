'use client';

import { updateAvatar, updateCover } from '@/api/coreApi';
import { ImageUpload } from '@/components/ui/image-upload';
import React from 'react';
import { toast } from 'sonner';

type Props = {
	coverImage?: string | null;
	profilePicture?: string | null;
};

export const ImagesMenu = ({ coverImage, profilePicture }: Props) => {
	async function onUpdateCover(file: File) {
		await updateCover(file);
		toast.success('Channel cover updated');
	}

	async function onUpdateAvatar(file: File) {
		await updateAvatar(file);
		toast.success('Avatar updated');
	}

	return (
		<div>
			<h3 className='text-md font-medium mb-2'>Channel cover image</h3>
			<ImageUpload initialImageUrl={coverImage || ''} onFileChange={onUpdateCover} />
			<h3 className='text-md font-medium mt-5 mb-2'>Profile picture</h3>
			<ImageUpload
				initialImageUrl={profilePicture || ''}
				className='!w-[140px] !h-[140px]'
				onFileChange={onUpdateAvatar}
			/>
		</div>
	);
};
