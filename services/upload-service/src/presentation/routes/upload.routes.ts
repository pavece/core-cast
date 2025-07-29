import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';
import multer from 'multer';
import { validateSession } from '../middlewares/validate-session';

export class UploadRoutes {
	public static get routes() {
		const router = Router();
		const uploadController = new UploadController();
		const upload = multer({ storage: multer.memoryStorage() });

		router.post('/init-upload', validateSession, uploadController.initChunkedUpload);
		router.put('/upload-chunk', validateSession, upload.single('chunk'), uploadController.uploadChunk);
		router.post('/finish-upload', validateSession, uploadController.finishUpload);
		router.get('/pending', validateSession, uploadController.getPendingUploads);
		router.get('/pending/video/:id', validateSession, uploadController.getPendingUploadByVideoId);

		return router;
	}
}
