import { PrismaClient } from '@/lib/generated/prisma'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Log the queries to the console
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
