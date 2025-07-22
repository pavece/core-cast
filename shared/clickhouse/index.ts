import { createClient } from '@clickhouse/client';
import { NodeClickHouseClient } from '@clickhouse/client/dist/client';

type clickhouseConnectionParams = {
	url: string;
	database: string;
	username: string;
};

export class ClickhouseClient {
	private static _instance: ClickhouseClient;

	public client: NodeClickHouseClient | undefined;

	public static getInstance() {
		if (!this._instance) {
			ClickhouseClient._instance = new ClickhouseClient();
		}

		return ClickhouseClient._instance;
	}

	public async connect({ url, database, username }: clickhouseConnectionParams) {
		this.client = createClient({ url, database, username });
		await this.runInitialMigration();
	}

	private async runInitialMigration() {
		await this.client?.query({
			query:
				'CREATE TABLE IF NOT EXISTS video_views (video_id UUID, view_count UInt32, time DateTime DEFAULT now()) ENGINE = MergeTree ORDER BY (video_id, time)',
		});
	}

	public getClient() {
		if (!this.client) throw new Error('Connect before accessing the clickhouse client');
		return this.client;
	}
}
