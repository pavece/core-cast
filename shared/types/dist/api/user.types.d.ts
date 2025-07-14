import { IGenericApiResponse } from '.';
import { PartialUser } from './user-management.types';
export interface IUserUpdateProps {
    username: string;
    channelDescription: string;
    email: string;
}
export interface IGetUserReponse extends IGenericApiResponse {
    user: PartialUser;
}
export interface IRemoveUserResponse extends IGenericApiResponse {
    user: PartialUser;
}
export interface IUpdateUserResponse extends IGenericApiResponse {
    user: PartialUser;
}
export interface ICloseUserSessionsResponse extends IGenericApiResponse {
}
