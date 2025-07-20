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

export async function stalledProcessingTaskRecovery() {
	const processingTaskRepo = new VideoProcessingTaskRepository(Prisma.getInstance().prismaClient);
	const rabbitMQ = RabbitMQ.getInstance();
	const logger = new Logger().getLogger();

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
}
