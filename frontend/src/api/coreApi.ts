import axios from 'axios';

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
