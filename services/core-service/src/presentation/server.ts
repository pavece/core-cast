import express, { Router } from 'express';
import cors from 'cors';

export class Server {
	public readonly app = express();

	constructor(private readonly port: number, private readonly routes: Router) {}

	private configure() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		this.app.use(cors({ origin: '*', methods: ['PUT', 'POST', 'GET'] }));
		this.app.use(this.routes);
	}

	public start(): Promise<number> {
		this.configure();

		return new Promise((resolve, reject) => {
			this.app.listen(this.port, err => {
				if (err) {
					reject(err);
					return;
				}

				resolve(this.port);
			});
		});
	}
}
