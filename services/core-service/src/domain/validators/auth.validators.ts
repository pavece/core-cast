import z from 'zod';

export const createUserRequestValidator = z.object({
	username: z.string(),
	password: z.string().length(6),
	email: z.string().email(),
});

export const loginValidator = z.object({
	password: z.string().length(6),
	email: z.string().email(),
	totp: z.string().length(6).optional(),
});
