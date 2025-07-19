import { Request, Response } from 'express';
import { VideoInteractionsService } from '../../../domain/services/video-interactions.service';
import { AuthRequest } from '../../middlewares/validate-session';

export class VideoInteractionsController {
	private videoInteractionService = new VideoInteractionsService();

	public getVideoInteractions = (req: Request, res: Response) => {};

	public getPersonalVideoInteractions = (req: AuthRequest, res: Response) => {};

	public toggleVideoLike = (req: AuthRequest, res: Response) => {};

	public viewVideo = (req: Request, res: Response) => {};
}
