/* 
    Using the current setup a processing task can be removed from the rabbitMQ work queue (ack) but not complete processing due to server failure
    Requeue tasks old tasks that are not completed

    NOTE: Failed tasks wont be requeued, if processing fails, the server removes the task and ignores further processing
*/

import { Prisma } from '@core-cast/prisma';
import { RabbitMQ } from '@core-cast/rabbitmq';
import { VideoProcessingTaskRepository } from '@core-cast/repositories';
import { Upload } from '@core-cast/types';
import { Logger } from '../logging/logger';
import { Prometheus } from '../logging/prometheus';

export async function stalledProcessingTaskRecovery() {
	const logger = new Logger().getLogger();
	const prometheusClient = new Prometheus();

	try {
		const processingTaskRepo = new VideoProcessingTaskRepository(Prisma.getInstance().prismaClient);
		const rabbitMQ = RabbitMQ.getInstance();

		const stalledTasks = await processingTaskRepo.getStalledTasks();
		for (const task of stalledTasks) {
			const videoProcessingMessage: Upload.VideoProcessingTaskMessage = { processingTaskId: task.id };
			rabbitMQ.videoProcessingChannel?.sendToQueue(
				rabbitMQ.videoProcessingQueueName,
				Buffer.from(JSON.stringify(videoProcessingMessage)),
				{
					persistent: true,
				}
			);

			logger.info(`Requeuing stalled processing task ${task.id}`);
		}
		prometheusClient.completedTasks?.inc();
	} catch (error) {
		logger.error({ message: 'Stalled processing task cleanup task failed', error });
		prometheusClient.erroredTasks?.inc();
	}
}
