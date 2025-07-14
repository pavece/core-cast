import { user } from '@core-cast/prisma';
import { AuthSessionRepository } from '../../infrastructure/repositories/auth-session.repository.impl';
import { UserRepository } from '../../infrastructure/repositories/user.repository.impl';
import { ApiError } from '../errors/api-error';
import { ObjectStore } from '@core-cast/object-store';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import 'dotenv/config';
import { FILE } from 'dns';

export class UserManagementService {
	private userRepository = new UserRepository();
	private authSessionRepository = new AuthSessionRepository();
	private objectStore = ObjectStore.getInstance().s3Client;

	public async getUser(userId: string) {
		const user = await this.userRepository.getUserById(userId);
		if (!user) throw new ApiError(404, 'User not found');

		return user;
	}

	public async getUsers() {
		return (await this.userRepository.getUsers()).filter(u => u.role == 'USER');
	}

	public async removeUser(userId: string) {
		const user = await this.userRepository.getUserById(userId);
		if (!user) throw new ApiError(404, 'User does not exist');
		if (user.role == 'ADMIN') throw new ApiError(403, 'Administrators cannot be removed');

		await this.userRepository.deleteUserById(userId);

		return user;
	}

	public async toggleUserBan(userId: string) {
		const user = await this.userRepository.getUserById(userId);
		if (!user) throw new ApiError(404, 'User does not exist');
		if (user.role == 'ADMIN') throw new ApiError(403, 'Administrators cannot be banned');

		const bannedUser = await this.userRepository.updateUserById(userId, { banned: !user.banned });
		await this.closeSessions(userId);

		return bannedUser;
	}

	public async closeSessions(userId: string) {
		const user = await this.userRepository.getUserById(userId);
		if (!user) throw new ApiError(404, 'User does not exist');
		if (user.role == 'ADMIN') throw new ApiError(403, 'Administrator sessions cannot be closed');

		return this.authSessionRepository.clearUserSessions(userId);
	}

	public async updateUser(userId: string, updates: Partial<user>) {
		const user = await this.userRepository.getUserById(userId);
		if (!user) throw new ApiError(404, 'User does not exist');
		if (user.role == 'ADMIN') throw new ApiError(403, 'Administrators cannot be updated by other administrators');

		const updated = await this.userRepository.updateUserById(userId, updates);

		return updated;
	}

	public async uploadPicture(userId: string, type: 'avatar' | 'cover', file: Express.Multer.File) {
		const objectName = `${type}/${crypto.randomUUID()}${file.originalname}`;
		const url = `${process.env.OBJECT_STORE_ENDPOINT}/${process.env.OBJECT_STORE_PUBLIC_BUCKET}/${objectName}`;

		await this.objectStore.send(
			new PutObjectCommand({ Bucket: process.env.OBJECT_STORE_PUBLIC_BUCKET, Key: objectName, Body: file.buffer })
		);

		if (type == 'avatar') {
			await this.userRepository.updateUserById(userId, { avatar: url });
		} else {
			await this.userRepository.updateUserById(userId, { channelCover: url });
		}
	}
}
