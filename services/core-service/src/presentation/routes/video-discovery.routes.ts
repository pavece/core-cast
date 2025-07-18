import { Router } from 'express';
import { VideoDiscoveryController } from '../controllers/video-distribution/video-discovery.controller';

export class VideoDiscoveryRouter {
	public static get routes() {
		const router = Router();
		const controller = new VideoDiscoveryController();

		router.get('/feed', controller.getFeed);
		router.get('/search', controller.searchVideo);
		router.get('/similar/:id', controller.getSimilarVideos);

		return router;
	}
}
