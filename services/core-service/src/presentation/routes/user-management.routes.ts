import { Router } from 'express';
import { validateSession } from '../middlewares/validate-session';
import { UserManagementController } from '../controllers/user-management.controller';
import { validateAdmin } from '../middlewares/validate-admin';

export class UserManagementRouter {
	public static get routes() {
		const router = Router();
		const userManagementController = new UserManagementController();

		router.get('', validateSession, validateAdmin, userManagementController.getUsers);
		router.delete('/:id', validateSession, validateAdmin, userManagementController.removeUser);
		router.put('/:id', validateSession, validateAdmin, userManagementController.updateUser);
		router.patch('/ban/:id', validateSession, validateAdmin, userManagementController.banUser);
		router.delete('/close-sessions/:id', validateSession, validateAdmin, userManagementController.closeSessions);

		return router;
	}
}
