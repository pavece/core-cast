import Redis from 'ioredis';
import 'dotenv/config';

export class RedisClient {
	private static _instance: RedisClient;
	private client;

	constructor() {
		if (RedisClient._instance) {
			return RedisClient._instance;
		}

		this.client = new Redis(process.env.REDIS_CON_URL || '');

		this.client.on('connect', () => console.log('Redis client connected'));
		this.client.on('error', err => console.log('Redis connection error', err));

		RedisClient._instance = this;
	}

	public getClient() {
		return this.client as Redis;
	}
}
