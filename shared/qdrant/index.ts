import { QdrantClient } from '@qdrant/js-client-rest';

export class Qdrant {
	private static _instance: Qdrant;
	private client: QdrantClient | undefined;

	public static getInstance() {
		if (!Qdrant._instance) {
			Qdrant._instance = new Qdrant();
		}

		return Qdrant._instance;
	}

	public async connect(url: string) {
		this.client = new QdrantClient({ url });

		const { collections } = await this.client.getCollections();
		if (collections.find(c => c.name == 'videos')) {
			console.log("Qdrant collection 'videos' already exists, skiping creation");
			return;
		}

		await this.client.createCollection('videos', {
			vectors: {
				size: 384, //all-MiniLM-L6-v2
				distance: 'Cosine',
			},
		});
	}

	public getClient() {
		if (!this.client) throw new Error('Redis client is not connected');
		return this.client;
	}
}
