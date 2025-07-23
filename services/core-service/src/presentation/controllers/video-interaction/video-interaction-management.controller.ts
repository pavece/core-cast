import { Response } from 'express';
import { VideoIntearctionsManagementService } from '../../../domain/services/video-interactions-management.service';
import { handleApiError } from '../../../domain/errors/api-error';
import { AuthRequest } from '../../middlewares/validate-session';
import { InteractionManagementResponses } from '@core-cast/types';

export class VideoInteractionManagementController {
	private videoInteractionManagementService = new VideoIntearctionsManagementService();

	public getVideoStats = (req: AuthRequest, res: Response) => {
		let days = Number(req.query.days) || 7;

		if (days > 30) days = 30;
		if (days < 1) days = 1;

		this.videoInteractionManagementService
			.getVideoStats(days, req.params.videoId, req.session?.userId || '')
			.then(r => res.json({ message: 'video stats', ...r } as InteractionManagementResponses.IGetVideoStatsResponse))
			.catch(e => handleApiError(e, res));
	};
}
