import 'dotenv/config';
import { RabbitMQ } from '@core-cast/rabbitmq';
import { Logger } from '../logging/logger';
import { BaseLogger } from 'pino';
import { VideoProcessingTask } from '../task/video-processing-task';
import { Prometheus } from '../logging/prometheus';

export class TaskManager {
	private runningTasks: number;
	private maxRunningTasks: number;
	private rabbitMQ: RabbitMQ | undefined;
	private logger: BaseLogger;
	private prometheus: Prometheus;

	constructor() {
		this.runningTasks = 0;
		this.maxRunningTasks = Number(process.env.MAX_CONCURRENT_TASKS) | 2;

		this.logger = new Logger().getLogger();
		this.prometheus = new Prometheus();
	}

	public async start() {
		this.rabbitMQ = RabbitMQ.getInstance();

		this.rabbitMQ.videoProcessingChannel?.consume(this.rabbitMQ.videoProcessingQueueName, async msg => {
			const { processingTaskId } = JSON.parse(msg?.content.toString() || '{}');
			if (!processingTaskId) return;

			if (this.runningTasks < this.maxRunningTasks) {
				this.rabbitMQ!.videoProcessingChannel?.ack(msg!);
				await this.runTask(processingTaskId);
			} else {
				this.wait(20).then(() => {
					this.logger.warn('Execution limit hit, requeuing task');
					this.rabbitMQ!.videoProcessingChannel?.nack(msg!, true, true);
				});
			}
		});
	}

	private async runTask(taskId: string) {
		this.runningTasks++;
		this.prometheus.processingPrssure?.set(this.runningTasks / this.maxRunningTasks);
		this.prometheus.runningTasks?.set(this.runningTasks);

		const task = new VideoProcessingTask(taskId);
		try {
			await task.loadTaskData();
			this.logger.info(`Started task with id ${taskId}`);

			await task.runProcessingTasks();
			this.logger.info(`Completed task with id ${taskId}`);

			this.prometheus.completedTasks?.inc();
		} catch (error) {
			this.logger.error({ messgae: `Failed to start / run task with id ${taskId}`, error: String(error) });
			this.prometheus.erroredTasks?.inc();
		}

		this.runningTasks--;
		this.prometheus.processingPrssure?.set(this.runningTasks / this.maxRunningTasks);
		this.prometheus.runningTasks?.set(this.runningTasks);
	}

	private wait(seconds: number) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(true);
			}, seconds * 1000);
		});
	}
}
