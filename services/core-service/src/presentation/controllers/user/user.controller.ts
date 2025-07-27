import { Response } from 'express';
import { AuthRequest } from '../../middlewares/validate-session';
import { cleanUser } from '../admin/user-management.controller';
import { handleApiError } from '../../../domain/errors/api-error';
import { updateUserValidator } from '../../../domain/validators/user.validators';
import { UserManagementService } from '../../../domain/services/user-management.service';
import { UserResponses } from '@core-cast/types';

//User configuration / self management (settings)

const SELF_ACTION_FLAG = true;
export class UserController {
	private userManagementService = new UserManagementService();

	public getUser = (req: AuthRequest, res: Response) => {
		const userId = req.session?.userId;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		this.userManagementService
			.getUser(userId)
			.then(r => res.json({ message: 'User information', user: cleanUser(r) } as UserResponses.IGetUserReponse))
			.catch(e => handleApiError(e, res));
	};

	public updateUser = (req: AuthRequest, res: Response) => {
		const userId = req.session?.userId;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		const { error, data: parsedBody } = updateUserValidator.safeParse(req.body);
		if (error) {
			res.status(400).json({ message: error.message });
			return;
		}

		this.userManagementService
			.updateUser(userId, parsedBody, SELF_ACTION_FLAG)
			.then(r =>
				res.status(214).json({ message: 'Updated user', user: cleanUser(r) } as UserResponses.IUpdateUserResponse)
			)
			.catch(e => handleApiError(e, res));
	};

	public deleteUser = (req: AuthRequest, res: Response) => {
		const userId = req.session?.userId;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		this.userManagementService
			.removeUser(userId, SELF_ACTION_FLAG)
			.then(r => res.json({ message: 'Deleted user', user: cleanUser(r) } as UserResponses.IRemoveUserResponse))
			.catch(e => handleApiError(e, res));
	};

	public closeSessions = (req: AuthRequest, res: Response) => {
		const userId = req.session?.userId;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		this.userManagementService
			.closeSessions(userId, SELF_ACTION_FLAG)
			.then(() => res.json({ message: 'Sessions closed' } as UserResponses.ICloseUserSessionsResponse))
			.catch(e => handleApiError(e, res));
	};

	public uploadPicture = (req: AuthRequest, res: Response) => {
		const userId = req.session?.userId;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		if (!req.file || !req.file.mimetype.startsWith('image/')) {
			res.status(400).json({ message: 'Include a valid image' });
			return;
		}

		if (req.params.type !== 'avatar' && req.params.type !== 'cover') {
			res.status(400).json({ message: 'Type must be avatar or cover' });
			return;
		}

		this.userManagementService
			.uploadPicture(userId, req.params.type, req.file)
			.then(r =>
				res.json({
					message: `${req.params.type} image updated`,
				})
			)
			.catch(e => handleApiError(e, res));
	};
}
