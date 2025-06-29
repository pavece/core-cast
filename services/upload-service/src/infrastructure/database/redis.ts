import Redis from 'ioredis';
import 'dotenv/config';
import { Logger } from '../../domain/logging/logger';

export class RedisClient {
	private static _instance: RedisClient;
	private logger = new Logger().getLogger();
	private client;

	constructor() {
		if (RedisClient._instance) {
			return RedisClient._instance;
		}

		this.client = new Redis(process.env.REDIS_CON_URL || '');

		this.client.on('connect', () => this.logger.info('Connected to Redis'));
		this.client.on('error', error => this.logger.error({ message: 'Failed to connect to Redis', error }));

		RedisClient._instance = this;
	}

	public getClient() {
		return this.client as Redis;
	}
}
