import { RedisClient } from '@core-cast/redis';

type ValidCacheKeys = 'videoRecord' | 'videoStats' | 'partialUser' | 'coldFeed';
const REDIS_CACHE_DATABASE = 4;
const REDIS_CACHE_EXPIRATION_SECONDS = 60;

export async function sendToCache(type: ValidCacheKeys, recordId: string, value: object) {
	const redisClient = RedisClient.getInstance().getClient();

	await redisClient
		.pipeline()
		.select(REDIS_CACHE_DATABASE)
		.set(`cache:${type}:${recordId}`, JSON.stringify(value))
		.expire(`cache:${type}:${recordId}`, REDIS_CACHE_EXPIRATION_SECONDS)
		.exec();
}

export async function retrieveFromCache(type: ValidCacheKeys, recordId: string): Promise<object | object[] | null> {
	const redisClient = RedisClient.getInstance().getClient();
	const result = await redisClient.pipeline().select(REDIS_CACHE_DATABASE).get(`cache:${type}:${recordId}`).exec();
	if (!result) return result;

	const [getError, getResult] = result[1];
	const parsedResult = JSON.parse(String(getResult) || '{}');

	return parsedResult;
}
