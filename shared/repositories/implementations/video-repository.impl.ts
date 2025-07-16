import { PrismaClient, video } from '@core-cast/prisma';
import { IVideoCreationProps } from '@core-cast/types';
import { IVideoRepository } from '../types/video-repository.interface';

export class VideoRepository implements IVideoRepository {
	constructor(private prismaClient: PrismaClient) {}

	getVideoById(videoId: string): Promise<video | null> {
		return this.prismaClient.video.findUnique({ where: { id: videoId } });
	}
	getUserVideos(userId: string): Promise<video[]> {
		return this.prismaClient.video.findMany({ where: { userId } });
	}
	createVideo(videoProps: IVideoCreationProps, userId: string): Promise<video> {
		return this.prismaClient.video.create({ data: { uploadedBy: { connect: { id: userId } }, ...videoProps } });
	}
	deleteVideo(videoId: string): Promise<video> {
		return this.prismaClient.video.delete({ where: { id: videoId } });
	}
	updateVideo(videoId: string, updates: Partial<IVideoCreationProps>): Promise<video> {
		return this.prismaClient.video.update({ where: { id: videoId }, data: { ...updates, updatedAt: new Date() } });
	}
}
