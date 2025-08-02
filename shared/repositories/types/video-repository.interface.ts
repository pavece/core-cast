import { video } from '@core-cast/prisma';
import { VideoManagementResponses, VideoSearchRecord } from '@core-cast/types';

export type videoWithPartialUser = {
	uploadedBy: {
		username: string;
		avatar?: string | null;
		id: string;
	};
} & video;

export type VideoWithProcessingTaskRecord = {
	videoProcessingTask: {
		id: string;
	}[];
} & video;

export interface IVideoRepository {
	getVideoById(videoId: string): Promise<videoWithPartialUser | null>;
	getFullVideoById(videoId: string): Promise<VideoWithProcessingTaskRecord | null>;
	getUserVideos(userId: string): Promise<video[]>;
	getUserVideosFull(userId: string): Promise<VideoWithProcessingTaskRecord[]>;
	createVideo(videoProps: VideoManagementResponses.IVideoCreationProps, userId: string): Promise<video>;
	deleteVideo(videoId: string): Promise<video>;
	updateVideo(videoId: string, updates: Partial<video>): Promise<video>;

	//Video discovery
	getLatestPopularVideos(limit: number): Promise<VideoSearchRecord[]>;
	getLatestVideos(limit: number): Promise<VideoSearchRecord[]>;
	getMostPopularVideos(limit: number): Promise<VideoSearchRecord[]>;
	getUserPublicVideos(userId: string): Promise<video[]>;
}
