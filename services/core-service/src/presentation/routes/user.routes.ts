import { Router } from 'express';
import { UserController } from '../controllers/user/user.controller';
import { validateSession } from '../middlewares/validate-session';
import multer from 'multer';

export class UserRoouter {
	public static get routes() {
		const router = Router();
		const userController = new UserController();
		const upload = multer();

		router.get('/', validateSession, userController.getUser);
		router.put('/', validateSession, userController.updateUser);
		router.delete('/', validateSession, userController.deleteUser);
		router.delete('/close-sessions', validateSession, userController.closeSessions);
		router.post('/image/:type', validateSession, upload.single('image'), userController.uploadPicture);

		return router;
	}
}
