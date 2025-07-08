import { Logger } from './domain/logging/logger';
import { TaskManager } from './domain/task-manager/task-manager';
import { RabbitMQ } from '@core-cast/rabbitmq';
import { ObjectStore, ObjectStoreConfigurationOptions } from '@core-cast/object-store';
import { Prisma } from '@core-cast/prisma';
import { PrometheusServer } from './presentation/prometheus-server';

async function main() {
	printWelcomeMessage();

	await setupServices();

	await new TaskManager().start();
}

async function setupServices() {
	const logger = new Logger().getLogger();

	if (process.env.PROMETHEUS_SERVER_PORT) {
		new PrometheusServer(Number(process.env.PROMETHEUS_SERVER_PORT)).start();
	} else {
		logger.warn("No PROMETHEUS_SERVER_PORT specified, won't start prometheus HTTP server");
	}

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
		await RabbitMQ.getInstance().connect(process.env.RABBITMQ_CON_URL || 'amqp://localhost');
		logger.info('Connected to rabbitMQ message broker');
	} catch (error) {
		logger.error({ message: 'Failed to connect to rabbitMQ message broker', error });
	}
}

function printWelcomeMessage() {
	console.log(
		"   ____                ____          _      \n  / ___|___  _ __ ___ / ___|___   __| | ___ \n | |   / _ \\| '__/ _ \\ |   / _ \\ / _` |/ _ \\\n | |__| (_) | | |  __/ |__| (_) | (_| |  __/\n  \\____\\___/|_|  \\___|\\____\\___/ \\__,_|\\___|"
	);

	console.log('Video transcoding & processing service - CoreCast, welcome!\n\n');
}

main();
