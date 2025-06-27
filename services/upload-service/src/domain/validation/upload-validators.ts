import { z } from 'zod';

export const initUploadRequestValidator = z.object({
	objectName: z.string().regex(/^[\w,\s-]+\.[A-Za-z]{3,4}$/, 'Invalid filename format (include extension)'),
	totalChunks: z.number(),
	chunkSizeMiB: z.number(),
});
