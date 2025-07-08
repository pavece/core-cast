import { Channel } from 'amqplib';
export declare class RabbitMQ {
    private static _instance;
    private client;
    videoProcessingChannel: Channel | undefined;
    videoProcessingQueueName: string;
    private constructor();
    static getInstance(): RabbitMQ;
    connect(url: string): Promise<void>;
}
