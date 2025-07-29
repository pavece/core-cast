import { upload } from '@core-cast/prisma';
import { IGenericApiResponse } from '.';
import { PendingUpload } from '../upload/upload.types';

export interface IInitUploadResponse extends IGenericApiResponse {
	uploadId: string;
}

export interface IUploadChunkResponse extends IGenericApiResponse {
	uploaded: number;
	total: number;
}

export interface IFinishUploadResponse extends IGenericApiResponse {}

export interface IGetpendingUploadsResponse extends IGenericApiResponse {
	uploads: PendingUpload[];
}

export interface IGetpendingUploadByVideoIdResponse extends IGenericApiResponse {
	upload: PendingUpload;
}
