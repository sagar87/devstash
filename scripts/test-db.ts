import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function testDatabase(): Promise<void> {
  await prisma.$queryRaw`SELECT 1`;
  console.log("Connected to database");

  const [users, items, collections, tags, itemTypes] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.collection.count(),
    prisma.tag.count(),
    prisma.itemType.count(),
  ]);
  console.table({ users, items, collections, tags, itemTypes });

  const systemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    select: { name: true, icon: true, color: true },
    orderBy: { name: "asc" },
  });
  console.log("System item types:");
  console.table(systemTypes);
}

testDatabase()
  .catch((error: unknown) => {
    console.error("Database test failed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
