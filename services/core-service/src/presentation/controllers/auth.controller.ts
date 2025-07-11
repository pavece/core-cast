import { Request, Response } from 'express';
import { AuthService } from '../../domain/services/auth.service';
import { createUserRequestValidator, loginValidator } from '../../domain/validators/auth.validators';
import { ICreateUserResponse, ILoginResponse } from '@core-cast/types';
import { handleApiError } from '../../domain/errors/api-error';
import { AuthRequest } from '../middlewares/validate-session';

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

	public login = (req: Request, res: Response) => {
		const { data: parsedBody, error } = loginValidator.safeParse(req.body);
		if (error) {
			res.status(400).json({ message: error.message });
			return;
		}

		this.authService
			.login(parsedBody.email, parsedBody.password, parsedBody.totp)
			.then(r => {
				if (r.requiresTotp) return res.status(401).json(r as ILoginResponse);

				res.cookie('session_token', r.session, {
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					expires: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000), //In 15 days
				});

				res.json({
					message: 'User succesfully logged in',
					user: { email: r.user!.email, role: r.user!.role, username: r.user!.username },
				} as ILoginResponse);
			})
			.catch(err => handleApiError(err, res, 'Failed to login user'));
	};

	public configure2FA = (req: AuthRequest, res: Response) => {
		if (!req.session) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		this.authService
			.configure2FA(req.session)
			.then(r => res.json({ message: '2FA configured', authenticatorUri: r }))
			.catch(e => handleApiError(e, res, 'Failed to configure 2FA'));
	};

	public activate2FA = (req: AuthRequest, res: Response) => {
		if (!req.body.totp) {
			res.status(400).json({ message: 'Include TOTP code' });
			return;
		}

		if (!req.session) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		this.authService
			.activate2FA(req.session, req.body.totp)
			.then(r => {
				res.cookie('session_token', r, {
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					expires: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000), //In 15 days
				});
				res.json({ message: '2FA enabled succesfully' });
			})
			.catch(e => handleApiError(e, res, 'Failed to enable 2FA'));
	};
}
