import { ClickhouseClient } from '@core-cast/clickhouse';
import { Prisma } from '@core-cast/prisma';
import {
	VideoInteractionsRepository,
	VideoRepository,
	ViewEventsRepository,
	ViewsRecord,
} from '@core-cast/repositories';
import { ApiError } from '../errors/api-error';

export class VideoIntearctionsManagementService {
	private viewEventsRepository = new ViewEventsRepository(ClickhouseClient.getInstance().getClient());
	private videoInteracionsRepository = new VideoInteractionsRepository(Prisma.getInstance().prismaClient);
	private videoRepository = new VideoRepository(Prisma.getInstance().prismaClient);

	public async getVideoStats(days: number, videoId: string, userId: string) {
		const video = await this.videoRepository.getVideoById(videoId);
		if (!video?.userId || video.userId !== userId) {
			throw new ApiError(403, 'You dont own this video');
		}

		const generalInteractions = await this.videoInteracionsRepository.getVideoInteractions(videoId);
		let viewsDistribution: ViewsRecord[] = [];

		if (days > 1) {
			viewsDistribution = await this.viewEventsRepository.getEventsDayGroup(days, videoId);
		} else {
			viewsDistribution = await this.viewEventsRepository.getEventsHourGroup(days, videoId);
		}

		return {
			generalInteractions,
			viewsDistribution,
		};
	}
}
