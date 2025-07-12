import { Request, Response } from 'express';
import { UserManagementService } from '../../domain/services/user-management.service';
import { handleApiError } from '../../domain/errors/api-error';
import { updateUserValidator } from '../../domain/validators/user.validators';
import { user } from '@core-cast/prisma';
import {
	ICloseSessionsResponse,
	IGetUsersResponse,
	IRemoveUserResponse,
	IUpdateUserResponse,
	PartialUser,
} from '@core-cast/types';

function cleanUser(original: user): PartialUser {
	return {
		username: original.username,
		email: original.email,
		id: original.id,
		role: original.role,
		otpEnabled: original.OTPPendingValidation == false,
	};
}

//Admin only user management endpoints
export class UserManagementController {
	private userManagementService = new UserManagementService();

	public getUsers = (req: Request, res: Response) => {
		this.userManagementService
			.getUsers()
			.then(user => {
				const cleanUsers = user.map(user => cleanUser(user));
				res.status(214).json({ message: 'User list', users: cleanUsers } as IGetUsersResponse);
			})
			.catch(e => handleApiError(e, res));
	};

	public removeUser = (req: Request, res: Response) => {
		const userId = req.params.id;

		this.userManagementService
			.removeUser(userId)
			.then(r => res.json({ message: 'User removed successfully', user: cleanUser(r) } as IRemoveUserResponse))
			.catch(e => handleApiError(e, res));
	};

	public banUser = (req: Request, res: Response) => {};

	public updateUser = (req: Request, res: Response) => {
		const userId = req.params.id;
		const { error, data: parsedBody } = updateUserValidator.safeParse(req.body);
		if (error) {
			res.status(400).json({ message: error.message });
			return;
		}

		this.userManagementService
			.updateUser(userId, parsedBody)
			.then(r => {
				res.status(214).json({ message: 'User updated succesfully', user: cleanUser(r) } as IUpdateUserResponse);
			})
			.catch(e => handleApiError(e, res));
	};

	public closeSessions = (req: Request, res: Response) => {
		const userId = req.params.id;

		this.userManagementService
			.closeSessions(userId)
			.then(r => res.json({ message: 'Sessions closed' } as ICloseSessionsResponse))
			.catch(e => handleApiError(e, res));
	};
}
