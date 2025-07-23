import { IGenericApiResponse } from '.';
import { VideoInteractions } from './interaction-management.types';

export interface IGetVideoInteractionsResponse extends IGenericApiResponse {
	interactions: VideoInteractions;
}

export interface IGetPersonalVideoInteractionsResponse extends IGenericApiResponse {
	interactions: {
		videoLiked: boolean;
	};
}

export interface IToggleLikeResponse extends IGenericApiResponse {
	videoLiked: boolean;
}

export interface IViewVideoResponse extends IGenericApiResponse {}
