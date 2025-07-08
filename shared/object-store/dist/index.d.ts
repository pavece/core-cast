import { S3Client } from '@aws-sdk/client-s3';
export interface ObjectStoreConfigurationOptions {
    region?: string;
    endpoint: string;
    accesKeyId: string;
    secretAccessKey: string;
    privateBucket: string;
    publicBucket: string;
}
export declare class ObjectStore {
    private static _instance;
    private client;
    private constructor();
    static getInstance(): ObjectStore;
    get s3Client(): S3Client;
    connect(config: ObjectStoreConfigurationOptions): Promise<void>;
    private createBuckets;
    private createBucket;
}
