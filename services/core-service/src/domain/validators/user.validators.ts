import z from 'zod';

export const updateUserValidator = z.object({
	username: z.string().optional(),
	role: z.enum(['ADMIN', 'USER']).optional(),
	email: z.string().email().optional(),
});
