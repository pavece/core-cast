import { Prisma, Role } from '@core-cast/prisma';
import { ApiError } from '../errors/api-error';
import bcrypt from 'bcrypt';
import { AuthSessionRepository } from '../../infrastructure/repositories/auth-session.repository.impl';
import { AuthSession } from '../interfaces/repositories/auth-session.interface';
import { authenticator } from 'otplib';
import crypto from 'crypto';
import { ApiRouter } from '../../presentation/routes';

const SALT_ROUNDS = 12;

export class AuthService {
	private prismaClient = Prisma.getInstance().prismaClient;
	private sessionRepository = new AuthSessionRepository();

	public async registerUser(email: string, name: string, password: string) {
		const existingUser = await this.prismaClient.user.findFirst({ where: { OR: [{ email }, { username: name }] } });

		if (existingUser) {
			throw new ApiError(401, 'Username or email is already taken');
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const databaseEmpty = !(await this.prismaClient.user.findFirst());

		const user = await this.prismaClient.user.create({
			data: {
				email,
				password: hashedPassword,
				username: name,
				role: databaseEmpty ? Role.ADMIN : Role.USER,
			},
		});

		const sessionToken = await this.sessionRepository.createSession({
			device: 'TODO',
			email,
			username: name,
			userId: user.id,
			role: user.role,
		});
		return { user, session: sessionToken };
	}

	public async configure2FA(session: AuthSession) {
		const user = await this.prismaClient.user.findUnique({ where: { id: session.userId } });

		if (!user) {
			throw new ApiError(403, 'User does not exist');
		}

		if (user.OTPSecret) {
			throw new ApiError(403, '2FA is already configured on this account');
		}

		// Secret and recovery code should be encrypted (this is a toy project so I won't encrypt them :D)
		const secret = authenticator.generateSecret();
		const recoveryCode = crypto.randomBytes(12).toString('hex');
		const otpAuthUri = authenticator.keyuri(user.email, 'Core Cast', secret);

		await this.prismaClient.user.update({
			where: { id: session.userId },
			data: { OTPSecret: secret, OTPPendingValidation: true, OTPRecoveryCode: recoveryCode },
		});
		return {
			otpAuthUri,
			recoveryCode,
		};
	}

	public async activate2FA(session: AuthSession, otpCode: string) {
		const user = await this.prismaClient.user.findUnique({ where: { id: session.userId } });

		if (!user) throw new ApiError(403, 'User does not exist');

		if (!user.OTPSecret) throw new ApiError(400, '2FA is not configured');
		if (!user.OTPPendingValidation) throw new ApiError(400, '2FA is already active');

		if (!authenticator.check(otpCode, user.OTPSecret)) throw new ApiError(403, 'Invalid 2FA code');

		await this.prismaClient.user.update({
			where: { id: session.userId },
			data: {
				OTPPendingValidation: false,
			},
		});

		await this.sessionRepository.clearUserSessions(session.userId);
		const newSession = this.sessionRepository.createSession({ device: 'TODO', userId: user.id, ...user });

		return newSession;
	}

	public async login(email: string, password: string, totp?: string) {
		const user = await this.prismaClient.user.findUnique({ where: { email } });

		if (!user) throw new ApiError(401, 'Incorrect username or password');
		if (!bcrypt.compareSync(password, user.password)) throw new ApiError(401, 'Incorrect username or password');

		if (!totp && user.OTPSecret && !user.OTPPendingValidation) {
			return {
				message: 'Include TOTP code',
				requiresTotp: true,
			};
		}

		if (
			totp &&
			user.OTPSecret &&
			!user.OTPPendingValidation &&
			!authenticator.check(totp, user.OTPSecret!) &&
			totp != user.OTPRecoveryCode
		)
			throw new ApiError(401, 'TOTP code not valid');

		const sessionToken = await this.sessionRepository.createSession({
			device: 'TODO',
			email,
			username: user.username,
			userId: user.id,
			role: user.role,
		});
		return { user, session: sessionToken };
	}

	public async validateSession(sessionId: string) {
		// Should create and update a "lastUsed" property ?
		return await this.sessionRepository.getSession(sessionId);
	}
}
