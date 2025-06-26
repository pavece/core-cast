import { ServiceRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import 'dotenv/config';

function main() {
	const serverPort = Number(process.env.PORT) || 8081;
	const serviceRoutes = ServiceRoutes.routes;

	const server = new Server(serverPort, serviceRoutes);
	server.start();
}

main();
