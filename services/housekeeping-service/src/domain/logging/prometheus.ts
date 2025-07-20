import client, { Counter, Gauge, Registry } from 'prom-client';

export class Prometheus {
	private static _instance: Prometheus;
	public register: Registry | undefined;
	public processingPrssure: Gauge | undefined;
	public completedTasks: Counter | undefined;
	public runningTasks: Gauge | undefined;
	public erroredTasks: Counter | undefined;

	constructor() {
		if (Prometheus._instance) return Prometheus._instance;

		this.register = new Registry();

		this.processingPrssure = new client.Gauge({
			name: 'processing_pressure',
			help: 'Running tasks / max running tasks ranges from 0 to 1',
		});
		this.register.registerMetric(this.processingPrssure);

		this.runningTasks = new client.Gauge({
			name: 'running_tasks',
			help: 'Running tasks',
		});
		this.register.registerMetric(this.runningTasks);

		this.completedTasks = new client.Counter({
			name: 'completed_tasks',
			help: 'Total count of sucessfully finished processing tasks',
		});
		this.register.registerMetric(this.completedTasks);

		this.erroredTasks = new client.Counter({
			name: 'errrored_tasks',
			help: 'Count of tasks that fail to complete due to an error',
		});
		this.register.registerMetric(this.erroredTasks);

		Prometheus._instance = this;
	}
}
