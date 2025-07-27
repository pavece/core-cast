'use client';

import { ImageUpload } from '@/components/ui/image-upload';
import React from 'react';

type Props = {
	coverImage?: string | null;
	profilePicture?: string | null;
};

export const ImagesMenu = ({ coverImage, profilePicture }: Props) => {
	return (
		<div>
			<h3 className='text-md font-medium mb-2'>Channel cover image</h3>
			<ImageUpload initialImageUrl={coverImage || ""} onFileChange={console.log} />
			<h3 className='text-md font-medium mt-5 mb-2'>Profile picture</h3>
			<ImageUpload initialImageUrl={profilePicture || ""} className='!w-[140px] !h-[140px]' onFileChange={console.log} />
		</div>
	);
};
