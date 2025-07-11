import { IGenericApiResponse } from '.';

export interface ICreateUserResponse extends IGenericApiResponse {
	user: {
		username: string;
		email: string;
		role: 'ADMIN' | 'USER';
	};
	sessionToken: string;
}

export type ILoginResponse = ICreateUserResponse | (IGenericApiResponse & { requiresTotp: boolean });
