import { PrismaClient, videoProcessingTask } from '@core-cast/prisma';
import { IVideoProcessingTaskRepository } from '../types';

export class VideoProcessingTaskRepository implements IVideoProcessingTaskRepository {
	constructor(private prismaClient: PrismaClient) {}

	async createTask(objectName: string, videoId: string): Promise<videoProcessingTask> {
		return await this.prismaClient.videoProcessingTask.create({
			data: { objectName, video: { connect: { id: videoId } } },
		});
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

	async getStalledTasks(): Promise<videoProcessingTask[]> {
		const referenceTime = new Date();
		referenceTime.setDate(referenceTime.getDate() - 5);

		return await this.prismaClient.videoProcessingTask.findMany({
			where: { updatedAt: { lte: referenceTime }, status: 'PROCESSING' },
		});
	}
}
