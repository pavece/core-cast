import { video } from '@core-cast/prisma';
import { IGenericApiResponse } from '.';
import { VideoSearchRecord } from '../search/video-search';

export type videoWithPartialUser = {
	uploadedBy: {
		username: string;
		avatar?: string | null;
		id: string;
	};
} & video;

export interface IGetFeedResponse extends IGenericApiResponse {
	videos: VideoSearchRecord[];
}

export interface ISearchVideoResponse extends IGenericApiResponse {
	videos: VideoSearchRecord[];
}

export interface IGetSimilarVideosResponse extends IGenericApiResponse {
	videos: VideoSearchRecord[];
}

export interface IGetVideoResponse extends IGenericApiResponse {
	video: videoWithPartialUser;
}
