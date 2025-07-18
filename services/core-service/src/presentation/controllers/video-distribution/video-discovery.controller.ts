import { Request, Response } from 'express';
import { VideoDiscoveryService } from '../../../domain/services/video-discovery.service';

export class VideoDiscoveryController {
	private videoDiscoveryService = new VideoDiscoveryService();

	public getFeed = (req: Request, res: Response) => {};

	public searchVideo = (req: Request, res: Response) => {};

	public getSimilarVideos = (req: Request, res: Response) => {};
}
