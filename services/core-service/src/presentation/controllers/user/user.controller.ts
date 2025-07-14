import { Response } from 'express';
import { AuthRequest } from '../../middlewares/validate-session';
import { cleanUser } from '../admin/user-management.controller';
import { handleApiError } from '../../../domain/errors/api-error';
import { updateUserValidator } from '../../../domain/validators/user.validators';
import { UserManagementService } from '../../../domain/services/user-management.service';
import {
	ICloseUserSessionsResponse,
	IGetUserReponse,
	IRemoveUserResponse,
	IUpdateUserResponse,
} from '@core-cast/types';

//User configuration / self management (settings)
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
			.then(r => res.json({ message: 'User information', user: cleanUser(r) } as IGetUserReponse))
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
			.updateUser(userId, parsedBody)
			.then(r => res.status(214).json({ message: 'Updated user', user: cleanUser(r) } as IUpdateUserResponse))
			.catch(e => handleApiError(e, res));
	};

	public deleteUser = (req: AuthRequest, res: Response) => {
		const userId = req.session?.userId;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		this.userManagementService
			.removeUser(userId)
			.then(r => res.json({ message: 'Deleted user', user: cleanUser(r) } as IRemoveUserResponse))
			.catch(e => handleApiError(e, res));
	};

	public closeSessions = (req: AuthRequest, res: Response) => {
		const userId = req.session?.userId;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		this.userManagementService
			.closeSessions(userId)
			.then(() => res.json({ message: 'Sessions closed' } as ICloseUserSessionsResponse))
			.catch(e => handleApiError(e, res));
	};

	//TODO
	public updatePicture = (req: AuthRequest, res: Response) => {};
}
