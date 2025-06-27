import { CreateBucketCommand, ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config';

export class ObjectStore {
	private static _instance: ObjectStore;
	private client;

	constructor() {
		if (ObjectStore._instance) {
			return ObjectStore._instance;
		}

		this.client = new S3Client({
			region: process.env.OBJECT_STORE_REGION || 'minio',
			endpoint: process.env.OBJECT_STORE_ENDPOINT,
			forcePathStyle: true,
			credentials: {
				accessKeyId: process.env.OBJECT_STORE_KEY_ID || '',
				secretAccessKey: process.env.OBJECT_STORE_SECRET || '',
			},
		});

		this.createBuckets();

		ObjectStore._instance = this;
	}

	private async createBuckets() {
		if (process.env.OBJECT_STORE_PRIVATE_BUCKET == '') {
			console.log('Please include a private buycket name (OBJECT_STORE_PRIVATE_BUCKET) as env var');
			return;
		}

		try {
			const buckets = await this.client!.send(new ListBucketsCommand());
			if (buckets.Buckets?.find(b => b.Name == process.env.OBJECT_STORE_PRIVATE_BUCKET)) {
				console.log(`Bucket ${process.env.OBJECT_STORE_PRIVATE_BUCKET} already exists, skipping creation`);
				return;
			}

			await this.client!.send(new CreateBucketCommand({ Bucket: process.env.OBJECT_STORE_PRIVATE_BUCKET }));
			console.log(`Created bucket ${process.env.OBJECT_STORE_PRIVATE_BUCKET}`);
		} catch (error) {}
	}

	public getClient() {
		return this.client as S3Client;
	}
}
