'use client';

import React, { ChangeEvent, useState } from 'react';
import { Input } from './input';

type Props = {
	initialImageUrl?: string;
	className?: string;
	onFileChange: (file: File) => void;
};

export const ImageUpload = ({ initialImageUrl, className, onFileChange }: Props) => {
	const [currentImageUrl, setCurrentImageUrl] = useState(initialImageUrl);

	function onImageChange(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault();

		const file = e.target?.files?.[0];
		if (file) {
			setCurrentImageUrl(URL.createObjectURL(file));
			onFileChange(file);
		}
	}

	return (
		<div>
			<div
				className={`w-full h-[160px] bg-center bg-cover bg-no-repeat rounded-md ${className}`}
				style={{ backgroundImage: `url(${currentImageUrl})` }}
			></div>
			<p className='mt-4 mb-2 text-muted-foreground'>Update image</p>
			<Input type='file' accept='image' onChange={onImageChange} />
		</div>
	);
};
