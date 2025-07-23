import { Request, Response } from 'express';
import { UserManagementService } from '../../../domain/services/user-management.service';
import { handleApiError } from '../../../domain/errors/api-error';
import { adminUpdateUserValidator } from '../../../domain/validators/user.validators';
import { user } from '@core-cast/prisma';
import { UserManagementResponses } from '@core-cast/types';

export function cleanUser(original: user): UserManagementResponses.PartialUser {
	return {
		username: original.username,
		email: original.email,
		id: original.id,
		role: original.role,
		otpEnabled: original.OTPPendingValidation == false,
		banned: original.banned,
		channelDescription: original.channelDescription,
		channelCover: original.channelCover,
		avatar: original.avatar,
	};
}

//Admin only user management endpoints
export class UserManagementController {
	private userManagementService = new UserManagementService();

	public getUser = (req: Request, res: Response) => {
		const userId = req.params.id;

		this.userManagementService
			.getUser(userId)
			.then(r => {
				if (r.role == 'ADMIN') {
					res.status(403).json({ message: "Can't view other administrator users" });
					return;
				}
				res.json({ message: 'user', user: cleanUser(r) });
			})
			.catch(e => handleApiError(e, res));
	};

	public getUsers = (req: Request, res: Response) => {
		this.userManagementService
			.getUsers()
			.then(user => {
				const cleanUsers = user.map(user => cleanUser(user));
				res
					.status(200)
					.json({ message: 'User list', users: cleanUsers } as UserManagementResponses.IAdminGetUsersResponse);
			})
			.catch(e => handleApiError(e, res));
	};

	public removeUser = (req: Request, res: Response) => {
		const userId = req.params.id;

		this.userManagementService
			.removeUser(userId)
			.then(r =>
				res.json({
					message: 'User removed successfully',
					user: cleanUser(r),
				} as UserManagementResponses.IAdminRemoveUserResponse)
			)
			.catch(e => handleApiError(e, res));
	};

	public banUser = (req: Request, res: Response) => {
		const userId = req.params.id;

		this.userManagementService
			.toggleUserBan(userId)
			.then(r =>
				res.json({
					message: 'User banned successfully',
					user: cleanUser(r),
				} as UserManagementResponses.IAdminBanUserResponse)
			)
			.catch(e => handleApiError(e, res));
	};

	public updateUser = (req: Request, res: Response) => {
		const userId = req.params.id;
		const { error, data: parsedBody } = adminUpdateUserValidator.safeParse(req.body);
		if (error) {
			res.status(400).json({ message: error.message });
			return;
		}

		this.userManagementService
			.updateUser(userId, parsedBody)
			.then(r => {
				res.status(214).json({
					message: 'User updated succesfully',
					user: cleanUser(r),
				} as UserManagementResponses.IAdminUpdateUserResponse);
			})
			.catch(e => handleApiError(e, res));
	};

	public closeSessions = (req: Request, res: Response) => {
		const userId = req.params.id;

		this.userManagementService
			.closeSessions(userId)
			.then(r => res.json({ message: 'Sessions closed' } as UserManagementResponses.IAdminCloseSessionsResponse))
			.catch(e => handleApiError(e, res));
	};

	public createRegisterWhitelist = (req: Request, res: Response) => {
		this.userManagementService
			.generateRegisterWhitelist()
			.then(r => res.json({ message: 'Whitelist entry added', whitelistId: r.id } as UserManagementResponses.ICreateWhitelistResponse))
			.catch(e => handleApiError(e, res));
	};
}
