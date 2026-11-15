import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import {
  COLLECTIONS,
  LEGACY_ITEM_TYPE_NAMES,
  SYSTEM_ITEM_TYPES,
} from "./seed-data";

const DEMO_EMAIL = "demo@devstash.io";
const DEMO_PASSWORD = "12345678";
const BCRYPT_ROUNDS = 12;

async function seedDemoUser(): Promise<string> {
  const password = await bcrypt.hash(DEMO_PASSWORD, BCRYPT_ROUNDS);
  const data = {
    name: "Demo User",
    password,
    isPro: false,
    emailVerified: new Date(),
  };
  const user = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: data,
    create: { email: DEMO_EMAIL, ...data },
  });
  return user.id;
}

// System types have a null userId, and Postgres treats nulls as distinct in
// unique indexes, so upsert manually to keep the seed idempotent.
async function seedItemTypes(): Promise<Map<string, string>> {
  for (const [legacy, name] of Object.entries(LEGACY_ITEM_TYPE_NAMES)) {
    await prisma.itemType.updateMany({
      where: { userId: null, name: legacy },
      data: { name },
    });
  }

  const ids = new Map<string, string>();
  for (const type of SYSTEM_ITEM_TYPES) {
    const existing = await prisma.itemType.findFirst({
      where: { userId: null, name: type.name },
    });
    const data = { ...type, isSystem: true };
    const saved = existing
      ? await prisma.itemType.update({ where: { id: existing.id }, data })
      : await prisma.itemType.create({ data });
    ids.set(type.name, saved.id);
  }
  return ids;
}

// Demo content is replaced on every run so the seed stays idempotent.
async function seedCollections(
  userId: string,
  typeIds: Map<string, string>,
): Promise<void> {
  await prisma.item.deleteMany({ where: { userId } });
  await prisma.collection.deleteMany({ where: { userId } });

  for (const { items, ...collection } of COLLECTIONS) {
    await prisma.collection.create({
      data: {
        ...collection,
        userId,
        items: {
          create: items.map(({ type, ...item }) => {
            const typeId = typeIds.get(type);
            if (!typeId) throw new Error(`Unknown item type: ${type}`);
            return { ...item, contentType: "text", userId, typeId };
          }),
        },
      },
    });
  }
}

async function main(): Promise<void> {
  const typeIds = await seedItemTypes();
  const userId = await seedDemoUser();
  await seedCollections(userId, typeIds);
  console.log(
    `Seeded demo user, ${typeIds.size} item types and ${COLLECTIONS.length} collections`,
  );
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
