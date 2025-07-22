import { Meili } from '@core-cast/meilisearch';
import { Prisma } from '@core-cast/prisma';
import { Qdrant } from '@core-cast/qdrant';
import { VideoRepository } from '@core-cast/repositories';
import { ApiError } from '../errors/api-error';
import { VideoSearchRecord } from '@core-cast/types';
import { retrieveFromCache, sendToCache } from '../cache/redis-cache';

const RELEVANT_LAST_VIDEO_COUNT = 5; //How many ids are used to retrieve the warm video feed
const VIDEOS_PER_VECTOR_SEARCH = 5; //For the warm feed
const WANTED_RECOMMENDED_VIDEOS = 30;

export class VideoDiscoveryService {
	private meilisearchClient = Meili.getInstance().getClient();
	private qdrantClient = Qdrant.getInstance().getClient();
	private videoRepository = new VideoRepository(Prisma.getInstance().prismaClient);

	private async buildColdStartFeed() {
		const cachedResult = (await retrieveFromCache('coldFeed', 'coldFeed')) as object[];
		if (cachedResult && cachedResult.length) return cachedResult;

		const videos: { [videoId: string]: VideoSearchRecord } = {};

		const trendingVideos = await this.videoRepository.getLatestPopularVideos(20);
		const latestVideos = await this.videoRepository.getLatestVideos(10);

		trendingVideos.forEach(v => (videos[v.id] = v));
		latestVideos.forEach(v => (videos[v.id] = v));

		await sendToCache('coldFeed', 'coldFeed', Object.values(videos));

		return Object.values(videos);
	}

	//Could be cached
	private async buildWarmFeed(seenVideos: string[]) {
		const videos: { [videoId: string]: VideoSearchRecord } = {};

		//Try to retieve videos based on latest searches
		const searchPromises = [];
		for (let i = 0; i < Math.min(seenVideos.length, RELEVANT_LAST_VIDEO_COUNT); i++) {
			searchPromises.push(
				this.qdrantClient
					.query('videos', { query: seenVideos[i], with_payload: true, limit: VIDEOS_PER_VECTOR_SEARCH })
					.then(r => r.points.forEach(p => (videos[p.id] = p.payload as unknown as VideoSearchRecord)))
					.catch(e => {}) //Ignore qdrant not found errors
			);
		}

		await Promise.all(searchPromises);

		//Fill with trending if needed
		if (Object.keys(videos).length < WANTED_RECOMMENDED_VIDEOS) {
			const trendingVideos = await this.videoRepository.getLatestPopularVideos(10);
			trendingVideos.forEach(v => (videos[v.id] = v));
		}

		return Object.values(videos);
	}

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
		const videoFromCache = await retrieveFromCache('videoRecord', videoId);
		if (videoFromCache) return videoFromCache;

		const video = await this.videoRepository.getVideoById(videoId);
		if (!video) throw new ApiError(404, 'Video not found');
		await sendToCache('videoRecord', videoId, video);

		return video;
	}
}
