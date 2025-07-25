import axios from 'axios';

export const uploadApiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/upload',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});
