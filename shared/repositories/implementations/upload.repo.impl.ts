import { upload } from '@core-cast/prisma';
import { IUploadRepository } from '../types';
import { PrismaClient } from '@core-cast/prisma';

export class UploadRepository implements IUploadRepository {
	constructor(private prismaClient: PrismaClient) {}

	async createPendingUpload(multipartId: string, userId: string, videoId: string): Promise<upload> {
		return await this.prismaClient.upload.create({
			data: { video: { connect: { id: videoId } }, uploader: { connect: { id: userId } }, multipartId },
		});
	}
	async getPendingUploadById(id: string): Promise<upload | null> {
		return await this.prismaClient.upload.findUnique({ where: { id } });
	}
	async getPendingUploadsByUser(userId: string): Promise<upload[]> {
		return await this.prismaClient.upload.findMany({ where: { user: userId } });
	}
	async deletePendingUploadById(id: string): Promise<upload> {
		return await this.prismaClient.upload.delete({ where: { id } });
	}
	async deletePendingUploadByMultipartId(multipartId: string): Promise<upload> {
		return await this.prismaClient.upload.delete({ where: { multipartId } });
	}
}
