import { Request, Response } from 'express';

export class UploadController {
	public uploadChunk(req: Request, res: Response) {
		res.json({ message: 'TODO: Upload chunk' });
	}
}
