import { IGenericApiResponse } from '.';

export interface PartialUser {
	id: string;
	username: string;
	email: string;
	role: 'ADMIN' | 'USER';
	otpEnabled: boolean;
	banned: boolean;
}

export interface IRemoveUserResponse extends IGenericApiResponse {
	user: PartialUser;
}

export interface IUpdateUserResponse extends IGenericApiResponse {
	user: PartialUser;
}

export interface IBanUserResponse extends IGenericApiResponse {
	user: PartialUser;
}

export interface IGetUsersResponse extends IGenericApiResponse {
	users: PartialUser[];
}

export interface ICloseSessionsResponse extends IGenericApiResponse {}
