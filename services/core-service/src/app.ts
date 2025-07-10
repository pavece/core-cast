import { Prisma } from '@core-cast/prisma';
import { ApiRouter } from './presentation/routes';
import { Server } from './presentation/server';
import 'dotenv/config';
import { Logger } from './domain/logging/logger';
import { BaseLogger } from 'pino';
import { RedisClient } from './infrastructure/database/redis';

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
}

main();
