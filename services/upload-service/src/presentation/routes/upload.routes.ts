import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';
import multer from 'multer';

export class UploadRoutes {
	public static get routes() {
		const router = Router();
		const uploadController = new UploadController();
		const upload = multer({ storage: multer.memoryStorage() });

		router.post('/init-upload', uploadController.initChunkedUpload);
		router.put('/upload-chunk', upload.single('chunk'), uploadController.uploadChunk);
		router.post('/finish-upload', uploadController.finishUpload);
		router.get('/pending', uploadController.getPendingUploads);

		return router;
	}
}
