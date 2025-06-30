import client, { Counter, Registry } from 'prom-client';

export class Prometheus {
	private static _instance: Prometheus;
	public register: Registry | undefined;
	public uploadBytesCounter: Counter | undefined;
	public uploadChunksCounter: Counter | undefined;
	public uploadFilesCounter: Counter | undefined;

	constructor() {
		if (Prometheus._instance) return Prometheus._instance;

		this.register = new Registry();

		this.uploadBytesCounter = new client.Counter({
			name: 'total_bytes',
			help: 'uploaded bytes (completed & non completed)',
		});
		this.register.registerMetric(this.uploadBytesCounter);

		this.uploadChunksCounter = new client.Counter({
			name: 'total_chunks',
			help: 'uploaded chunks (completed & non completed)',
		});
		this.register.registerMetric(this.uploadChunksCounter);

		this.uploadFilesCounter = new client.Counter({
			name: 'total_files',
			help: 'uploaded files (completed upload)',
		});
		this.register.registerMetric(this.uploadFilesCounter);

		Prometheus._instance = this;
	}
}
