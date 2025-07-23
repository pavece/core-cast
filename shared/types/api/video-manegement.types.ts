import { video } from '@core-cast/prisma';
import { IGenericApiResponse } from '.';

export interface IVideoCreationProps {
	title: string;
	description: string;
	public: boolean;
}

export interface IGetVideoResponse extends IGenericApiResponse {
	video: video;
}

export interface IGetVideosResponse extends IGenericApiResponse {
	videos: video[];
}

export interface ICreateVideoResponse extends IGenericApiResponse {
	video: video;
}

export interface IRemoveVideoResponse extends IGenericApiResponse {
	video: video;
}

export interface IUpdateVideoResponse extends IGenericApiResponse {
	video: video;
}
