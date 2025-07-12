import { user, Prisma } from '@core-cast/prisma';
import { CreateUserParams, IUserRepository } from '../../domain/interfaces/repositories/user-repository.interface';

export class UserRepository implements IUserRepository {
	private prismaClient = Prisma.getInstance().prismaClient;

	getUserById(userId: string): Promise<user | null> {
		return this.prismaClient.user.findUnique({ where: { id: userId } });
	}
	getUserByEmail(email: string): Promise<user | null> {
		return this.prismaClient.user.findUnique({ where: { email } });
	}
	getUsers(): Promise<user[]> {
		return this.prismaClient.user.findMany();
	}
	createUser(user: CreateUserParams): Promise<user> {
		return this.prismaClient.user.create({ data: user });
	}
	updateUserById(userId: string, updates: Partial<user>): Promise<user | null> {
		return this.prismaClient.user.update({ where: { id: userId }, data: updates });
	}
	deleteUserById(id: string): Promise<user | null> {
		return this.prismaClient.user.delete({ where: { id } });
	}
	async isUserListEmpty(): Promise<boolean> {
		return !(await this.prismaClient.user.findFirst());
	}
	async areUsernameOrEmailAvailable(email: string, username: string): Promise<boolean> {
		return !(await this.prismaClient.user.findFirst({ where: { OR: [{ username }, { email }] } }));
	}
}
