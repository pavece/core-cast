import Redis from 'ioredis';

export class RedisClient {
	private static _instance: RedisClient;
	private client: Redis | undefined;

	public static getInstance() {
		if (!RedisClient._instance) {
			RedisClient._instance = new RedisClient();
		}

		return RedisClient._instance;
	}

	public async connect(url: string) {
		await new Promise((resolve, reject) => {
			this.client = new Redis(url || '');

			this.client.once('ready', resolve);
			this.client.once('error', error => reject(error));
		});
	}

	public getClient() {
		if (!this.client) throw new Error('Redis client is not connected');
		return this.client;
	}
}
