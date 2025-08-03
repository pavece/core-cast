import axios from 'axios';
import {
	AuthResponses,
	UserResponses,
	UserManagementResponses,
	VideoManagementResponses,
	VideoDiscoveryResponses,
	VideoInteractionResponses,
	InteractionManagementResponses,
	ChannelDiscoveryResponses,
} from '@core-cast/types';

export const coreApiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/core',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

const serversideCoreApiClient = axios.create({
	baseURL: process.env.SERVER_SIDE_API + '/core',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

const getAPIClient = () => {
	if (typeof window === 'undefined') {
		return serversideCoreApiClient;
	}
	return coreApiClient;
};

export const registerUser = (email: string, username: string, password: string, token: string) => {
	const apiClient = getAPIClient();

	return apiClient.post(`/auth/register/${token}`, { email, username, password });
};

export const loginUser = (email: string, password: string, totp?: string) => {
	const apiClient = getAPIClient();

	return apiClient.post('/auth/login', { email, password, totp });
};

export const checkSession = (sessionToken?: string) => {
	const apiClient = getAPIClient();

	if (sessionToken) {
		return apiClient.get<AuthResponses.IValidateSessionResponse>('/auth/check-session', {
			headers: { Cookie: `session_token=${sessionToken}` },
		});
	}

	return apiClient.get<AuthResponses.IValidateSessionResponse>('/auth/check-session');
};

// Self user management
export const closeSession = (sessionToken?: string) => {
	const apiClient = getAPIClient();

	if (sessionToken) {
		return apiClient.delete<AuthResponses.IValidateSessionResponse>('/auth/logout', {
			headers: { Cookie: `session_token=${sessionToken}` },
		});
	}
	return apiClient.delete('/auth/logout');
};

export const getPersonalUserInfo = (sessionToken?: string) => {
	const apiClient = getAPIClient();

	if (sessionToken) {
		return apiClient.get<UserResponses.IGetUserReponse>('/user', {
			headers: { Cookie: `session_token=${sessionToken}` },
		});
	}

	return apiClient.get<UserResponses.IGetUserReponse>('/user');
};

export const updatePersonalUserInfo = (userInfo: Partial<UserResponses.IUserUpdateProps>) => {
	const apiClient = getAPIClient();

	return apiClient.put<UserResponses.IUpdateUserResponse>('/user', { ...userInfo, withCredentials: true });
};

export const closeAllSessions = () => {
	const apiClient = getAPIClient();

	return apiClient.delete('/user/close-sessions');
};

export const deleteAccount = () => {
	const apiClient = getAPIClient();

	return apiClient.delete('/user');
};

export const updateAvatar = (image: File) => {
	const apiClient = getAPIClient();

	const formData = new FormData();
	formData.append('image', image);
	return apiClient.post('/user/image/avatar', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

export const updateCover = (image: File) => {
	const apiClient = getAPIClient();

	const formData = new FormData();
	formData.append('image', image);
	return apiClient.post('/user/image/cover', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

export const setup2FA = () => {
	const apiClient = getAPIClient();

	return apiClient.patch<AuthResponses.IConfigure2FAResponse>('/auth/2fa/configure');
};

export const activate2FA = (totp: string) => {
	const apiClient = getAPIClient();

	return apiClient.patch('/auth/2fa/activate', { totp });
};

//User administration
export const adminGetUsers = () => {
	const apiClient = getAPIClient();

	return apiClient.get<UserManagementResponses.IAdminGetUsersResponse>('/admin/users');
};

export const adminGetUser = (userId: string, sessionToken?: string) => {
	const apiClient = getAPIClient();

	if (sessionToken) {
		return apiClient.get<UserManagementResponses.IAdminGetUserResponse>(`/admin/users/${userId}`, {
			headers: { Cookie: `session_token=${sessionToken}` },
		});
	}

	return apiClient.get<UserManagementResponses.IAdminGetUserResponse>(`/admin/users/${userId}`, {});
};

export const adminGenerateWhitelistEntry = () => {
	const apiClient = getAPIClient();

	return apiClient.post<UserManagementResponses.ICreateWhitelistResponse>('/admin/users/register-whitelist', {});
};

export const adminCloseUserSessions = (userId: string) => {
	const apiClient = getAPIClient();

	return apiClient.delete<UserManagementResponses.IAdminCloseSessionsResponse>(`/admin/users/close-sessions/${userId}`);
};

export const adminToggleUserBan = (userId: string) => {
	const apiClient = getAPIClient();

	return apiClient.patch<UserManagementResponses.IAdminBanUserResponse>(`/admin/users/toggle-ban/${userId}`);
};

export const adminUpdateUser = (userId: string, updates: Partial<UserResponses.IUserUpdateProps>) => {
	const apiClient = getAPIClient();

	return apiClient.put<UserManagementResponses.IAdminUpdateUserResponse>(`/admin/users/${userId}`, {
		...updates,
	});
};

export const adminDeleteAccount = (userId: string) => {
	const apiClient = getAPIClient();

	return apiClient.delete(`/admin/users/${userId}`);
};

//Video management
export const createVideo = (title: string, description: string, isPublic: boolean) => {
	const apiClient = getAPIClient();

	return apiClient.post<VideoManagementResponses.ICreateVideoResponse>('/uploads', {
		title,
		description,
		public: isPublic,
	});
};

export const getUserVideos = () => {
	const apiClient = getAPIClient();

	return apiClient.get<VideoManagementResponses.IGetVideosResponse>('/uploads');
};

export const deleteVideo = (videoId: string) => {
	const apiClient = getAPIClient();

	return apiClient.delete(`/uploads/${videoId}`);
};

//Video discovery
export const discoveryGetVideo = (videoId: string) => {
	const apiClient = getAPIClient();

	return apiClient.get<VideoDiscoveryResponses.IGetVideoResponse>(`/discovery/video/${videoId}`);
};

export const discoveryRelatedVideos = (videoId: string) => {
	const apiClient = getAPIClient();

	return apiClient.get<VideoDiscoveryResponses.IGetSimilarVideosResponse>(`/discovery/similar/${videoId}`);
};

export const getDiscoveryFeed = (watchedVideosCookie?: string) => {
	const apiClient = getAPIClient();

	return apiClient.get<VideoDiscoveryResponses.IGetFeedResponse>('/discovery/feed', {
		headers: {
			Cookie: 'last_videos=' + watchedVideosCookie,
		},
	});
};

export const searchVideos = (query: string) => {
	const apiClient = getAPIClient();

	return apiClient.get<VideoDiscoveryResponses.ISearchVideoResponse>(`/discovery/search?q=${query}`);
};

//Video interactions
export const getVideoInteractions = (videoId: string) => {
	const apiClient = getAPIClient();

	return apiClient.get<VideoInteractionResponses.IGetVideoInteractionsResponse>(`/interactions/${videoId}`);
};

export const registerView = (videoId: string) => {
	const apiClient = getAPIClient();

	return apiClient.put(`/interactions/register-view/${videoId}`);
};

export const getPersonalVideoInteractions = (videoId: string) => {
	const apiClient = getAPIClient();

	return apiClient.get<VideoInteractionResponses.IGetPersonalVideoInteractionsResponse>(
		`/interactions/personal/${videoId}`
	);
};

export const giveLike = (videoId: string) => {
	const apiClient = getAPIClient();

	return apiClient.post<VideoInteractionResponses.IToggleLikeResponse>(`/interactions/like/${videoId}`, {});
};

//Video interaction management
export const getVideoMetrics = (videoId: string, days: number) => {
	const apiClient = getAPIClient();

	return apiClient.get<InteractionManagementResponses.IGetVideoStatsResponse>(
		`/manage-interactions/${videoId}?days=${days}`
	);
};

//Channel discovery
export const getChannel = (userId: string) => {
	const apiClient = getAPIClient();

	return apiClient.get<ChannelDiscoveryResponses.GetChannelResponse>(`/channel/${userId}`);
};
