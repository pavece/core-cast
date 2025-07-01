import { Prisma } from '@core-cast/prisma';
import { RedisClient } from './infrastructure/database/redis';
import { ObjectStore } from './infrastructure/object-store/object-store';
import { RabbitMQ } from './infrastructure/rabbitmq/rabbitmq';
import { ServiceRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import 'dotenv/config';
import { Logger } from './domain/logging/logger';

async function main() {
	const serverPort = Number(process.env.PORT) || 8081;
	const serviceRoutes = ServiceRoutes.routes;

	const server = new Server(serverPort, serviceRoutes);

	setupServices();

	server.start();
}

async function setupServices() {
	const logger = new Logger().getLogger();

	new RedisClient();
	new ObjectStore();

	Prisma.getInstance()
		.connect(process.env.POSTGRESQL_CON_URL || '')
		.then(() => logger.info('Connected to postgreSQL'))
		.catch(error => logger.error({ message: 'Failed to connect to posgreSQL', error }));

	await RabbitMQ.getInstance();
}

main();
