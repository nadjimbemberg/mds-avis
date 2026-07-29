const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

module.exports = prisma;
