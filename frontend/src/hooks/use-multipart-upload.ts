import { handleApiError } from '@/api/errors';
import { finishMultuipartUpload, initMultipartUpload, uploadChunk } from '@/api/uploadApi';
import { batchPromises } from '@/lib/utils';
import { Upload } from '@core-cast/types';
import { useEffect, useRef, useState } from 'react';

const CHUNK_SIZE_MB = 5;
const CHUNK_SIZE = 1024 * 1024 * CHUNK_SIZE_MB;

export const useMultipartUpload = (videoId: string, currentUpload: null | Upload.PendingUpload) => {
	const [uploadedChunks, setUploadedChunks] = useState(0);
	const [totalChunks, setTotalChunks] = useState(0);
	const [uploading, setUploading] = useState(false);
	const [finished, setFinished] = useState(false);
	const multipartIdRef = useRef<string>(currentUpload?.uploadId || '');

	useEffect(() => {
		multipartIdRef.current = currentUpload?.uploadId || '';
		setUploadedChunks(currentUpload?.uploadedChunks.length || 0);
	}, [currentUpload]);

	const onConfirmUpload = async (file: File) => {
		setUploading(true);
		const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
		setTotalChunks(totalChunks);

		if (!multipartIdRef.current) {
			try {
				multipartIdRef.current = await createMultipartUpload(file, videoId, totalChunks);
			} catch (error) {
				handleApiError(error);
			}
		}

		try {
			const uploadPromises = generateUploadPromises(file, totalChunks);
			await batchPromises(uploadPromises, 5);
			await finishMultuipartUpload(multipartIdRef.current);
		} catch (error) {
			handleApiError(error);
			setUploading(false);
		}

		setUploading(false);
		setFinished(true);
	};

	const generateUploadPromises = (file: File, totalChunks: number) => {
		const uploadPromises = [];

		for (let i = 0; i < totalChunks; i++) {
			if (currentUpload?.uploadedChunks.includes(i + 1)) continue;
			const chunk = file.slice(CHUNK_SIZE * i, CHUNK_SIZE * (i + 1));
			uploadPromises.push(
				uploadChunk(chunk, multipartIdRef.current || '', i + 1).then(r => setUploadedChunks(prev => prev + 1))
			);
		}

		return uploadPromises;
	};

	return { onConfirmUpload, uploadedChunks, totalChunks, uploading, finished };
};

const createMultipartUpload = async (file: File, videoId: string, totalChunks: number) => {
	const { data } = await initMultipartUpload({
		videoId,
		totalChunks,
		chunkSizeMiB: CHUNK_SIZE_MB,
		objectName: file.name,
	});

	return data.uploadId;
};
