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

		this.rabbitMQ.videoProcessingChannel?.consume(this.rabbitMQ.videoProcessingQueueName, async msg => {
			if (!msg) return;

			console.log(msg.content.toString());

			if (this.runningTasks < this.maxRunningTasks) {
				this.rabbitMQ!.videoProcessingChannel?.ack(msg);
				await this.runTask();
			} else {
				this.wait(20).then(() => {
					this.logger.warn('Execution limit hit, requeuing task');
					this.rabbitMQ!.videoProcessingChannel?.nack(msg, true, true);
				});
			}
		});
	}

	private async runTask() {
		this.runningTasks++;

		await this.wait(120);

		this.runningTasks--;
	}

	private wait(seconds: number) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(true);
			}, seconds * 1000);
		});
	}
}
