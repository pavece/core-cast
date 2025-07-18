import { Meili } from '@core-cast/meilisearch';
import { Qdrant } from '@core-cast/qdrant';

export class VideoDiscoveryService {
	private meilisearchClient = Meili.getInstance().getClient();
	private qdrantClient = Qdrant.getInstance().getClient();

	private buildColdStartFeed() {}

	private buildWarmFeed() {}

	public buildFeed(seenVideos?: string[]) {}

	public async searchVideo(query: string) {
		const { hits } = await this.meilisearchClient.index('videos').search(query, { limit: 20 });
		return hits;
	}

	public async getSimilarVideos(videoId: string) {
		const { points } = await this.qdrantClient.query('videos', { query: videoId, with_payload: true });
		return points.map(p => p.payload);
	}
}
