import { Prisma, Role } from '@core-cast/prisma';
import { ApiError } from '../errors/api-error';
import bcrypt from 'bcrypt';
import { AuthSessionRepository } from '../../infrastructure/repositories/auth-session.repository.impl';
import { AuthSession } from '../interfaces/repositories/auth-session.interface';
import { authenticator } from 'otplib';

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

	// May need to update in order to use a 2 step process (generate secret, confirm activation)
	// May also need to include a recovery code
	public async activate2FA(session: AuthSession) {
		const user = await this.prismaClient.user.findUnique({ where: { id: session.userId } });

		if (!user) {
			throw new ApiError(403, 'User does not exist');
		}

		if (user.twoFASecret) {
			throw new ApiError(403, '2FA is already active on this account');
		}

		const secret = authenticator.generateSecret();
		const otpAuthUri = authenticator.keyuri(user.email, 'Core Cast', secret);

		await this.prismaClient.user.update({ where: { id: session.userId }, data: { twoFASecret: secret } });

		this.sessionRepository.clearUserSessions(user.id);
		return otpAuthUri;
	}

	public async validateSession(sessionId: string) {
		// Should create and update a "lastUsed" property ?
		return await this.sessionRepository.getSession(sessionId);
	}
}
