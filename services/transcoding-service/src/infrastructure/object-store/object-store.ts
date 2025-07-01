import { CreateBucketCommand, ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config';
import { Logger } from '../../domain/logging/logger';

export class ObjectStore {
	private static _instance: ObjectStore;
	private logger = new Logger().getLogger();
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
			console.log('Please include the private buekcet name (OBJECT_STORE_PRIVATE_BUCKET) as env var');
			return;
		}

		if (process.env.OBJECT_STORE_PUBLIC_BUCKET == '') {
			console.log('Please include the public bucket name (OBJECT_STORE_PRIVATE_BUCKET) as env var');
			return;
		}

		try {
			await this.createBucket(process.env.OBJECT_STORE_PRIVATE_BUCKET!);
			await this.createBucket(process.env.OBJECT_STORE_PUBLIC_BUCKET!);
		} catch (error) {
			this.logger.error({ message: 'Failed to connect to object store / retrieve bucket information', error });
		}
	}

	public getClient() {
		return this.client as S3Client;
	}

	private async createBucket(name: string) {
		const buckets = await this.client!.send(new ListBucketsCommand());
		if (!buckets.Buckets?.find(b => b.Name == name)) {
			await this.client!.send(new CreateBucketCommand({ Bucket: name }));
			this.logger.info(`Created bucket "${name}"`);
		} else {
			this.logger.info(`Bucket "${name}" already exists, skipping creation`);
		}
	}
}
