const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient({
    log: ["error", "info", "query", "warn"],
  });

  module.exports = prismaClient;