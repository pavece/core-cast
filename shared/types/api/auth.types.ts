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

export interface IValidateSessionResponse extends IGenericApiResponse {
	user: {
		username: string;
		userId: string;
		role: 'ADMIN' | 'USER';
	};
}

export interface IConfigure2FAResponse extends IGenericApiResponse {
	authenticatorUri: {
		otpAuthUri: string;
		recoveryCode: string;
	};
}
