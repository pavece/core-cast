import { CreateBucketCommand, ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';

export interface ObjectStoreConfigurationOptions {
	region?: string;
	endpoint: string;
	accesKeyId: string;
	secretAccessKey: string;

	privateBucket: string;
	publicBucket: string;
}

export class ObjectStore {
	private static _instance: ObjectStore;
	private client: S3Client | undefined;

	private constructor() {}

	public static getInstance() {
		if (!ObjectStore._instance) {
			ObjectStore._instance = new ObjectStore();
		}

		return ObjectStore._instance;
	}

	public get s3Client() {
		if (!this.client) throw new Error('S3 client not connected');

		return this.client;
	}

	public async connect(config: ObjectStoreConfigurationOptions) {
		this.client = new S3Client({
			region: config.region || 'minio',
			endpoint: config.endpoint,
			forcePathStyle: true,
			credentials: {
				accessKeyId: config.accesKeyId || '',
				secretAccessKey: config.secretAccessKey || '',
			},
		});

		await this.createBuckets(config);
	}

	private async createBuckets(config: ObjectStoreConfigurationOptions) {
		await this.createBucket(config.privateBucket);
		await this.createBucket(config.publicBucket);
	}

	private async createBucket(name: string) {
		const buckets = await this.client!.send(new ListBucketsCommand());
		if (!buckets.Buckets?.find(b => b.Name == name)) {
			await this.client!.send(new CreateBucketCommand({ Bucket: name }));
			console.log(`Created bucket "${name}"`);
		} else {
			console.log(`Bucket "${name}" already exists, skipping creation`);
		}
	}
}
