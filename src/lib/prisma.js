import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis;

function createPrismaClient() {
  return new PrismaClient();
}

function hasContentModels(client) {
  return Boolean(client?.promo) && Boolean(client?.galleryImage);
}

const cachedPrisma = globalForPrisma.prisma;

export const prisma = hasContentModels(cachedPrisma)
  ? cachedPrisma
  : createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
