import { Router } from 'express';
import { AuthRouter } from './routes/auth.routes';

export class ApiRouter {
	public static get routes() {
		const router = Router();

		const authRouter = AuthRouter.routes;
		
		router.use('/api/auth', authRouter);

		return router;
	}
}
