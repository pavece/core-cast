import axios from 'axios';
import { AuthResponses } from '@core-cast/types';

export const coreApiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/core',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const registerUser = (email: string, username: string, password: string, token: string) => {
	return coreApiClient.post(`/auth/register/${token}`, { email, username, password });
};

export const loginUser = (email: string, password: string, totp?: string) => {
	return coreApiClient.post('/auth/login', { email, password, totp });
};

export const checkSession = () => {
	return coreApiClient.get<AuthResponses.IValidateSessionResponse>('/auth/check-session', { withCredentials: true });
};

export const closeSession = () => {
	return coreApiClient.delete('/auth/logout', { withCredentials: true });
};
