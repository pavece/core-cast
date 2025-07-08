"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prisma = void 0;
const prisma_1 = require("./generated/prisma");
class Prisma {
    static getInstance() {
        if (!Prisma._instance) {
            Prisma._instance = new Prisma();
        }
        return Prisma._instance;
    }
    async connect(url) {
        this.client = new prisma_1.PrismaClient({ datasources: { db: { url } } });
        await this.client.$connect();
    }
    get prismaClient() {
        return this.client;
    }
}
exports.Prisma = Prisma;
__exportStar(require("./generated/prisma"), exports);
