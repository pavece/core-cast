import z from 'zod';

export const createUserRequestValidator = z.object({
	username: z.string(),
	password: z.string().length(6),
	email: z.string().email(),
});
