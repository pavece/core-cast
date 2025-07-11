import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../domain/services/auth.service';
import { AuthSession } from '../../domain/interfaces/repositories/auth-session.interface';

const authService = new AuthService();

export interface AuthRequest extends Request {
	session?: AuthSession;
}

export async function validateSession(req: AuthRequest, res: Response, next: NextFunction) {
	const sessionToken = req.cookies['session_token'];

	console.log(req.cookies);

	if (!sessionToken) {
		res.status(401).json({ message: 'Session token not included' });
		return;
	}

	const session = await authService.validateSession(sessionToken);
	if (!session) {
		res.status(403).json({ message: 'Invalid session' });
		return;
	}

	req.session = session;
	next();
}
