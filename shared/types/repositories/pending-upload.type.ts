import { upload } from '@core-cast/prisma';

export interface PendingUploadRepository {
	createPendingUpload(multipartId: string, userId: string): Promise<upload>;
	getPendingUploadById(id: string): Promise<upload | null>;
	getPendingUploadsByUser(userId: string): Promise<upload[]>;
	deletePendingUploadById(id: string): Promise<upload>;
	deletePendingUploadByMultipartId(multipartId: string): Promise<upload>;
}
