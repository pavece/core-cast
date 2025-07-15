import { Prisma, videoProcessingTask } from '@core-cast/prisma';
import { IVideoProcessingTaskRepository } from '@core-cast/types';

export class VideoProcessingTaskRepository implements IVideoProcessingTaskRepository {
	private prismaClient = Prisma.getInstance().prismaClient;

	async createTask(objectName: string, videoId: string): Promise<videoProcessingTask> {
		return await this.prismaClient.videoProcessingTask.create({ data: { objectName, video: {connect: {id: videoId}} } });
	}
	async getTaskById(taskId: string): Promise<videoProcessingTask | null> {
		return await this.prismaClient.videoProcessingTask.findUnique({ where: { id: taskId } });
	}
	async markTaskAsStarted(taskId: string): Promise<videoProcessingTask | null> {
		return await this.prismaClient.videoProcessingTask.update({
			where: { id: taskId },
			data: { updatedAt: new Date().toISOString(), status: 'PROCESSING' },
		});
	}
	async deleteTaskById(taskId: string): Promise<videoProcessingTask | null> {
		return await this.prismaClient.videoProcessingTask.delete({ where: { id: taskId } });
	}
}
