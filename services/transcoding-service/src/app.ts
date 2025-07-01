import { Logger } from './domain/logging/logger';
import { ObjectStore } from './infrastructure/object-store/object-store';
import { RabbitMQ } from './infrastructure/rabbitmq/rabbitmq';

function main() {
	new Logger();
	new RabbitMQ();
	new ObjectStore();

	console.log('Transcoding service');
}

main();
