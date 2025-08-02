import { video } from '@core-cast/prisma';
import { IGenericApiResponse } from '.';

export interface GetChannelResponse extends IGenericApiResponse {
	user: {
		username: string;
		channelDescription: string;
		avatar: string | null;
		channelCover: string | null;
	};
	videos: video[];
}
