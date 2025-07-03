import { Prisma, upload } from '@core-cast/prisma';
import { PendingUploadRepository } from '@core-cast/types';

export class UploadRepository implements PendingUploadRepository {
	private prismaClient = Prisma.getInstance().prismaClient;

	async createPendingUpload(multipartId: string, userId: string): Promise<upload> {
		return await this.prismaClient.upload.create({ data: { multipartId, user: userId } });
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
