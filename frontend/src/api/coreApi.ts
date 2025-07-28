import axios from 'axios';
import { AuthResponses, UserResponses, UserManagementResponses } from '@core-cast/types';

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

// Self user management
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

export const closeAllSessions = () => {
	return coreApiClient.delete('/user/close-sessions', { withCredentials: true });
};

export const deleteAccount = () => {
	return coreApiClient.delete('/user', { withCredentials: true });
};

export const updateAvatar = (image: File) => {
	const formData = new FormData();
	formData.append('image', image);
	return coreApiClient.post('/user/image/avatar', formData, {
		withCredentials: true,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

export const updateCover = (image: File) => {
	const formData = new FormData();
	formData.append('image', image);
	return coreApiClient.post('/user/image/cover', formData, {
		withCredentials: true,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

//User administration
export const adminGetUsers = () => {
	return coreApiClient.get<UserManagementResponses.IAdminGetUsersResponse>('/admin/users', { withCredentials: true });
};

export const adminGenerateWhitelistEntry = () => {
	return coreApiClient.post<UserManagementResponses.ICreateWhitelistResponse>('/admin/users/register-whitelist', { withCredentials: true });
};

export const adminCloseUserSessions = (userId: string) => {
	return coreApiClient.delete<UserManagementResponses.IAdminCloseSessionsResponse>(`/admin/users/close-sessions/${userId}`)
}

export const adminToggleUserBan = (userId: string) => {
	return coreApiClient.patch<UserManagementResponses.IAdminBanUserResponse>(`/admin/users/toggle-ban/${userId}`)
} 