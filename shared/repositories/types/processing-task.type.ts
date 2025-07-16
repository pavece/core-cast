import { videoProcessingTask } from '@core-cast/prisma';

export interface IVideoProcessingTaskRepository {
	createTask(objectName: string, videoId: string): Promise<videoProcessingTask>;
	getTaskById(taskId: string): Promise<videoProcessingTask | null>;
	markTaskAsStarted(taskId: string): Promise<videoProcessingTask | null>;
	deleteTaskById(taskId: string): Promise<videoProcessingTask | null>;
}
