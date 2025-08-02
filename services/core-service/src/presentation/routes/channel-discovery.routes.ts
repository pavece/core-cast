import { Router } from 'express';
import { ChannelDiscoveryController } from '../controllers/video-distribution/channel-discovery.controller';

export class ChannelDiscoveryRouter {
	public static get routes() {
		const router = Router();
		const controller = new ChannelDiscoveryController();

		router.get('/:id', controller.getChannel);

		return router;
	}
}
