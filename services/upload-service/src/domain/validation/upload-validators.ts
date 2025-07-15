import { z } from 'zod/v4';

export const initUploadRequestValidator = z.object({
	objectName: z.string(),
	totalChunks: z.number(),
	chunkSizeMiB: z.number(),
	videoId: z.string(),
});

export const uploadChunkHeadersValidator = z.object({
	'x-coreupload-upload-id': z.string(),
	'x-coreupload-chunk-number': z.string().pipe(z.transform(v => Number(v))),
});

export const finishUploadValidator = z.object({
	uploadId: z.string(),
});
