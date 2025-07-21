import { ObjectStore, ObjectStoreConfigurationOptions } from '@core-cast/object-store';
import { HousekeepingJobManager } from './domain/jobs/job-manager';
import { Prisma } from '@core-cast/prisma';
import { Logger } from './domain/logging/logger';
import { RedisClient } from '@core-cast/redis';
import { RabbitMQ } from '@core-cast/rabbitmq';
import { ClickhouseClient } from '@core-cast/clickhouse';

async function main() {
	await setupServices();

	const jobManager = new HousekeepingJobManager();
	jobManager.start();
}

async function setupServices() {
	const logger = new Logger().getLogger();

	const objectStoreConfig: ObjectStoreConfigurationOptions = {
		region: process.env.OBJECT_STORE_REGION || 'minio',
		endpoint: process.env.OBJECT_STORE_ENDPOINT || '',
		accesKeyId: process.env.OBJECT_STORE_KEY_ID || '',
		secretAccessKey: process.env.OBJECT_STORE_SECRET || '',
		privateBucket: process.env.OBJECT_STORE_PRIVATE_BUCKET || 'uploads',
		publicBucket: process.env.OBJECT_STORE_PUBLIC_BUCKET || 'cdn',
	};

	try {
		await Prisma.getInstance().connect(process.env.POSTGRESQL_CON_URL || '');
		logger.info('Connected to postgreSQL');
	} catch (error) {
		logger.error({ message: 'Failed to connect to posgreSQL', error });
	}

	try {
		ObjectStore.getInstance().connect(objectStoreConfig);
		logger.info('Connected to object store');
	} catch (error) {
		logger.error({ message: 'Failed to connect to object store', error });
	}

	try {
		await RedisClient.getInstance().connect(process.env.REDIS_CON_URL || '');
		logger.info('Connected to Redis');
	} catch (error) {
		logger.error({ message: 'Failed to connect to Redis', error });
	}

	try {
		await RabbitMQ.getInstance().connect(process.env.RABBITMQ_CON_URL || 'amqp://localhost');
		logger.info('Connected to rabbitMQ message broker');
	} catch (error) {
		logger.error({ message: 'Failed to connect to rabbitMQ message broker', error });
	}

	//process.env.CLICKHOUSE_URL || '', Number(process.env.CLICKHOUSE_PORT), process.env.CLICKHOUSE_DATABASE || ""
	try {
		await ClickhouseClient.getInstance().connect({
			database: process.env.CLICKHOUSE_DATABASE || '',
			port: Number(process.env.CLICKHOUSE_PORT),
			url: process.env.CLICKHOUSE_URL || '',
			username: process.env.CLICKHOUSE_USER || '',
		});
		logger.info('Connected to clickhouse');
	} catch (error) {
		logger.error({ message: 'Failed to connect to clickhouse', error });
	}
}

main();
