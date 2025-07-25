import { Prisma, Role } from '@core-cast/prisma';
import { ApiError } from '../errors/api-error';
import bcrypt from 'bcrypt';
import { AuthSessionRepository, RegisterWhitelistRepository } from '@core-cast/repositories';
import { AuthSession } from '@core-cast/repositories';
import { authenticator } from 'otplib';
import crypto from 'crypto';
import { UserRepository } from '@core-cast/repositories';
import { RedisClient } from '@core-cast/redis';

const SALT_ROUNDS = 12;

export class AuthService {
	private userRepository = new UserRepository(Prisma.getInstance().prismaClient);
	private sessionRepository = new AuthSessionRepository(RedisClient.getInstance().getClient(), 2);
	private registerWhitelistRepository = new RegisterWhitelistRepository(Prisma.getInstance().prismaClient);

	private async validateWhitelist(whitelistId: string) {
		const whitelistRecord = await this.registerWhitelistRepository.getRegisterWhitelistById(whitelistId);
		if (!whitelistRecord) {
			throw new ApiError(403, 'Invalid whitelist id');
		}

		if (whitelistRecord.validUntil.getMilliseconds() < new Date().getMilliseconds()) {
			throw new ApiError(403, 'Whitelist expired, please ask an administrator for a new one');
		}
	}

	public async registerUser(whitelistId: string, email: string, name: string, password: string) {
		const databaseEmpty = await this.userRepository.isUserListEmpty();
		const existingUser = await this.userRepository.areUsernameOrEmailAvailable(email, name);

		if (!databaseEmpty) {
			await this.validateWhitelist(whitelistId);
		}

		if (!existingUser) {
			throw new ApiError(401, 'Username or email is already taken');
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

		const user = await this.userRepository.createUser({
			email,
			password: hashedPassword,
			username: name,
			role: databaseEmpty ? Role.ADMIN : Role.USER,
		});

		const sessionToken = await this.sessionRepository.createSession({
			device: 'TODO',
			email,
			username: name,
			userId: user.id,
			role: user.role,
			lastUse: new Date().toISOString(),
		});

		if (!databaseEmpty) {
			await this.registerWhitelistRepository.deleteRegisterWhitelistById(whitelistId);
		}

		return { user, session: sessionToken };
	}

	public async configure2FA(session: AuthSession) {
		const user = await this.userRepository.getUserById(session.userId);

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

		await this.userRepository.updateUserById(user.id, {
			OTPSecret: secret,
			OTPPendingValidation: true,
			OTPRecoveryCode: recoveryCode,
		});
		return {
			otpAuthUri,
			recoveryCode,
		};
	}

	public async activate2FA(session: AuthSession, otpCode: string) {
		const user = await this.userRepository.getUserById(session.userId);

		if (!user) throw new ApiError(403, 'User does not exist');

		if (!user.OTPSecret) throw new ApiError(400, '2FA is not configured');
		if (!user.OTPPendingValidation) throw new ApiError(400, '2FA is already active');

		if (!authenticator.check(otpCode, user.OTPSecret)) throw new ApiError(403, 'Invalid 2FA code');

		await this.userRepository.updateUserById(session.userId, {
			OTPPendingValidation: false,
		});

		await this.sessionRepository.clearUserSessions(session.userId);
		const newSession = this.sessionRepository.createSession({
			device: 'TODO',
			userId: user.id,
			lastUse: new Date().toISOString(),
			email: user.email,
			role: user.role,
			username: user.username,
		});

		return newSession;
	}

	public async login(email: string, password: string, totp?: string) {
		const user = await this.userRepository.getUserByEmail(email);

		if (!user) throw new ApiError(401, 'Incorrect username or password');
		if (user.banned) throw new ApiError(403, 'User is banned');
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
			lastUse: new Date().toISOString(),
		});
		return { user, session: sessionToken };
	}

	public async validateSession(sessionId: string) {
		return await this.sessionRepository.updateSession(sessionId, { lastUse: new Date().toISOString() });
	}

	public async removeSession(sessionId: string) {
		return await this.sessionRepository.deleteSession(sessionId);
	}
}
