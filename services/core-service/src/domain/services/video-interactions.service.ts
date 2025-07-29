import { Prisma } from '@core-cast/prisma';
import { RedisClient } from '@core-cast/redis';
import { VideoInteractionsRepository } from '@core-cast/repositories';

export class VideoInteractionsService {
	private redisClient = RedisClient.getInstance().getClient();
	private videoInteractionsRepository = new VideoInteractionsRepository(Prisma.getInstance().prismaClient);

	//TODO: Add cache
	public getVideoInteractions(videoId: string) {
		return this.videoInteractionsRepository.getVideoInteractions(videoId);
	}

	public async getPersonalVideoInteractions(videoId: string, userId: string) {
		const videoLiked = await this.videoInteractionsRepository.isVideoLiked(videoId, userId);
		return { videoLiked };
	}

	public async toggleVideoLike(videoId: string, userId: string) {
		const videoLiked = await this.videoInteractionsRepository.isVideoLiked(videoId, userId);

		await this.redisClient.incrby(`likes:${videoId}`, videoLiked ? -1 : 1);

		if (videoLiked) {
			await this.videoInteractionsRepository.removeVideoLike(videoId, userId);
			return { videoLiked: false };
		}

		await this.videoInteractionsRepository.addVideoLike(videoId, userId);
		return { videoLiked: true };
	}

	public async registerView(videoId: string) {
		await this.redisClient.incr(`views:${videoId}`);
	}
}
