import { ClickHouse } from 'clickhouse';

type clickhouseConnectionParams = {
	url: string;
	port: number;
	database: string;
	username: string;
};

export class ClickhouseClient {
	private static _instance: ClickhouseClient;

	public client: ClickHouse | undefined;

	public static getInstance() {
		if (!this._instance) {
			ClickhouseClient._instance = new ClickhouseClient();
		}

		return ClickhouseClient._instance;
	}

	public async connect({ url, port, database, username }: clickhouseConnectionParams) {
		this.client = new ClickHouse({ url, port, config: { database }, basicAuth: { username } });
		await this.runInitialMigration();
	}

	private async runInitialMigration() {
		await this.client
			?.query(
				'CREATE TABLE IF NOT EXISTS video_views (video_id UUID, view_count UInt32, time DateTime) ENGINE = MergeTree ORDER BY (video_id, time)'
			)
			.toPromise();
	}

	public getClient() {
		if (!this.client) throw new Error('Connect before accessing the clickhouse client');
		return this.client;
	}
}
