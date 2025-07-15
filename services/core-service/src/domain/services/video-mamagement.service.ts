import { IVideoCreationProps } from '@core-cast/types';

export class VideoManagementService {
	public getVideo(userId: string, videoId: string) {
		//TODO: Check if video belongs to the user
		//TODO: Return video (does not matter if it's processed or not)
	}

	public getVideos(userId: string) {
		//TODO: Return user videos (does not matter if it's processed or not)
	}

	public createVideo(userId: string, videoProps: IVideoCreationProps) {
		//TODO: Add the video record to the database
		//TODO: Create video metadata embeding (title + description) and upload to vector database
		//TODO: Insert video search information into meilisearch (title + description)
	}

	public removeVideo(userId: string, videoId: string) {
		//TODO: Check if the video belongs to the user and remove from DB
		//TODO: Remove media from object store
	}

	public updateVideo(userId: string, videoId: string, videoProps: Partial<IVideoCreationProps>) {
		//TODO: Check if the video belongs to the user and update props
	}
}
