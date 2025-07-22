import { NodeClickHouseClient } from '@clickhouse/client/dist/client';
import { IViewEventsRepository, ViewsRecord } from '../types';
import { Row } from '@clickhouse/client';

export class ViewEventsRepository implements IViewEventsRepository {
	constructor(private clickhouseClient: NodeClickHouseClient) {}

	async batchStoreEvents(events: { video_id: string; view_count: string }[]): Promise<void> {
		await this.clickhouseClient.insert({ table: 'video_views', values: events, format: 'JSONEachRow' });
		return;
	}
	async getEventsDayGroup(dayCount: number, videoId: string): Promise<ViewsRecord[]> {
		let viewsRecords: ViewsRecord[] = [];
		const distributionSet = await this.clickhouseClient.query({
			query: `
			SELECT 
				toDate(time) AS time,
				sum(view_count) AS views
			FROM video_views
			WHERE time >= now() - INTERVAL ${dayCount} DAY AND video_id = '${videoId}'
			GROUP BY time
			ORDER BY time ASC;
			`,
			format: 'JSONEachRow',
		});

		const stream = distributionSet.stream();
		stream.on('data', (rows: Row[]) => {
			viewsRecords = rows.map(r => r.json() as ViewsRecord);
		});

		return new Promise((resolve, reject) => {
			stream.on('end', () => resolve(viewsRecords));
			stream.on('error', reject);
		});
	}
	async getEventsHourGroup(dayCount: number, videoId: string): Promise<ViewsRecord[]> {
		let viewsRecords: ViewsRecord[] = [];
		const distributionSet = await this.clickhouseClient.query({
			query: `
			SELECT 
				toStartOfHour(time) AS time,
				sum(view_count) AS views
			FROM video_views
			WHERE time >= now() - INTERVAL ${dayCount} DAY AND video_id = '${videoId}'
			GROUP BY time
			ORDER BY time ASC;
			`,
			format: 'JSONEachRow',
		});

		const stream = distributionSet.stream();
		stream.on('data', (rows: Row[]) => {
			viewsRecords = rows.map(r => r.json() as ViewsRecord);
		});

		return new Promise((resolve, reject) => {
			stream.on('end', () => resolve(viewsRecords));
			stream.on('error', reject);
		});
	}
}
