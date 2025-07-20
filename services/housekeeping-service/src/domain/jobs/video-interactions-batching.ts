import { Prisma, PrismaClient } from '@core-cast/prisma';
import { RedisClient } from '@core-cast/redis';
import Redis from 'ioredis';
import { Logger } from '../logging/logger';

export async function videoInteractionsBatching() {
	const prismaClient = Prisma.getInstance().prismaClient;
	const redisClient = RedisClient.getInstance().getClient();
	const logger = new Logger().getLogger();

	try {
		redisClient.select(3);

		const views = await retrieveAndUpdateViews(redisClient, prismaClient);
		await retrieveAndUpdateLikes(redisClient, prismaClient);

		//TODO: Batch store views in clickhouse

		//await redisClient.flushdb();
		logger.info('Migrated dirty interaction records to postgres and clickhouse');
	} catch (error) {
		logger.error({ message: 'Failure during dirty interaction record migration', error });
	}
}

async function retrieveAndUpdateViews(redisClient: Redis, prismaClient: PrismaClient) {
	let cursor = '0';
	const views: [string, number][] = [];

	do {
		const [nextCursor, results] = await redisClient.scan(cursor, 'MATCH', 'views:*', 'COUNT', 500);
		cursor = nextCursor;

		const values = await redisClient.mget(results);
		const updates: string[] = [];

		results.forEach((key, i) => {
			views.push([String(key.split(':')[1]), Number(values[i])]);
			updates.push(`('${key.split(':')[1]}', ${values[i]})`);
		});

		const sqlQuery = `UPDATE "videoInteractions" AS t SET "viewCount" = t."viewCount" + v.value FROM (VALUES ${updates.join(
			','
		)}) AS v(id, value) WHERE t."videoId" = v.id;`;
		await prismaClient.$executeRawUnsafe(sqlQuery);
	} while (cursor !== '0');
}

async function retrieveAndUpdateLikes(redisClient: Redis, prismaClient: PrismaClient) {
	let cursor = '0';

	do {
		const [nextCursor, results] = await redisClient.scan(cursor, 'MATCH', 'likes:*', 'COUNT', 500);
		cursor = nextCursor;

		const values = await redisClient.mget(results);
		const updates: string[] = [];

		results.forEach((key, i) => {
			updates.push(`('${key.split(':')[1]}', ${values[i]})`);
		});

		const sqlQuery = `UPDATE "videoInteractions" AS t SET "likeCount" = t."likeCount" + v.value FROM (VALUES ${updates.join(
			','
		)}) AS v(id, value) WHERE t."videoId" = v.id;`;
		await prismaClient.$executeRawUnsafe(sqlQuery);
	} while (cursor !== '0');
}
