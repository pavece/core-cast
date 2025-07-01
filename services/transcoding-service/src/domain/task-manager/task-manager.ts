import 'dotenv/config';
import { RabbitMQ } from '../../infrastructure/rabbitmq/rabbitmq';
import { Logger } from '../logging/logger';
import { BaseLogger } from 'pino';

export class TaskManager {
	private runningTasks: number;
	private maxRunningTasks: number;
	private rabbitMQ: RabbitMQ | undefined;
	private logger: BaseLogger;

	constructor() {
		this.runningTasks = 0;
		this.maxRunningTasks = Number(process.env.MAX_CONCURRENT_TASKS) | 2;
		this.logger = new Logger().getLogger();
	}

	public async start() {
		this.rabbitMQ = await RabbitMQ.getInstance();

		this.rabbitMQ.videoProcessingChannel?.consume(this.rabbitMQ.videoProcessingQueueName, msg => {
			if (!msg) return;

			console.log(msg.content.toString());

			if (this.runningTasks < this.maxRunningTasks) {
				this.rabbitMQ!.videoProcessingChannel?.ack(msg);
				this.runTask();
			} else {
				this.rabbitMQ!.videoProcessingChannel?.nack(msg, true, true); //TODO: Wait a few seconds before nack
			}
		});
	}

	private runTask() {
		this.runningTasks++;

		//TODO: Execute video processing tasks

		this.runningTasks--;
	}
}
