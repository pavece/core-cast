import { Response } from 'express';
import { AuthRequest } from '../../middlewares/validate-session';

export class VideoManagementController {
	public getVideo = (req: AuthRequest, res: Response) => {};

	public getVideos = (req: AuthRequest, res: Response) => {};

	public createVideo = (req: AuthRequest, res: Response) => {};

	public removeVideo = (req: AuthRequest, res: Response) => {};

	public updateVideo = (req: AuthRequest, res: Response) => {};
}
