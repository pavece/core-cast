import { Router } from 'express';
import { VideoInteractionsController } from '../controllers/video-interaction/video-interaction.controller';
import { validateSession } from '../middlewares/validate-session';

export class VideoInteractionRouter {
	public static get routes() {
		const router = Router();
		const controller = new VideoInteractionsController();

		router.get('/:videoId', controller.getVideoInteractions);
		router.get('/personal/:videoId', validateSession, controller.getPersonalVideoInteractions);
		router.post('/like/:videoId', validateSession, controller.toggleVideoLike);
		router.put('/register-view/:videoId', controller.viewVideo);

		return router;
	}
}
