export interface VideoInteractions {
	likeCount: Number;
	viewCount: Number;
}

export interface IVideoInteractionsRepository {
	getVideoInteractions(videoId: string): Promise<VideoInteractions | null>;
	isVideoLiked(videoId: string, userId: string): Promise<boolean>;
	addVideoLike(videoId: string, userId: string): Promise<void>;
	removeVideoLike(videoId: string, userId: string): Promise<void>;
	createVideoInteractions(videoId: string): Promise<VideoInteractions>;
	updateVideoInteractions(videoId: string, viewCountDelta: number, likeCountDelta: number): Promise<VideoInteractions>;
}
