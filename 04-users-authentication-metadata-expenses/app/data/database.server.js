import { PrismaClient } from "@prisma/client";

/**
 * @type PrismaClient
 */
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global.__db) {
    //Prevent remaking connections in Dev mode since every change reloads the page and would restart the database connection
    global.__db = new PrismaClient();
    global.__db.$connect();
  }
  prisma = global.__db;
}

export { prisma };
