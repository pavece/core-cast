"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQ = void 0;
const amqplib_1 = require("amqplib");
class RabbitMQ {
    constructor() {
        this.videoProcessingQueueName = 'video-processing';
    }
    static getInstance() {
        if (!RabbitMQ._instance) {
            RabbitMQ._instance = new RabbitMQ();
        }
        return RabbitMQ._instance;
    }
    async connect(url) {
        this.client = await (0, amqplib_1.connect)(url);
        this.videoProcessingChannel = await this.client.createChannel();
        await this.videoProcessingChannel.assertQueue('video-processing', { durable: true });
    }
}
exports.RabbitMQ = RabbitMQ;
