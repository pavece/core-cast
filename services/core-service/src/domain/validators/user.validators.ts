import z from 'zod';

export const adminUpdateUserValidator = z.object({
	username: z.string().optional(),
	role: z.enum(['ADMIN', 'USER']).optional(),
	email: z.string().email().optional(),
	channelDescription: z.string().optional(),
});

export const updateUserValidator = z.object({
	username: z.string().optional(),
	channelDescription: z.string().optional(),
	email: z.string().optional(),
});
