"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectStore = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
class ObjectStore {
    constructor() { }
    static getInstance() {
        if (!ObjectStore._instance) {
            ObjectStore._instance = new ObjectStore();
        }
        return ObjectStore._instance;
    }
    get s3Client() {
        if (!this.client)
            throw new Error('S3 client not connected');
        return this.client;
    }
    async connect(config) {
        this.client = new client_s3_1.S3Client({
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
    async createBuckets(config) {
        await this.createBucket(config.privateBucket);
        await this.createBucket(config.publicBucket);
    }
    async createBucket(name) {
        const buckets = await this.client.send(new client_s3_1.ListBucketsCommand());
        if (!buckets.Buckets?.find(b => b.Name == name)) {
            await this.client.send(new client_s3_1.CreateBucketCommand({ Bucket: name }));
            console.log(`Created bucket "${name}"`);
        }
        else {
            console.log(`Bucket "${name}" already exists, skipping creation`);
        }
    }
}
exports.ObjectStore = ObjectStore;
