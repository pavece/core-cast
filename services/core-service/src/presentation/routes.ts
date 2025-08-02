import { Router } from 'express';
import { AuthRouter } from './routes/auth.routes';
import { UserManagementRouter } from './routes/user-management.routes';
import { UserRoouter } from './routes/user.routes';
import { VideoManagementRoutes } from './routes/video-manegement.routes';
import { VideoDiscoveryRouter } from './routes/video-discovery.routes';
import { VideoInteractionRouter } from './routes/video-interaction.routes';
import { VideoInteractionManagementRouter } from './routes/video-interactions-management.routes';
import { ChannelDiscoveryRouter } from './routes/channel-discovery.routes';

export class ApiRouter {
	public static get routes() {
		const router = Router();

		const authRouter = AuthRouter.routes;
		const userManagementRouter = UserManagementRouter.routes;
		const userRouter = UserRoouter.routes;
		const videoManagementRouter = VideoManagementRoutes.routes;
		const videoDisoveryRouter = VideoDiscoveryRouter.routes;
		const videoInteractionsRouter = VideoInteractionRouter.routes;
		const videoInteractionManagementRouter = VideoInteractionManagementRouter.routes;
		const channelDiscoveryRouter = ChannelDiscoveryRouter.routes;

		router.use('/api/core/auth', authRouter);
		router.use('/api/core/admin/users', userManagementRouter);
		router.use('/api/core/user', userRouter);
		router.use('/api/core/uploads', videoManagementRouter);
		router.use('/api/core/discovery', videoDisoveryRouter);
		router.use('/api/core/interactions', videoInteractionsRouter);
		router.use('/api/core/manage-interactions', videoInteractionManagementRouter);
		router.use('/api/core/channel', channelDiscoveryRouter);

		return router;
	}
}
