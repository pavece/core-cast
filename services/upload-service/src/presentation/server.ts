import express, { Router } from 'express';
import cors from 'cors';
import { Prometheus } from '../domain/logging/prometheus';

export class Server {
	public readonly app = express();
	private prometheus = new Prometheus();

	constructor(private readonly port: number, private readonly routes: Router) {}

	private configure() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		this.app.use(cors({ origin: '*', methods: ['PUT', 'POST', 'GET'] })); //TODO: Add to configuration / improve

		this.app.use('/api', this.routes);

		//Prometheus metrics endpoint
		this.app.get('/metrics', async (req, res) => {
			res.set('Content-Type', this.prometheus.register?.contentType);
			res.send(await this.prometheus.register?.metrics());
		});
	}

	public start() {
		this.configure();

		this.app.listen(this.port, err => {
			if (err) {
				console.error('Failed to start HTTP server: ', err);
				return;
			}

			console.log(`HTTP Server started on port ${this.port}`);
		});
	}
}
