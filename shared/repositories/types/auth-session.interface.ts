export interface AuthSession {
	userId: string;
	username: string;
	email: string;
	device: string;
	lastUse: string;
	role: 'USER' | 'ADMIN';
}

//Expected redis key structure: session:userId:sessionToken
export interface AuthSessionRepositoryInterface {
	getSession(token: string): Promise<AuthSession | null>;
	createSession(session: AuthSession): Promise<String>;
	deleteSession(token: string): Promise<void>;
	clearUserSessions(id: string): Promise<void>;
	updateSession(token: string, updates: Partial<AuthSession>): Promise<AuthSession | null>;
}
