import { Prisma } from '@core-cast/prisma';
import { UserRepository, VideoRepository } from '@core-cast/repositories';

export class ChannelDiscoveryService {
	private videoRepository = new VideoRepository(Prisma.getInstance().prismaClient);
	private userRespository = new UserRepository(Prisma.getInstance().prismaClient);

	public async getChannel(userId: string) {
		const videos = await this.videoRepository.getUserPublicVideos(userId);
		const user = await this.userRespository.getUserById(userId);

		return {
			user: {
				id: user?.id,
				username: user?.username,
				channelDescription: user?.channelDescription,
				avatar: user?.avatar,
				channelCover: user?.channelCover,
			},
			videos,
		};
	}
}
