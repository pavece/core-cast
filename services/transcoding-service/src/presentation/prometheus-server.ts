import express from 'express';
import { Prometheus } from '../domain/logging/prometheus';

export class PrometheusServer {
	private app = express();
	private prometheus = new Prometheus();
	private port = 3000;

	constructor(port: number) {
		this.port = port;
	}

	public start() {
		this.app.get('/metrics', async (req, res) => {
			res.set('Content-Type', this.prometheus.register?.contentType);
			res.send(await this.prometheus.register?.metrics());
		});

		this.app.listen(this.port, () => {console.log(`Prometheus HTTP server started on port ${this.port}`)});
	}
}
