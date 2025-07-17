import { NextFunction, Request, Response } from 'express';
import { AuthSession, AuthSessionRepository } from '@core-cast/repositories';
import { RedisClient } from '@core-cast/redis';

export interface AuthRequest extends Request {
	session?: AuthSession;
}

function retrieveSession(sessionId: string) {
	const authSessionRepositgory = new AuthSessionRepository(RedisClient.getInstance().getClient());
	return authSessionRepositgory.updateSession(sessionId, { lastUse: new Date().toISOString() });
}

export async function validateSession(req: AuthRequest, res: Response, next: NextFunction) {
	const sessionToken = req.cookies['session_token'];

	if (!sessionToken) {
		res.status(401).json({ message: 'Session token not included' });
		return;
	}

	const session = await retrieveSession(sessionToken);
	if (!session) {
		res.status(403).json({ message: 'Invalid session' });
		return;
	}

	req.session = session;
	next();
}
