import { IVideoCreationProps } from '@core-cast/types';
import { VideoInteractionsRepository, VideoRepository } from '@core-cast/repositories';
import { ApiError } from '../errors/api-error';
import { Prisma } from '@core-cast/prisma';

export class VideoManagementService {
	private videoRepository = new VideoRepository(Prisma.getInstance().prismaClient);
	private videoInteractionsRepository = new VideoInteractionsRepository(Prisma.getInstance().prismaClient);

	public async getVideo(userId: string, videoId: string) {
		const video = await this.videoRepository.getVideoById(videoId);
		if (!video?.id) throw new ApiError(404, 'Video not found');
		if (video?.userId !== userId) throw new ApiError(403, 'You dont own this video');

		return video;
	}

	public getVideos(userId: string) {
		return this.videoRepository.getUserVideos(userId);
	}

	public async createVideo(userId: string, videoProps: IVideoCreationProps) {
		const video = await this.videoRepository.createVideo(videoProps, userId);
		await this.videoInteractionsRepository.createVideoInteractions(video.id);

		return video;
	}

	public async removeVideo(userId: string, videoId: string) {
		const video = await this.getVideo(userId, videoId); //Check ownership

		//TODO: Remove media from object store
		//TODO: Remove pending tasks
		//TODO: Remove meilisearch and qdrant records

		await this.videoRepository.deleteVideo(videoId);
		return video;
	}

	public async updateVideo(userId: string, videoId: string, videoProps: Partial<IVideoCreationProps>) {
		await this.getVideo(userId, videoId); //Check ownership

		return await this.videoRepository.updateVideo(videoId, videoProps);
	}
}
