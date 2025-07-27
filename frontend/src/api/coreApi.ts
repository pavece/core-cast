import axios from 'axios';
import { AuthResponses, UserManagementResponses, UserResponses } from '@core-cast/types';

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

export const checkSession = (sessionToken?: string) => {
	if (sessionToken) {
		return coreApiClient.get<AuthResponses.IValidateSessionResponse>('/auth/check-session', {
			headers: { Cookie: `session_token=${sessionToken}` },
		});
	}

	return coreApiClient.get<AuthResponses.IValidateSessionResponse>('/auth/check-session', { withCredentials: true });
};

export const closeSession = (sessionToken?: string) => {
	if (sessionToken) {
		return coreApiClient.delete<AuthResponses.IValidateSessionResponse>('/auth/logout', {
			headers: { Cookie: `session_token=${sessionToken}` },
		});
	}
	return coreApiClient.delete('/auth/logout', { withCredentials: true });
};

export const getPersonalUserInfo = () => {
	return coreApiClient.get<UserResponses.IGetUserReponse>('/user');
};

export const updatePersonalUserInfo = (userInfo: Partial<UserResponses.IUserUpdateProps>) => {
	return coreApiClient.put<UserResponses.IUpdateUserResponse>('/user', { ...userInfo, withCredentials: true });
};
