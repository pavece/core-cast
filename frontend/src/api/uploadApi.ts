import { Upload, UploadResponses } from '@core-cast/types';
import axios from 'axios';

export const uploadApiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/upload',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const getPendingUploadByVideo = (videoId: string) => {
	return uploadApiClient.get<UploadResponses.IGetpendingUploadByVideoIdResponse>(`/pending/video/${videoId}`, {
		withCredentials: true,
	});
};

export const initMultipartUpload = (params: {
	objectName: string;
	videoId: string;
	totalChunks: number;
	chunkSizeMiB: number;
}) => {
	return uploadApiClient.post<UploadResponses.IInitUploadResponse>(
		'/init-upload',
		{ ...params },
		{ withCredentials: true }
	);
};

export const uploadChunk = (chunk: Blob, multipartId: string, chunkNumber: number) => {
	const formData = new FormData();
	formData.append('chunk', chunk);

	return uploadApiClient.put<UploadResponses.IUploadChunkResponse>('/upload-chunk', formData, {
		withCredentials: true,
		headers: {
			'Content-Type': 'multipart/form-data',
			'x-coreupload-upload-id': multipartId,
			'x-coreupload-chunk-number': chunkNumber,
		},
	});
};

export const finishMultuipartUpload = (multipartId: string) => {
	return uploadApiClient.post('/finish-upload', { uploadId: multipartId }, { withCredentials: true });
};
