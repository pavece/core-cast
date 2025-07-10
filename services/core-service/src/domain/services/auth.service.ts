import { Prisma, Role } from '@core-cast/prisma';
import { ApiError } from '../errors/api-error';
import bcrypt from 'bcrypt';
import { AuthSessionRepository } from '../../infrastructure/repositories/auth-session.repository.impl';

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

		const sessionToken = await this.sessionRepository.createSession({device: "TODO", email, username: name, userId: user.id, role: user.role})
		return { user, session: sessionToken };
	}
}
