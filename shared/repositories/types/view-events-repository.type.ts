export interface ViewsRecord {
	time: string;
	views: number;
}

export interface IViewEventsRepository {
	batchStoreEvents(events: { video_id: string; view_count: string }[]): Promise<void>;
	getEventsDayGroup(dayCount: number, videoId: string): Promise<ViewsRecord[]>;
	getEventsHourGroup(dayCount: number, videoId: string): Promise<ViewsRecord[]>;
}
