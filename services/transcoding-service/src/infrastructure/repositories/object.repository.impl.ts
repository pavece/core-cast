import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ObjectStore } from '@core-cast/object-store';

export class ObjectRepository {
	private objectStore = ObjectStore.getInstance().s3Client;

	public async checkIfObjectExists(objectName: string, bucket: string) {
		const object = await this.objectStore.send(new GetObjectCommand({ Key: objectName, Bucket: bucket }));
		return !!object.ETag;
	}

	public async putObject(objectName: string, bucket: string, body: Buffer) {
		return await this.objectStore.send(new PutObjectCommand({ Key: objectName, Bucket: bucket, Body: body }));
	}

	public async getPresignedUrl(objectName: string, bucket: string, durationSeconds?: number) {
		const command = new GetObjectCommand({ Bucket: bucket, Key: objectName });

		return await getSignedUrl(this.objectStore, command, {
			expiresIn: durationSeconds || 60 * 60 * 24,
		});
	}

	public async deleteObject(objectName: string, bucket: string) {
		return await this.objectStore.send(new DeleteObjectCommand({ Key: objectName, Bucket: bucket }));
	}
}
