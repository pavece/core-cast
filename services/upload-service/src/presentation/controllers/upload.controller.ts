import { Request, Response } from 'express';
import { UploadService } from '../../domain/services/upload.service';
import { initUploadRequestValidator } from '../../domain/validation/upload-validators';

export class UploadController {
	private uploadService = new UploadService();

	public initChunkedUpload = (req: Request, res: Response) => {
		const parsedBody = initUploadRequestValidator.safeParse(req.body);

		if (parsedBody.error) {
			res.status(400).json(parsedBody.error);
			return;
		}

		this.uploadService
			.initializeChunkedUpload(parsedBody.data.objectName, parsedBody.data.totalChunks)
			.then(r => res.json({ message: 'Multipart init correct, you may now proceed uploading chunks.', uploadId: r }))
			.catch(e => {
				res.status(500).json({ message: 'Server error' });
			});
	};
}
