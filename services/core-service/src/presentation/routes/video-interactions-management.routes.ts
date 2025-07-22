import { Router } from 'express';
import { VideoInteractionManagementController } from '../controllers/video-interaction/video-interaction-management.controller';
import { validateSession } from '../middlewares/validate-session';

export class VideoInteractionManagementRouter {
	public static get routes() {
		const router = Router();
		const controller = new VideoInteractionManagementController();

		router.get('/:videoId', validateSession, controller.getVideoStats);

		return router;
	}
}
