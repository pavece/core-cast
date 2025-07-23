import { PrismaClient, registerWhitelist } from '@core-cast/prisma';
import { IRegisterWhitelistRepository } from '../types';

export class RegisterWhitelistRepository implements IRegisterWhitelistRepository {
	constructor(private prismaClient: PrismaClient) {}

	createRegisterWhitelist(validForDays: number): Promise<registerWhitelist> {
		const validUntil = new Date();
		validUntil.setDate(validUntil.getDate() + validForDays);

		return this.prismaClient.registerWhitelist.create({ data: { validUntil } });
	}
	getRegisterWhitelistById(id: string): Promise<registerWhitelist | null> {
		return this.prismaClient.registerWhitelist.findUnique({ where: { id } });
	}
	deleteRegisterWhitelistById(id: string): Promise<registerWhitelist | null> {
		return this.prismaClient.registerWhitelist.delete({ where: { id } });
	}
}
