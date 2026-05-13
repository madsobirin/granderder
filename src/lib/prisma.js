import { Client } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma"; // Sesuaikan jalur ke folder output generator kamu

const prismaClientSingleton = () => {
  return new PrismaClient();
};
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prismaGlobal = prisma;
