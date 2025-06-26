import { Router } from 'express';
import { UploadRoutes } from './routes/upload.routes';

export class ServiceRoutes {
	public static get routes() {
		const router = Router();

		const uploadRoutes = UploadRoutes.routes;
		router.use('/upload', uploadRoutes);

		return router;
	}
}
