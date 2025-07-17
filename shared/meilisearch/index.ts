import { MeiliSearch } from 'meilisearch';

export class Meili {
	private static _instance: Meili;

	public client: MeiliSearch | undefined;

	public static getInstance() {
		if (!this._instance) {
			Meili._instance = new Meili();
		}

		return Meili._instance;
	}

	public async connect(host: string, apiKey: string) {
		this.client = new MeiliSearch({ host, apiKey });
	}

	public getClient() {
		if (!this.client) throw new Error('Connect before accessing the meilsearch client');
		return this.client;
	}
}
