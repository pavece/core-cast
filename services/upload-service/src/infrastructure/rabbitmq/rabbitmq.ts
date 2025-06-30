import amqp, { Channel } from 'amqplib';
import { BaseLogger } from 'pino';
import 'dotenv/config';

import { Logger } from '../../domain/logging/logger';

export class RabbitMQ {
	private static _instance: RabbitMQ;
	private logger: BaseLogger | undefined;

	private client: amqp.ChannelModel | undefined;

	public videoProcessingChannel: Channel | undefined;
	public videoProcessingQueueName: string = 'video-processing';

	constructor() {
		if (RabbitMQ._instance) return RabbitMQ._instance;

		this.logger = new Logger().getLogger();

		this.connect();

		RabbitMQ._instance = this;
	}

	private async connect() {
		try {
			this.client = await amqp.connect(process.env.RABBITMQ_CON_URL || 'amqp://localhost');
			this.videoProcessingChannel = await this.client.createChannel();

			this.videoProcessingChannel.assertQueue('video-processing', { durable: true });

			this.logger?.info('Connected to RabbitMQ broker');
		} catch (error) {
			this.logger?.error({ message: 'Failed to connect to RabbitMQ broker', error });
		}
	}
}
