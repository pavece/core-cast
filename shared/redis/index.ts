import Redis from 'ioredis';
import 'dotenv/config';

export class RedisClient {
	private static _instance: RedisClient;
	private client: Redis | undefined;

	public static getInstance() {
		if (!RedisClient._instance) {
			RedisClient._instance = new RedisClient();
		}

		return RedisClient._instance;
	}

	public connect(url: string) {
		return new Promise((resolve, reject) => {
			this.client = new Redis(process.env.REDIS_CON_URL || '');

			this.client.on('connect', resolve);
			this.client.on('error', error => reject(error));
		});
	}

	public getClient() {
		return this.client as Redis;
	}
}
