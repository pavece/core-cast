import { video } from '@core-cast/prisma';
import { IGenericApiResponse } from '.';
import { VideoSearchRecord } from '../search/video-search';

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
	video: video;
}
