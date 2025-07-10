import { Router } from 'express';

export class ApiRouter {
	public static get routes() {
		const router = Router();

        router.get("/", (req, res) => {res.send("Hello world")})

		return router;
	}
}
