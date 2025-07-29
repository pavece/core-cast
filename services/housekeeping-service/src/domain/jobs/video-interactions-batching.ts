import { Prisma, PrismaClient } from '@core-cast/prisma';
import { RedisClient } from '@core-cast/redis';
import Redis from 'ioredis';
import { Logger } from '../logging/logger';
import { ClickhouseClient } from '@core-cast/clickhouse';
import { Prometheus } from '../logging/prometheus';

export async function videoInteractionsBatching() {
	const prismaClient = Prisma.getInstance().prismaClient;
	const redisClient = RedisClient.getInstance().getClient();
	const clichouseClient = ClickhouseClient.getInstance().getClient();
	const logger = new Logger().getLogger();
	const prometheusClient = new Prometheus();

	try {
		redisClient.select(3);

		const views = await retrieveAndUpdateViews(redisClient, prismaClient);
		await retrieveAndUpdateLikes(redisClient, prismaClient);

		await clichouseClient.insert({ table: 'video_views', values: views, format: 'JSONEachRow' });

		logger.info('Migrated dirty interaction records to postgres and clickhouse');
		prometheusClient.completedTasks?.inc();
	} catch (error) {
		logger.error({ message: 'Failure during dirty interaction record migration', error });
		prometheusClient.erroredTasks?.inc();
	}
}

async function retrieveAndUpdateViews(redisClient: Redis, prismaClient: PrismaClient) {
	let cursor = '0';
	const views: { video_id: string; view_count: number }[] = [];

	do {
		const [nextCursor, results] = await redisClient.scan(cursor, 'MATCH', 'views:*', 'COUNT', 500);
		cursor = nextCursor;
		if (!results.length) return [];

		const values = await redisClient.mget(results);
		const updates: string[] = [];

		results.forEach((key, i) => {
			views.push({ video_id: String(key.split(':')[1]), view_count: Number(values[i]) });
			updates.push(`('${key.split(':')[1]}', ${values[i]})`);
		});

		const sqlQuery = `UPDATE "videoInteractions" AS t SET "viewCount" = t."viewCount" + v.value FROM (VALUES ${updates.join(
			','
		)}) AS v(id, value) WHERE t."videoId" = v.id;`;
		await prismaClient.$executeRawUnsafe(sqlQuery);

		await redisClient.del(...results);
	} while (cursor !== '0');

	return views;
}

async function retrieveAndUpdateLikes(redisClient: Redis, prismaClient: PrismaClient) {
	let cursor = '0';

	do {
		const [nextCursor, results] = await redisClient.scan(cursor, 'MATCH', 'likes:*', 'COUNT', 500);
		cursor = nextCursor;

		if (!results.length) return;

		const values = await redisClient.mget(results);
		const updates: string[] = [];

		results.forEach((key, i) => {
			updates.push(`('${key.split(':')[1]}', ${values[i]})`);
		});

		const sqlQuery = `UPDATE "videoInteractions" AS t SET "likeCount" = t."likeCount" + v.value FROM (VALUES ${updates.join(
			','
		)}) AS v(id, value) WHERE t."videoId" = v.id;`;
		await prismaClient.$executeRawUnsafe(sqlQuery);
		await redisClient.del(...results);
	} while (cursor !== '0');
}
