import { PrismaClient } from './generated/prisma';
export declare class Prisma {
    private static _instance;
    private client;
    static getInstance(): Prisma;
    connect(url: string): Promise<void>;
    get prismaClient(): PrismaClient;
}
export * from './generated/prisma';
