import { registerWhitelist } from '@core-cast/prisma';

export interface IRegisterWhitelistRepository {
	createRegisterWhitelist(validForDays: number): Promise<registerWhitelist>;
	getRegisterWhitelistById(id: string): Promise<registerWhitelist | null>;
	deleteRegisterWhitelistById(id: string): Promise<registerWhitelist | null>;
}
