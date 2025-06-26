import express, { Router } from 'express';
import cors from 'cors';

export class Server {
	public readonly app = express();

	constructor(private readonly port: number, private readonly routes: Router) {}

	private configure() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		this.app.use(cors({ origin: '*', methods: ['PUT', 'POST'] })); //TODO: Add to configuration / improve

		this.app.use('/api', this.routes);
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
