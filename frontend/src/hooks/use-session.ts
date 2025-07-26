import { checkSession, closeSession } from '@/api/coreApi';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type BasicSessionProps = {
	username: string;
	userId: string;
	role: 'ADMIN' | 'USER';
};

export const useSession = () => {
	const [userSession, setUserSession] = useState<BasicSessionProps | null>();

	useEffect(() => {
		const initSession = async () => {
			let session = getSessionFromSessionStore();

			if (!session?.username) {
				session = await fetchAndStoreUserSession();
			}

			setUserSession(session);
		};

		initSession();
	}, []);

	return { userSession, logout };
};

const getSessionFromSessionStore = () => {
	const unparsed = window.sessionStorage.getItem('session');

	if (!unparsed) return null;
	return JSON.parse(unparsed) as BasicSessionProps;
};

const fetchAndStoreUserSession = async () => {
	try {
		const {
			data: { user },
		} = await checkSession();

		window.sessionStorage.setItem('session', JSON.stringify(user));

		return user;
	} catch {}

	return null;
};

const logout = async () => {
	try {
		await closeSession();
		window.sessionStorage.clear();
	} catch (error) {
		toast.error('Failed to close session');
	}
};
