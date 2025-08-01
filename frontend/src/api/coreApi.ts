import axios from 'axios';
import {
	AuthResponses,
	UserResponses,
	UserManagementResponses,
	VideoManagementResponses,
	VideoDiscoveryResponses,
	VideoInteractionResponses,
	InteractionManagementResponses,
} from '@core-cast/types';

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

export const getPersonalUserInfo = (sessionToken?: string) => {
	if (sessionToken) {
		return coreApiClient.get<UserResponses.IGetUserReponse>('/user', {
			headers: { Cookie: `session_token=${sessionToken}` },
			withCredentials: true,
		});
	}

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

export const setup2FA = () => {
	return coreApiClient.patch<AuthResponses.IConfigure2FAResponse>('/auth/2fa/configure', { withCredentials: true });
};

export const activate2FA = (totp: string) => {
	return coreApiClient.patch('/auth/2fa/activate', { withCredentials: true, totp });
};

//User administration
export const adminGetUsers = () => {
	return coreApiClient.get<UserManagementResponses.IAdminGetUsersResponse>('/admin/users', { withCredentials: true });
};

export const adminGetUser = (userId: string, sessionToken?: string) => {
	if (sessionToken) {
		return coreApiClient.get<UserManagementResponses.IAdminGetUserResponse>(`/admin/users/${userId}`, {
			withCredentials: true,
			headers: { Cookie: `session_token=${sessionToken}` },
		});
	}

	return coreApiClient.get<UserManagementResponses.IAdminGetUserResponse>(`/admin/users/${userId}`, {
		withCredentials: true,
	});
};

export const adminGenerateWhitelistEntry = () => {
	return coreApiClient.post<UserManagementResponses.ICreateWhitelistResponse>('/admin/users/register-whitelist', {
		withCredentials: true,
	});
};

export const adminCloseUserSessions = (userId: string) => {
	return coreApiClient.delete<UserManagementResponses.IAdminCloseSessionsResponse>(
		`/admin/users/close-sessions/${userId}`
	);
};

export const adminToggleUserBan = (userId: string) => {
	return coreApiClient.patch<UserManagementResponses.IAdminBanUserResponse>(`/admin/users/toggle-ban/${userId}`);
};

export const adminUpdateUser = (userId: string, updates: Partial<UserResponses.IUserUpdateProps>) => {
	return coreApiClient.put<UserManagementResponses.IAdminUpdateUserResponse>(`/admin/users/${userId}`, {
		...updates,
		withCredentials: true,
	});
};

export const adminDeleteAccount = (userId: string) => {
	return coreApiClient.delete(`/admin/users/${userId}`, { withCredentials: true });
};

//Video management
export const createVideo = (title: string, description: string, isPublic: boolean) => {
	return coreApiClient.post<VideoManagementResponses.ICreateVideoResponse>('/uploads', {
		title,
		description,
		public: isPublic,
		withCredentials: true,
	});
};

export const getUserVideos = () => {
	return coreApiClient.get<VideoManagementResponses.IGetVideosResponse>('/uploads', { withCredentials: true });
};

export const deleteVideo = (videoId: string) => {
	return coreApiClient.delete(`/uploads/${videoId}`, { withCredentials: true });
};

//Video discovery
export const discoveryGetVideo = (videoId: string) => {
	return coreApiClient.get<VideoDiscoveryResponses.IGetVideoResponse>(`/discovery/video/${videoId}`);
};

export const discoveryRelatedVideos = (videoId: string) => {
	return coreApiClient.get<VideoDiscoveryResponses.IGetSimilarVideosResponse>(`/discovery/similar/${videoId}`);
};

export const getDiscoveryFeed = (watchedVideosCookie?: string) => {
	return coreApiClient.get<VideoDiscoveryResponses.IGetFeedResponse>('/discovery/feed', {
		headers: {
			Cookie: 'last_videos=' + watchedVideosCookie,
		},
	});
};

export const searchVideos = (query: string) => {
	return coreApiClient.get<VideoDiscoveryResponses.ISearchVideoResponse>(`/discovery/search?q=${query}`);
};

//Video interactions
export const getVideoInteractions = (videoId: string) => {
	return coreApiClient.get<VideoInteractionResponses.IGetVideoInteractionsResponse>(`/interactions/${videoId}`);
};

export const registerView = (videoId: string) => {
	return coreApiClient.put(`/interactions/register-view/${videoId}`);
};

export const getPersonalVideoInteractions = (videoId: string) => {
	return coreApiClient.get<VideoInteractionResponses.IGetPersonalVideoInteractionsResponse>(
		`/interactions/personal/${videoId}`,
		{ withCredentials: true }
	);
};

export const giveLike = (videoId: string) => {
	return coreApiClient.post<VideoInteractionResponses.IToggleLikeResponse>(
		`/interactions/like/${videoId}`,
		{},
		{ withCredentials: true }
	);
};

//Video interaction management
export const getVideoMetrics = (videoId: string, days: number) => {
	return coreApiClient.get<InteractionManagementResponses.IGetVideoStatsResponse>(
		`/manage-interactions/${videoId}?days=${days}`,
		{ withCredentials: true }
	);
};
