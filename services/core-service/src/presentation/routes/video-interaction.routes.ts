import { Router } from 'express';
import { VideoInteractionsController } from '../controllers/video-interaction/video-interaction.controller';
import { validateSession } from '../middlewares/validate-session';
import rateLimit from 'express-rate-limit';

export class VideoInteractionRouter {
	public static get routes() {
		const router = Router();
		const controller = new VideoInteractionsController();
		const rateLimitter = rateLimit({ windowMs: 1 * 60 * 1000, limit: 5 });

		router.get('/:videoId', controller.getVideoInteractions);
		router.get('/personal/:videoId', validateSession, controller.getPersonalVideoInteractions);
		router.post('/like/:videoId', validateSession, controller.toggleVideoLike);
		router.put('/register-view/:videoId', rateLimitter, controller.viewVideo);

		return router;
	}
}
