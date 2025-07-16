import { Prisma } from '@core-cast/prisma';

import { ObjectStore, ObjectStoreConfigurationOptions } from '@core-cast/object-store';
import { RabbitMQ } from '@core-cast/rabbitmq';
import { ServiceRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import 'dotenv/config';
import { Logger } from './domain/logging/logger';
import { RedisClient } from '@core-cast/redis';

async function main() {
	printWelcomeMessage();
	await setupServices();

	const serverPort = Number(process.env.PORT) || 8081;
	const serviceRoutes = ServiceRoutes.routes;

	const server = new Server(serverPort, serviceRoutes);

	server.start();
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
		await ObjectStore.getInstance().connect(objectStoreConfig);
		logger.info('Connected to object store');
	} catch (error) {
		logger.error({ message: 'Failed to connect to object store', error });
	}

	try {
		await Prisma.getInstance().connect(process.env.POSTGRESQL_CON_URL || '');
		logger.info('Connected to postgreSQL');
	} catch (error) {
		logger.error({ message: 'Failed to connect to posgreSQL', error });
	}

	try {
		await RabbitMQ.getInstance().connect(process.env.RABBITMQ_CON_URL || 'amqp://localhost');
		logger.info('Connected to rabbitMQ message broker');
	} catch (error) {
		logger.error({ message: 'Failed to connect to rabbitMQ message broker', error });
	}

	try {
		await RedisClient.getInstance().connect(process.env.REDIS_CON_URL || '');
		logger.info('Connected to Redis');
	} catch (error) {
		logger.error({ message: 'Failed to connect to Redis', error });
	}
}

function printWelcomeMessage() {
	console.log(
		"   ____               _   _       _                 _ \n  / ___|___  _ __ ___| | | |_ __ | | ___   __ _  __| |\n | |   / _ \\| '__/ _ \\ | | | '_ \\| |/ _ \\ / _` |/ _` |\n | |__| (_) | | |  __/ |_| | |_) | | (_) | (_| | (_| |\n  \\____\\___/|_|  \\___|\\___/| .__/|_|\\___/ \\__,_|\\__,_|\n                           |_|"
	);
	console.log('Chunked media uploads service - CoreCast, welcome!\n\n');
}

main();
