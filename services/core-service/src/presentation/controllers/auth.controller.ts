import { Request, Response } from 'express';
import { AuthService } from '../../domain/services/auth.service';
import { createUserRequestValidator } from '../../domain/validators/auth.validators';
import { ICreateUserResponse } from '../../../../../shared/types/api/auth.types';
import { handleApiError } from '../../domain/errors/api-error';

export class AuthController {
	private authService = new AuthService();

	public createAccount = (req: Request, res: Response) => {
		const { data: parsedBody, error } = createUserRequestValidator.safeParse(req.body);
		if (error) {
			res.status(400).json({ message: error.message });
			return;
		}

		this.authService
			.registerUser(parsedBody?.email, parsedBody?.username, parsedBody?.password)
			.then(r => {
				res.cookie('session_token', r.session, {
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					expires: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000), //In 15 days
				});

				res.json({
					message: 'User succesfully registered',
					user: { email: r.user.email, role: r.user.role, username: r.user.username },
				} as ICreateUserResponse);
			})
			.catch(err => handleApiError(err, res, 'Failed to create user'));
	};

	public login = (req: Request, res: Response) => {};

	public activate2FA = (req: Request, res: Response) => {};
}
