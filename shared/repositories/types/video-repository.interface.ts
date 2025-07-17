import { video } from '@core-cast/prisma';
import { IVideoCreationProps } from '@core-cast/types';

export interface IVideoRepository {
	getVideoById(videoId: string): Promise<video | null>;
	getUserVideos(userId: string): Promise<video[]>;
	createVideo(videoProps: IVideoCreationProps, userId: string): Promise<video>;
	deleteVideo(videoId: string): Promise<video>;
	updateVideo(videoId: string, updates: Partial<video>): Promise<video>;
}
