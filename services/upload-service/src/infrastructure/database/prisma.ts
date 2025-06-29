import { Logger } from '../../domain/logging/logger';
import { PrismaClient } from '../../generated/prisma';

export class Prisma {
	private static _instance: Prisma;
	private logger = new Logger().getLogger();
	public client: PrismaClient | undefined;

	constructor() {
		if (Prisma._instance) {
			return Prisma._instance;
		}

		try {
			this.client = new PrismaClient();
			this.logger.info('Connected to postgreSQL');
		} catch (error) {
			this.logger.error({ message: 'Failed to connect to postgreSQL', error });
		}

		Prisma._instance = this;
	}

	public getClient() {
		return this.client as PrismaClient;
	}
}
