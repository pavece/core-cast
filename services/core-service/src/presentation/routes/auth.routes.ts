import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export class AuthRouter {
	public static get routes() {
		const router = Router();
		const authController = new AuthController();

		router.post('/register', authController.createAccount);
		router.post('/login', authController.login);
		router.patch('/activate-2fa', authController.activate2FA);

		return router;
	}
}
