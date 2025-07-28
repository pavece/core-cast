import { IGenericApiResponse } from '.';

export interface PartialUser {
	id: string;
	username: string;
	email: string;
	role: 'ADMIN' | 'USER';
	otpEnabled: boolean;
	banned: boolean;
	channelDescription: string | null;
	avatar: string | null;
	channelCover: string | null;
}

export interface IAdminRemoveUserResponse extends IGenericApiResponse {
	user: PartialUser;
}

export interface IAdminUpdateUserResponse extends IGenericApiResponse {
	user: PartialUser;
}

export interface IAdminBanUserResponse extends IGenericApiResponse {
	user: PartialUser;
}

export interface IAdminGetUsersResponse extends IGenericApiResponse {
	users: PartialUser[];
}

export interface IAdminGetUserResponse extends IGenericApiResponse {
	user: PartialUser;
}

export interface IAdminCloseSessionsResponse extends IGenericApiResponse {}

export interface ICreateWhitelistResponse extends IGenericApiResponse {
	whitelistId: string;
}
