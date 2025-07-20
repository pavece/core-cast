import { AbortMultipartUploadCommand } from '@aws-sdk/client-s3';
import { ObjectStore } from '@core-cast/object-store';
import { Prisma } from '@core-cast/prisma';
import { RedisClient } from '@core-cast/redis';
import { MultipartUploadRepository, UploadRepository } from '@core-cast/repositories';
import { Logger } from '../logging/logger';

/* 
	Clean abandoned uploads, user can reupload the video but will need to start from 0
*/
export async function stalledUploadCleanupJob() {
	const pendingUploadRepo = new UploadRepository(Prisma.getInstance().prismaClient);
	const multipartUploadRepo = new MultipartUploadRepository(RedisClient.getInstance().getClient());
	const objectStoreClient = ObjectStore.getInstance().s3Client;
	const logger = new Logger().getLogger();

	let removedUploads = 0;
	const stalledUploads = await pendingUploadRepo.getStalledUploads();

	//Should batch promises with promise.all
	for (const upload of stalledUploads) {
		const multipartUpload = await multipartUploadRepo.getMultipartUploadById(upload.multipartId);
		if (!multipartUpload?.objectName) continue;

		await objectStoreClient.send(
			new AbortMultipartUploadCommand({
				Bucket: process.env.OBJECT_STORE_PRIVATE_BUCKET || 'uploads',
				UploadId: upload.multipartId,
				Key: multipartUpload.objectName,
			})
		);

		await multipartUploadRepo.deleteMultipartUpload(upload.multipartId);
		removedUploads++;
	}

	await pendingUploadRepo.deleteStalledUploads();
	logger.info(`Removed ${removedUploads} stalled uploads from object store`);
}
