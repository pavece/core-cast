import { Channel, ChannelModel, connect } from 'amqplib';

export class RabbitMQ {
	private static _instance: RabbitMQ;

	private client: ChannelModel | undefined;

	public videoProcessingChannel: Channel | undefined;
	public videoProcessingQueueName: string = 'video-processing';

	private constructor() {}

	public static getInstance() {
		if (!RabbitMQ._instance) {
			RabbitMQ._instance = new RabbitMQ();
		}

		return RabbitMQ._instance;
	}

	public async connect(url: string) {
		this.client = await connect(url);
		this.videoProcessingChannel = await this.client.createChannel();

		await this.videoProcessingChannel!.assertQueue('video-processing', { durable: true });
	}
}
