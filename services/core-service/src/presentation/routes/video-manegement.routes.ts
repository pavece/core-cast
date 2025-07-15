import { Router } from 'express';
import { VideoManagementController } from '../controllers/video-management/video-management.controller';
import { validateSession } from '../middlewares/validate-session';

export class VideoManagementRoutes {
	public static get routes() {
		const router = Router();

		const videoManagementController = new VideoManagementController();

		router.get('/:id', validateSession, videoManagementController.getVideo);
		router.get('/', validateSession, videoManagementController.getVideos);
		router.post('/', validateSession, videoManagementController.createVideo);
		router.put('/:id', validateSession, videoManagementController.updateVideo);
		router.delete('/:id', validateSession, videoManagementController.removeVideo);

		return router;
	}
}
