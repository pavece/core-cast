import { Router } from 'express';
import { AuthRouter } from './routes/auth.routes';
import { UserManagementRouter } from './routes/user-management.routes';

export class ApiRouter {
	public static get routes() {
		const router = Router();

		const authRouter = AuthRouter.routes;
		const userManagementRouter = UserManagementRouter.routes;

		router.use('/api/auth', authRouter);
		router.use('/api/admin/users', userManagementRouter);

		return router;
	}
}
