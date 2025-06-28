import { Request, Response } from 'express';
import { UploadService } from '../../domain/services/upload.service';
import {
	finishUploadValidator,
	initUploadRequestValidator,
	uploadChunkHeadersValidator,
} from '../../domain/validation/upload-validators';
import { handleApiError } from '../../domain/errors/api-error';

export class UploadController {
	private uploadService = new UploadService();

	public initChunkedUpload = (req: Request, res: Response) => {
		const parsedBody = initUploadRequestValidator.safeParse(req.body);
		if (parsedBody.error) {
			console.log(parsedBody.error);
			res.status(400).json(parsedBody.error);
			return;
		}

		this.uploadService
			.initializeChunkedUpload(parsedBody.data.objectName, parsedBody.data.totalChunks)
			.then(r => res.json({ message: 'Multipart init correct, you may now proceed uploading chunks.', uploadId: r }))
			.catch(e => handleApiError(e, res));
	};

	public uploadChunk = (req: Request, res: Response) => {
		const parsedHeaders = uploadChunkHeadersValidator.safeParse(req.headers);
		if (parsedHeaders.error) {
			res.status(400).json(parsedHeaders.error);
			return;
		}

		if (!req.file) {
			res.status(400).json({ message: 'Please include the chunk file' });
			return;
		}

		this.uploadService
			.uploadChunk(
				parsedHeaders.data['x-coreupload-upload-id'],
				parsedHeaders.data['x-coreupload-chunk-number'],
				req.file.buffer
			)
			.then(r => res.status(200).json(r))
			.catch(e => handleApiError(e, res));
	};

	public finishUpload = (req: Request, res: Response) => {
		const parsedBody = finishUploadValidator.safeParse(req.body);
		if (parsedBody.error) {
			res.status(400).json(parsedBody.error);
			return;
		}

		this.uploadService
			.finishChunkedUpload(parsedBody.data.uploadId)
			.then(() => res.status(200).json({ message: 'Upload finished' }))
			.catch(e => handleApiError(e, res));
	};
}
