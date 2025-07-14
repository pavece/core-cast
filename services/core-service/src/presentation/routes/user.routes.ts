import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateSession } from '../middlewares/validate-session';

export class UserRoouter {
	public static get routes() {
		const router = Router();
		const userController = new UserController();

		router.get('/', validateSession, userController.getUser);
		router.put('/', validateSession, userController.updateUser);
		router.delete('/', validateSession, userController.deleteUser);
		router.delete('/close-sessions', validateSession, userController.closeSessions);

		return router;
	}
}
