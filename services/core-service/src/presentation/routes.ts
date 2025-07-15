import { Router } from 'express';
import { AuthRouter } from './routes/auth.routes';
import { UserManagementRouter } from './routes/user-management.routes';
import { UserRoouter } from './routes/user.routes';
import { VideoManagementRoutes } from './routes/video-manegement.routes';

export class ApiRouter {
	public static get routes() {
		const router = Router();

		const authRouter = AuthRouter.routes;
		const userManagementRouter = UserManagementRouter.routes;
		const userRouter = UserRoouter.routes;
		const videoManagementRouter = VideoManagementRoutes.routes;

		router.use('/api/auth', authRouter);
		router.use('/api/admin/users', userManagementRouter);
		router.use('/api/user', userRouter);
		router.use('/api/uploads', videoManagementRouter);

		return router;
	}
}
