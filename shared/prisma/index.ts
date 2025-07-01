import { PrismaClient } from './generated/prisma/index';

export class Prisma {
	private static _instance: Prisma;
	private client: PrismaClient | undefined;

	private constructor() {}

	public static getInstance() {
		if (!Prisma._instance) {
			Prisma._instance = new Prisma();
		}
		return Prisma._instance;
	}

	public async connect(url: string) {
		this.client = new PrismaClient({ datasources: { db: { url } } });
		this.client.$connect();
	}

	public get prismaClient() {
		return this.client as PrismaClient;
	}
}

export { PrismaClient };
