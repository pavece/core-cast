import amqp, { Channel } from 'amqplib';
import 'dotenv/config';
import { Logger } from '../../domain/logging/logger';
import { BaseLogger } from 'pino';

export class RabbitMQ {
	private static _instance: RabbitMQ;
	private logger: BaseLogger | undefined;

	private client: amqp.ChannelModel | undefined;

	public videoProcessingChannel: Channel | undefined;
	public videoProcessingQueueName: string = 'video-processing';

	private constructor() {
		this.logger = new Logger().getLogger();
	}

	public static async getInstance() {
		if (!RabbitMQ._instance) {
			RabbitMQ._instance = new RabbitMQ();
			await RabbitMQ._instance.connect();
		}

		return RabbitMQ._instance;
	}

	private async connect() {
		try {
			this.client = await amqp.connect(process.env.RABBITMQ_CON_URL || 'amqp://localhost');
			this.videoProcessingChannel = await this.client.createChannel();

			await this.videoProcessingChannel.assertQueue('video-processing', { durable: true });

			this.logger?.info('Connected to RabbitMQ broker');
		} catch (error) {
			this.logger?.error({ message: 'Failed to connect to RabbitMQ broker', error });
		}
	}
}
