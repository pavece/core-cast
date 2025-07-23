import { VideoManagementResponses } from '@core-cast/types';
import { VideoInteractionsRepository, VideoRepository } from '@core-cast/repositories';
import { ApiError } from '../errors/api-error';
import { Prisma } from '@core-cast/prisma';
import { Meili } from '@core-cast/meilisearch';
import { Qdrant } from '@core-cast/qdrant';
import { ObjectStore } from '@core-cast/object-store';

export class VideoManagementService {
	private videoRepository = new VideoRepository(Prisma.getInstance().prismaClient);
	private videoInteractionsRepository = new VideoInteractionsRepository(Prisma.getInstance().prismaClient);
	private milisearchCilent = Meili.getInstance().getClient();
	private qdrantClient = Qdrant.getInstance().getClient();
	private objectStore = ObjectStore.getInstance().s3Client;

	public async getVideo(userId: string, videoId: string) {
		const video = await this.videoRepository.getVideoById(videoId);
		if (!video?.id) throw new ApiError(404, 'Video not found');
		if (video?.userId !== userId) throw new ApiError(403, 'You dont own this video');

		return video;
	}

	public getVideos(userId: string) {
		return this.videoRepository.getUserVideos(userId);
	}

	public async createVideo(userId: string, videoProps: VideoManagementResponses.IVideoCreationProps) {
		const video = await this.videoRepository.createVideo(videoProps, userId);
		await this.videoInteractionsRepository.createVideoInteractions(video.id);

		return video;
	}

	public async removeVideo(userId: string, videoId: string) {
		const video = await this.getVideo(userId, videoId); //Check ownership

		try {
			//Silently ignore if records don't exist here
			await this.milisearchCilent.deleteIndex(videoId);
			await this.qdrantClient.delete('videos', { points: [videoId] }).catch();
		} catch {}

		await this.videoRepository.deleteVideo(videoId);
		return video;
	}

	public async updateVideo(
		userId: string,
		videoId: string,
		videoProps: Partial<VideoManagementResponses.IVideoCreationProps>
	) {
		await this.getVideo(userId, videoId); //Check ownership

		return await this.videoRepository.updateVideo(videoId, videoProps);
	}
}
