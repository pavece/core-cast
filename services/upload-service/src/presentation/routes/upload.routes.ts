import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';

export class UploadRoutes {
	public static get routes() {
		const router = Router();
		const uploadController = new UploadController();

		router.put('/chunk', uploadController.uploadChunk);

		return router;
	}
}
