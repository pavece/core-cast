import { Logger } from './domain/logging/logger';
import { TaskManager } from './domain/task-manager/task-manager';
import { ObjectStore } from './infrastructure/object-store/object-store';
import { RabbitMQ } from './infrastructure/rabbitmq/rabbitmq';

async function main() {
	console.log('Transcoding service');

	new Logger();
	new ObjectStore();

	await RabbitMQ.getInstance();
	await new TaskManager().start();
}

main();
