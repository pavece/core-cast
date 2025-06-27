import { z } from 'zod/v4';

export const initUploadRequestValidator = z.object({
	objectName: z.string().regex(/^[\w,\s-]+\.[A-Za-z]{3,4}$/, 'Invalid filename format (include extension)'),
	totalChunks: z.number(),
	chunkSizeMiB: z.number(),
});

export const uploadChunkHeadersValidator = z.object({
	'x-coreupload-upload-id': z.string(),
	'x-coreupload-chunk-number': z.string().pipe(z.transform(v => Number(v))),
});
