import { Request, Response } from 'express';
import { ChannelDiscoveryService } from '../../../domain/services/channel-discovery.service';
import { ChannelDiscoveryResponses } from '@core-cast/types';
import { handleApiError } from '../../../domain/errors/api-error';

export class ChannelDiscoveryController {
	private channelDiscoveryService = new ChannelDiscoveryService();

	public getChannel = (req: Request, res: Response) => {
		const userId = req.params.id;

		this.channelDiscoveryService
			.getChannel(userId)
			.then(r => res.json({ message: 'Channel', ...r } as ChannelDiscoveryResponses.GetChannelResponse))
			.catch(e => handleApiError(e, res));
	};
}
