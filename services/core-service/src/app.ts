import { Prisma } from '@core-cast/prisma';
import { ApiRouter } from './presentation/routes';
import { Server } from './presentation/server';
import 'dotenv/config';
import { Logger } from './domain/logging/logger';
import { BaseLogger } from 'pino';
import { ObjectStore, ObjectStoreConfigurationOptions } from '@core-cast/object-store';

async function main() {
	const logger = new Logger().getLogger();

	await setupServices(logger);

	const router = ApiRouter.routes;
	const server = new Server(Number(process.env.PORT) || 8080, router);

	try {
		const serverPort = await server.start();
		logger.info(`HTTP server started on port ${serverPort}`);
	} catch (error) {
		logger.error({ message: 'Failed to start HTTP server', error: String(error) });
	}
}

async function setupServices(logger: BaseLogger) {
	try {
		await Prisma.getInstance().connect(process.env.POSTGRESQL_CON_URL || '');
		logger.info('Connected to posgreSQL');
	} catch (error) {
		logger.error({ message: 'Failed to connect to posgreSQL', error });
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
		await ObjectStore.getInstance().connect(objectStoreConfig);
		logger.info('Connected to object store');
	} catch (error) {
		logger.error({ message: 'Failed to connect to object store', error });
	}
}

main();
