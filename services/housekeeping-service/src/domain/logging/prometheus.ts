import client, { Counter, Histogram, Registry } from 'prom-client';

export class Prometheus {
	private static _instance: Prometheus;
	public register: Registry | undefined;
	public jobDuration: Histogram | undefined;
	public completedTasks: Counter | undefined;
	public erroredTasks: Counter | undefined;

	constructor() {
		if (Prometheus._instance) return Prometheus._instance;

		this.register = new Registry();

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
