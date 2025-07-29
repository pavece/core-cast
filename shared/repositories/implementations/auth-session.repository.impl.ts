import Redis from 'ioredis';
import { AuthSession, AuthSessionRepositoryInterface } from '../types/auth-session.interface';
import { randomBytes } from 'crypto';

export class AuthSessionRepository implements AuthSessionRepositoryInterface {
	constructor(private redis: Redis) {}

	async getSession(token: string): Promise<AuthSession | null> {
		const session = await this.redis.hgetall('session:' + token);

		if (!session.userId) return null;
		return { ...session, lastUse: new Date(session.lastUse) } as unknown as AuthSession;
	}

	async createSession(session: AuthSession): Promise<string> {
		const sessionToken = randomBytes(48).toString('hex');
		await this.redis.hset(`session:${session.userId}:${sessionToken}`, session);

		return `${session.userId}:${sessionToken}`;
	}

	async clearUserSessions(id: string): Promise<void> {
		const stream = await this.redis.scanStream({ match: `session:${id}:*` });
		stream.on('data', async keys => {
			if (keys.length) await this.redis.del(...keys);
		});
	}

	async deleteSession(token: string): Promise<void> {
		await this.redis.del('session:' + token);
	}

	async updateSession(token: string, updates: Partial<AuthSession>): Promise<AuthSession | null> {
		const session = await this.redis.hgetall(`session:${token}`);
		if (!session.userId) return null;

		await this.redis.hset(`session:${token}`, updates);
		return { ...(session as unknown as AuthSession), ...updates };
	}
}
