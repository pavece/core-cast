import { IGenericApiResponse } from '.';

export interface VideoInteractions {
	likeCount: Number;
	viewCount: Number;
}

interface ViewsRecord {
	time: string;
	views: number;
}

export interface IGetVideoStatsResponse extends IGenericApiResponse {
	generalInteractions: VideoInteractions;
	viewsDistribution: ViewsRecord[];
}
