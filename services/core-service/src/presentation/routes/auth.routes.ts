import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateSession } from '../middlewares/validate-session';

export class AuthRouter {
	public static get routes() {
		const router = Router();
		const authController = new AuthController();

		router.post('/register', authController.createAccount);
		router.post('/login', authController.login);

		router.patch('/activate-2fa', validateSession, authController.activate2FA);

		return router;
	}
}
