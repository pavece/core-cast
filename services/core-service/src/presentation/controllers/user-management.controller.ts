import { Request, Response } from 'express';
import { UserManagementService } from '../../domain/services/user-management.service';

//Admin only user management endpoints
export class UserManagementController {
	private userManagementService = new UserManagementService();

	public getUsers(req: Request, res: Response) {}

	public removeUser(req: Request, res: Response) {}

	public banUser(req: Request, res: Response) {}

	public updateUser(req: Request, res: Response) {}

	public closeSessions(req: Request, res: Response) {}
}
