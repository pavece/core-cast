import { Request, Response } from 'express';
import { VideoInteractionsService } from '../../../domain/services/video-interactions.service';
import { AuthRequest } from '../../middlewares/validate-session';
import { handleApiError } from '../../../domain/errors/api-error';

export class VideoInteractionsController {
	private videoInteractionService = new VideoInteractionsService();

	public getVideoInteractions = (req: Request, res: Response) => {
		const videoId = req.params.videoId;
		this.videoInteractionService
			.getVideoInteractions(videoId)
			.then(r => res.json({ message: 'Video interactions', interactions: r }))
			.catch(e => handleApiError(e, res));
	};

	public getPersonalVideoInteractions = (req: AuthRequest, res: Response) => {
		const videoId = req.params.videoId;
		const userId = req.session?.userId;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		this.videoInteractionService
			.getPersonalVideoInteractions(videoId, userId)
			.then(r => res.json({ message: 'Personal video interactions', interactions: r }))
			.catch(e => handleApiError(e, res));
	};

	public toggleVideoLike = (req: AuthRequest, res: Response) => {
		const videoId = req.params.videoId;
		const userId = req.session?.userId;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		this.videoInteractionService
			.toggleVideoLike(videoId, userId)
			.then(r => res.json({ message: 'Video like status', videoLiked: r.videoLiked }))
			.catch(e => handleApiError(e, res));
	};

	public viewVideo = (req: Request, res: Response) => {
		const videoId = req.params.videoId;

		this.videoInteractionService
			.registerView(videoId)
			.then(r => res.json({ message: 'ok' }))
			.catch(e => handleApiError(e, res));
	};
}
