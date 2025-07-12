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
		const session = await this.redis.hgetall('session:' + token);

		if (!session.userId) return null;
		return { ...session, lastUse: new Date(session.lastUse) } as unknown as AuthSession;
	}

	async createSession(session: AuthSession): Promise<string> {
		await this.redis.select(this.redisDatabaseNumber);
		const sessionToken = crypto.randomBytes(48).toString('hex');
		await this.redis.hset(`session:${session.userId}:${sessionToken}`, session);

		return `${session.userId}:${sessionToken}`;
	}

	async clearUserSessions(id: string): Promise<void> {
		await this.redis.select(this.redisDatabaseNumber);
		const stream = await this.redis.scanStream({ match: `session:${id}:*` });
		stream.on('data', async keys => {
			if (keys.length) await this.redis.del(...keys);
		});
	}

	async deleteSession(token: string): Promise<void> {
		await this.redis.select(this.redisDatabaseNumber);
		await this.redis.hdel('session:' + token);
	}

	async updateSession(token: string, updates: Partial<AuthSession>): Promise<AuthSession | null> {
		await this.redis.select(this.redisDatabaseNumber);
		const session = await this.redis.hgetall(`session:${token}`);
		if (!session.userId) return null;

		await this.redis.hset(`session:${token}`, updates);
		return { ...(session as unknown as AuthSession), ...updates };
	}
}
