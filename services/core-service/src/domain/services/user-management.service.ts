import { user } from '@core-cast/prisma';
import { AuthSessionRepository } from '../../infrastructure/repositories/auth-session.repository.impl';
import { UserRepository } from '../../infrastructure/repositories/user.repository.impl';
import { ApiError } from '../errors/api-error';

export class UserManagementService {
	private userRepository = new UserRepository();
	private authSessionRepository = new AuthSessionRepository();

	public getUsers() {
		return this.userRepository.getUsers();
	}

	public async removeUser(userId: string) {
		const user = await this.userRepository.getUserById(userId);
		if (!user) throw new ApiError(404, 'User does not exist');

		await this.userRepository.deleteUserById(userId);

		return user;
	}

	public banUser(userId: string) {
		//TODO: Set user banned
		//TODO: Close user sessions
	}

	public async closeSessions(userId: string) {
		const user = await this.userRepository.getUserById(userId);
		if (!user) throw new ApiError(404, 'User does not exist');

		return this.authSessionRepository.clearUserSessions(userId);
	}

	public async updateUser(userId: string, updates: Partial<user>) {
		const user = await this.userRepository.getUserById(userId);
		if (!user) throw new ApiError(404, 'User does not exist');

		const updated = await this.userRepository.updateUserById(userId, updates);

		return updated;
	}
}
