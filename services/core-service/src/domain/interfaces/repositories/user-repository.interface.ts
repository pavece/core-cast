import { Role, user } from '@core-cast/prisma';

export type CreateUserParams = { username: string; email: string; password: string; role: Role };

export interface IUserRepository {
	getUserById(userId: string): Promise<user | null>;
	getUserByEmail(email: string): Promise<user | null>;
	getUsers(): Promise<user[]>;

	createUser(user: CreateUserParams): Promise<user>;
	updateUserById(userId: string, updates: Partial<user>): Promise<user | null>;
	deleteUserById(id: string): Promise<user | null>;
	isUserListEmpty(): Promise<boolean>;
	areUsernameOrEmailAvailable(email: string, username: string): Promise<boolean>;
}
