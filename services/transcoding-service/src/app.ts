import { Logger } from './domain/logging/logger';
import { RabbitMQ } from './infrastructure/rabbitmq/rabbitmq';

function main() {
	new Logger();
	new RabbitMQ();

	console.log('Transcoding service');
}

main();
