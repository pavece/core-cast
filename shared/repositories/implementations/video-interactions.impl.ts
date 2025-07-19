import { PrismaClient } from '@core-cast/prisma';
import { IVideoInteractionsRepository, VideoInteractions } from '../types/video-interactions.type';

export class VideoInteractionsRepository implements IVideoInteractionsRepository {
	constructor(private prismaClient: PrismaClient) {}

	getVideoInteractions(videoId: string): Promise<VideoInteractions | null> {
		return this.prismaClient.videoInteractions.findFirst({ where: { videoId } });
	}
	async isVideoLiked(videoId: string, userId: string): Promise<boolean> {
		return !!(await this.prismaClient.videoLike.findUnique({ where: { videoId_userId: { videoId, userId } } }))?.videoId;
	}
	async addVideoLike(videoId: string, userId: string): Promise<void> {
		await this.prismaClient.videoLike.create({ data: { videoId, userId } });
	}
	async removeVideoLike(videoId: string, userId: string): Promise<void> {
		await this.prismaClient.videoLike.delete({ where: { videoId_userId: { videoId, userId } } });
	}
	createVideoInteractions(videoId: string): Promise<VideoInteractions> {
		return this.prismaClient.videoInteractions.create({ data: { likeCount: 0, viewCount: 0, videoId } });
	}
	updateVideoInteractions(videoId: string, viewCountDelta: number, likeCountDelta: number): Promise<VideoInteractions> {
		return this.prismaClient.videoInteractions.update({
			where: { videoId: videoId },
			data: { viewCount: { increment: viewCountDelta }, likeCount: { increment: likeCountDelta } },
		});
	}
}
