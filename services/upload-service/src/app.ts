import { Prisma } from './infrastructure/database/prisma';
import { RedisClient } from './infrastructure/database/redis';
import { ObjectStore } from './infrastructure/object-store/object-store';
import { RabbitMQ } from './infrastructure/rabbitmq/rabbitmq';
import { ServiceRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import 'dotenv/config';

async function main() {
	const serverPort = Number(process.env.PORT) || 8081;
	const serviceRoutes = ServiceRoutes.routes;

	new RedisClient();
	new ObjectStore();
	new Prisma();
	await new RabbitMQ().getInstance();

	const server = new Server(serverPort, serviceRoutes);
	server.start();
}

main();
