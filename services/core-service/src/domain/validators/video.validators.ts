import z from 'zod';

export const createVideoValidator = z.object({
	title: z.string().min(4).max(125),
	description: z.string().min(4).max(750),
	public: z.boolean(),
});

export const updateVideoValidator = z.object({
	title: z.string().min(4).max(125).optional(),
	description: z.string().min(4).max(750).optional(),
	public: z.boolean().optional(),
});
