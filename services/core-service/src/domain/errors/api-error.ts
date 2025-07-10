import { Response } from 'express';

export const handleApiError = (error: any, res: Response, fallbackMessage?: string) => {
	if (error instanceof ApiError) {
		res.status(error.code).json({ message: error.message });
	} else {
		console.log(error);
		res.status(500).json({ message: fallbackMessage || 'Server error' });
	}
};

export class ApiError extends Error {
	constructor(public code: number, message: string) {
		super(message);
	}
}
