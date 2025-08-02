import { UploadResponses } from '@core-cast/types';
import axios from 'axios';

export const uploadApiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/upload',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

const serversideUploadApiClient = axios.create({
	baseURL: process.env.SERVER_SIDE_API + '/upload',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

const getAPIClient = () => {
	if (typeof window === 'undefined') {
		return serversideUploadApiClient;
	}
	return uploadApiClient;
};

export const getPendingUploadByVideo = (videoId: string) => {
	const apiClient = getAPIClient();

	return apiClient.get<UploadResponses.IGetpendingUploadByVideoIdResponse>(`/pending/video/${videoId}`);
};

export const initMultipartUpload = (params: {
	objectName: string;
	videoId: string;
	totalChunks: number;
	chunkSizeMiB: number;
}) => {
	const apiClient = getAPIClient();

	return apiClient.post<UploadResponses.IInitUploadResponse>('/init-upload', { ...params });
};

export const uploadChunk = (chunk: Blob, multipartId: string, chunkNumber: number) => {
	const apiClient = getAPIClient();

	const formData = new FormData();
	formData.append('chunk', chunk);

	return apiClient.put<UploadResponses.IUploadChunkResponse>('/upload-chunk', formData, {
		withCredentials: true,
		headers: {
			'Content-Type': 'multipart/form-data',
			'x-coreupload-upload-id': multipartId,
			'x-coreupload-chunk-number': chunkNumber,
		},
	});
};

export const finishMultuipartUpload = (multipartId: string) => {
	const apiClient = getAPIClient();

	return apiClient.post('/finish-upload', { uploadId: multipartId }, { withCredentials: true });
};
