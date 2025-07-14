import { IGenericApiResponse } from '.';
export interface PartialUser {
    id: string;
    username: string;
    email: string;
    role: 'ADMIN' | 'USER';
    otpEnabled: boolean;
    banned: boolean;
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
export interface IAdminCloseSessionsResponse extends IGenericApiResponse {
}
