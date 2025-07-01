import pino, { BaseLogger } from 'pino';
import fs from 'fs';
import path from 'path';

import 'dotenv/config';

export class Logger {
	public static _instance: Logger;
	private logger: BaseLogger | undefined;

	constructor() {
		if (Logger._instance) {
			return Logger._instance;
		}

		const logDir = process.env.LOGS_DIR || path.join(__dirname, '../../../logs');

		if (!fs.existsSync(logDir)) {
			fs.mkdirSync(logDir);
		}

		const prettyTransport = pino.transport({ target: 'pino-pretty', options: { colorize: true } });
		const fileTransport = pino.transport({
			target: 'pino/file',
			options: { destination: path.join(logDir, 'app.log') },
		});

		this.logger = pino({}, pino.multistream([prettyTransport, fileTransport]));

		Logger._instance = this;
	}

	public getLogger() {
		return this.logger as BaseLogger;
	}
}
