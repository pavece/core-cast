import { Meili } from '@core-cast/meilisearch';
import { Prisma } from '@core-cast/prisma';
import { Qdrant } from '@core-cast/qdrant';
import { VideoRepository } from '@core-cast/repositories';
import { ApiError } from '../errors/api-error';
import { VideoSearchRecord } from '@core-cast/types';

export class VideoDiscoveryService {
	private meilisearchClient = Meili.getInstance().getClient();
	private qdrantClient = Qdrant.getInstance().getClient();
	private videoRepository = new VideoRepository(Prisma.getInstance().prismaClient);

	//Should be cached
	private async buildColdStartFeed() {
		const videos: { [videoId: string]: VideoSearchRecord } = {};

		const trendingVideos = await this.videoRepository.getLatestPopularVideos(20);
		const latestVideos = await this.videoRepository.getLatestVideos(10);

		trendingVideos.forEach(v => (videos[v.id] = v));
		latestVideos.forEach(v => (videos[v.id] = v));

		return Object.values(videos);
	}

	//Could be cached
	private buildWarmFeed(seenVideos: string[]) {}

	public async buildFeed(seenVideos?: string[]) {
		if (!seenVideos || seenVideos.length == 0) {
			return await this.buildColdStartFeed();
		}

		return await this.buildWarmFeed(seenVideos);
	}

	public async searchVideo(query: string) {
		const { hits } = await this.meilisearchClient.index('videos').search(query, { limit: 20 });
		return hits;
	}

	public async getSimilarVideos(videoId: string) {
		const { points } = await this.qdrantClient.query('videos', { query: videoId, with_payload: true });
		return points.map(p => p.payload);
	}

	public async getVideo(videoId: string) {
		const video = await this.videoRepository.getVideoById(videoId);
		if (!video) throw new ApiError(404, 'Video not found');

		return video;
	}
}
