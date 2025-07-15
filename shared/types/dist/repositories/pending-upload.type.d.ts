import { upload } from '@core-cast/prisma';
export interface IUploadRepository {
    createPendingUpload(multipartId: string, userId: string, videoId: string): Promise<upload>;
    getPendingUploadById(id: string): Promise<upload | null>;
    getPendingUploadsByUser(userId: string): Promise<upload[]>;
    deletePendingUploadById(id: string): Promise<upload>;
    deletePendingUploadByMultipartId(multipartId: string): Promise<upload>;
}
