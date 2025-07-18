import { Request, Response } from 'express';
import { VideoDiscoveryService } from '../../../domain/services/video-discovery.service';
import { handleApiError } from '../../../domain/errors/api-error';

export class VideoDiscoveryController {
	private videoDiscoveryService = new VideoDiscoveryService();

	public getFeed = (req: Request, res: Response) => {
		let lastSeenVideos: string[] = [];

		try {
			lastSeenVideos = JSON.parse(req.cookies['last_videos'] || '[]');
		} catch {}

		this.videoDiscoveryService
			.buildFeed(lastSeenVideos)
			.then(r => res.json({ message: `${lastSeenVideos.length ? 'Warm' : 'Cold start'} feed`, videos: r }))
			.catch(e => handleApiError(e, res));
	};

	public searchVideo = (req: Request, res: Response) => {
		const query = req.query.q;
		if (!query) {
			res.status(400).json({ message: 'Please include a search query' });
			return;
		}

		this.videoDiscoveryService
			.searchVideo(String(query))
			.then(r => res.json({ message: 'Search results', videos: r }))
			.catch(e => handleApiError(e, res));
	};

	public getSimilarVideos = (req: Request, res: Response) => {
		const videoId = req.params.id;

		this.videoDiscoveryService
			.getSimilarVideos(videoId)
			.then(r => res.json({ message: 'Similar videos', videos: r }))
			.catch(e => handleApiError(e, res));
	};

	public getVideo = (req: Request, res: Response) => {
		const videoId = req.params.id;
		this.videoDiscoveryService
			.getVideo(videoId)
			.then(r => res.json({ message: 'Video', video: r }))
			.catch(e => handleApiError(e, res));
	};
}
