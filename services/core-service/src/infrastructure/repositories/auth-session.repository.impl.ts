import {
	AuthSession,
	AuthSessionRepositoryInterface,
} from '../../domain/interfaces/repositories/auth-session.interface';
import { RedisClient } from '../database/redis';
import crypto from 'crypto';

export class AuthSessionRepository implements AuthSessionRepositoryInterface {
	private redis = new RedisClient().getClient();
	private redisDatabaseNumber = 2;

	async getSession(token: string): Promise<AuthSession | null> {
		await this.redis.select(this.redisDatabaseNumber);
		const session = await this.redis.hgetall(token);

		if (!session) return null;
		return session as unknown as AuthSession;
	}

	async createSession(session: AuthSession): Promise<String> {
		await this.redis.select(this.redisDatabaseNumber);
		const sessionToken = crypto.randomBytes(48).toString('hex');
		await this.redis.hset(`${session.userId}:${sessionToken}`, session);

		return `${session.userId}:${sessionToken}`;
	}

	async clearUserSessions(id: string): Promise<void> {
		await this.redis.select(this.redisDatabaseNumber);
		await this.redis.hdel(`${id}:*`);
	}

	async deleteSession(token: string): Promise<void> {
		await this.redis.select(this.redisDatabaseNumber);
		await this.redis.hdel(token);
	}
}
