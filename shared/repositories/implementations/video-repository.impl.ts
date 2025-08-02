import { PrismaClient, video } from '@core-cast/prisma';
import { VideoManagementResponses, VideoSearchRecord } from '@core-cast/types';
import {
	IVideoRepository,
	videoWithPartialUser,
	VideoWithProcessingTaskRecord,
} from '../types/video-repository.interface';

export class VideoRepository implements IVideoRepository {
	constructor(private prismaClient: PrismaClient) {}

	getUserVideosFull(userId: string): Promise<VideoWithProcessingTaskRecord[]> {
		return this.prismaClient.video.findMany({
			where: { userId },
			include: {
				videoProcessingTask: { select: { id: true } },
			},
		});
	}

	getFullVideoById(videoId: string): Promise<VideoWithProcessingTaskRecord | null> {
		return this.prismaClient.video.findUnique({
			where: { id: videoId },
			include: { videoProcessingTask: { select: { id: true } } },
		});
	}

	getVideoById(videoId: string): Promise<videoWithPartialUser | null> {
		return this.prismaClient.video.findUnique({
			where: { id: videoId },
			include: { uploadedBy: { select: { username: true, id: true, avatar: true } } },
		});
	}
	getUserVideos(userId: string): Promise<video[]> {
		return this.prismaClient.video.findMany({ where: { userId } });
	}
	createVideo(videoProps: VideoManagementResponses.IVideoCreationProps, userId: string): Promise<video> {
		return this.prismaClient.video.create({ data: { uploadedBy: { connect: { id: userId } }, ...videoProps } });
	}
	deleteVideo(videoId: string): Promise<video> {
		return this.prismaClient.video.delete({ where: { id: videoId } });
	}
	updateVideo(videoId: string, updates: Partial<video>): Promise<video> {
		return this.prismaClient.video.update({ where: { id: videoId }, data: { ...updates, updatedAt: new Date() } });
	}
	async getLatestPopularVideos(limit: number): Promise<VideoSearchRecord[]> {
		const result = await this.prismaClient.video.findMany({
			take: limit,
			where: { public: true, NOT: { hlsMaterList: null } },
			orderBy: [{ popularitScore: 'asc' }, { updatedAt: 'desc' }],
			include: { uploadedBy: { select: { username: true, id: true } } },
		});

		return result.map(v => {
			return { username: v.uploadedBy.username, ...v } as VideoSearchRecord;
		});
	}
	async getLatestVideos(limit: number): Promise<VideoSearchRecord[]> {
		const result = await this.prismaClient.video.findMany({
			take: limit,
			where: { public: true, NOT: { hlsMaterList: null } },
			orderBy: [{ updatedAt: 'desc' }],
			include: { uploadedBy: { select: { username: true, id: true } } },
		});

		return result.map(v => {
			return { username: v.uploadedBy.username, ...v } as VideoSearchRecord;
		});
	}
	async getMostPopularVideos(limit: number): Promise<VideoSearchRecord[]> {
		const result = await this.prismaClient.video.findMany({
			take: limit,
			where: { public: true, NOT: { hlsMaterList: null } },
			orderBy: [{ popularitScore: 'asc' }],
			include: { uploadedBy: { select: { username: true, id: true } } },
		});

		return result.map(v => {
			return { username: v.uploadedBy.username, ...v } as VideoSearchRecord;
		});
	}

	getUserPublicVideos(userId: string): Promise<video[]> {
		return this.prismaClient.video.findMany({ where: { userId, public: true, NOT: { hlsMaterList: null } } });
	}
}
