import { RedisClient } from '@core-cast/redis';

type ValidCacheKeys = 'videoRecord' | 'videoStats' | 'partialUser' | 'coldFeed';
const REDIS_CACHE_EXPIRATION_SECONDS = 60;

export async function sendToCache(type: ValidCacheKeys, recordId: string, value: object): Promise<void> {
	const redisClient = RedisClient.getInstance().getClient();

	await redisClient
		.pipeline()
		.set(`cache:${type}:${recordId}`, JSON.stringify(value))
		.expire(`cache:${type}:${recordId}`, REDIS_CACHE_EXPIRATION_SECONDS)
		.exec();
}

export async function retrieveFromCache<T = object>(type: ValidCacheKeys, recordId: string): Promise<T | null> {
	const redisClient = RedisClient.getInstance().getClient();
	const result = await redisClient.get(`cache:${type}:${recordId}`);

	if (!result || result.length === 0) return null;

	try {
		return JSON.parse(result || '{}') as T;
	} catch {
		return null;
	}
}
