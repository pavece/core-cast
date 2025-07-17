import { video } from '@core-cast/prisma';
import { IVideoCreationProps } from '@core-cast/types';

export type videoWithPartialUser = {
	uploadedBy: {
		username: string;
		id: string;
	};
} & video;

export interface IVideoRepository {
	getVideoById(videoId: string): Promise<videoWithPartialUser | null>;
	getUserVideos(userId: string): Promise<video[]>;
	createVideo(videoProps: IVideoCreationProps, userId: string): Promise<video>;
	deleteVideo(videoId: string): Promise<video>;
	updateVideo(videoId: string, updates: Partial<video>): Promise<video>;
}
