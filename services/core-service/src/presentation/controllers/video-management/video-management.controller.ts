import { Response } from 'express';
import { AuthRequest } from '../../middlewares/validate-session';
import { VideoManagementService } from '../../../domain/services/video-mamagement.service';
import { handleApiError } from '../../../domain/errors/api-error';
import { createVideoValidator, updateVideoValidator } from '../../../domain/validators/video.validators';
import { VideoManagementResponses } from '@core-cast/types';

export class VideoManagementController {
	private videoManagementService = new VideoManagementService();

	public getVideo = (req: AuthRequest, res: Response) => {
		const userId = req.session?.userId;
		const videoId = req.params.id;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		this.videoManagementService
			.getVideo(userId, videoId)
			.then(r => res.json({ message: 'Video information', video: r } as VideoManagementResponses.IGetFullVideoResponse))
			.catch(e => handleApiError(e, res));
	};

	public getVideos = (req: AuthRequest, res: Response) => {
		const userId = req.session?.userId;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		this.videoManagementService
			.getVideos(userId)
			.then(r => res.json({ message: 'User videos', videos: r } as VideoManagementResponses.IGetVideosResponse))
			.catch(e => handleApiError(e, res));
	};

	public createVideo = (req: AuthRequest, res: Response) => {
		const userId = req.session?.userId;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const { error, data: parsedBody } = createVideoValidator.safeParse(req.body);
		if (error) {
			res.status(400).json({ message: error.message });
			return;
		}

		this.videoManagementService
			.createVideo(userId, parsedBody)
			.then(r =>
				res.json({
					message: 'Video created, you can now upload media to be processed',
					video: r,
				} as VideoManagementResponses.ICreateVideoResponse)
			)
			.catch(e => handleApiError(e, res));
	};

	public removeVideo = (req: AuthRequest, res: Response) => {
		const userId = req.session?.userId;
		const videoId = req.params.id;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		this.videoManagementService
			.removeVideo(userId, videoId)
			.then(r => res.json({ message: 'Removed video', video: r } as VideoManagementResponses.IRemoveVideoResponse))
			.catch(e => handleApiError(e, res));
	};

	public updateVideo = (req: AuthRequest, res: Response) => {
		const userId = req.session?.userId;
		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}
		const videoId = req.params.id;
		const { error, data: parsedBody } = updateVideoValidator.safeParse(req.body);
		if (error) {
			res.status(400).json({ message: error.message });
			return;
		}

		this.videoManagementService
			.updateVideo(userId, videoId, parsedBody)
			.then(r => res.json({ message: 'Video updated', video: r } as VideoManagementResponses.IUpdateVideoResponse))
			.catch(e => handleApiError(e, res));
	};
}
