import { NextFunction, Response } from 'express';
import { AuthRequest } from './validate-session';
import { Role } from '@core-cast/prisma';

export function validateAdmin(req: AuthRequest, res: Response, next: NextFunction) {
	if (!req.session?.role) {
		res.status(403).json({ message: 'Invalid session' });
		return;
	}

	if (req.session.role != Role.ADMIN) {
		res.status(403).json({ message: 'Permission denied' });
		return;
	}

	next();
}
