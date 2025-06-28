import { PrismaClient } from '../../generated/prisma';

export class Prisma {
	private static _instance: Prisma;
	public client: PrismaClient | undefined;

	constructor() {
		if (Prisma._instance) {
			return Prisma._instance;
		}

		try {
			this.client = new PrismaClient();
			console.log('Connected to postgreSQL');
		} catch (error) {
			console.log('Error connecting to postgreSQL', error);
		}

		Prisma._instance = this;
	}

	public getClient() {
		return this.client as PrismaClient;
	}
}
