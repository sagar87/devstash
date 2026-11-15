import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

const DEMO_EMAIL = "demo@devstash.io";
const DEMO_PASSWORD = "12345678";
const EXPECTED_TYPES = [
  "snippet",
  "prompt",
  "command",
  "note",
  "file",
  "image",
  "link",
];
const EXPECTED_COLLECTIONS: Record<string, number> = {
  "React Patterns": 3,
  "AI Workflows": 3,
  DevOps: 4,
  "Terminal Commands": 4,
  "Design Resources": 4,
};

const failures: string[] = [];

function check(label: string, passed: boolean): void {
  console.log(`${passed ? "PASS" : "FAIL"}  ${label}`);
  if (!passed) failures.push(label);
}

function preview(text: string | null, max = 50): string {
  if (!text) return "";
  const line = text.split("\n")[0];
  return line.length > max ? `${line.slice(0, max)}…` : line;
}

async function showCounts(): Promise<void> {
  await prisma.$queryRaw`SELECT 1`;
  console.log("Connected to database\n");

  const [users, items, collections, tags, itemTypes] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.collection.count(),
    prisma.tag.count(),
    prisma.itemType.count(),
  ]);
  console.table({ users, items, collections, tags, itemTypes });
}

async function showItemTypes(): Promise<void> {
  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    select: {
      name: true,
      icon: true,
      color: true,
      _count: { select: { items: true } },
    },
    orderBy: { name: "asc" },
  });
  console.log("\nSystem item types:");
  console.table(
    types.map(({ _count, ...type }) => ({ ...type, items: _count.items })),
  );

  const names = types.map((t) => t.name);
  check(
    "all 7 system item types exist",
    EXPECTED_TYPES.every((name) => names.includes(name)),
  );
}

async function showDemoUser(): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
    include: {
      collections: {
        orderBy: { name: "asc" },
        include: {
          items: {
            orderBy: { createdAt: "asc" },
            include: { type: { select: { name: true } } },
          },
        },
      },
    },
  });

  check("demo user exists", user !== null);
  if (!user) return;

  console.log("\nDemo user:");
  console.table([
    {
      name: user.name,
      email: user.email,
      isPro: user.isPro,
      emailVerified: user.emailVerified?.toISOString(),
    },
  ]);

  for (const collection of user.collections) {
    const fav = collection.isFavorite ? " ★" : "";
    console.log(`\n${collection.name}${fav} — ${collection.description}`);
    console.table(
      collection.items.map((item) => ({
        type: item.type.name,
        title: item.title,
        language: item.language ?? "",
        pinned: item.isPinned,
        favorite: item.isFavorite,
        content: preview(item.url ?? item.content),
      })),
    );
  }

  check("demo user is not Pro", !user.isPro);
  check("demo user email is verified", user.emailVerified !== null);
  check(
    "demo password hash matches",
    user.password !== null &&
      (await bcrypt.compare(DEMO_PASSWORD, user.password)),
  );

  const counts = Object.fromEntries(
    user.collections.map((c) => [c.name, c.items.length]),
  );
  for (const [name, expected] of Object.entries(EXPECTED_COLLECTIONS)) {
    check(`"${name}" has ${expected} items`, counts[name] === expected);
  }

  const linksHaveUrls = user.collections
    .flatMap((c) => c.items)
    .filter((i) => i.type.name === "link")
    .every((i) => i.url?.startsWith("https://"));
  check("all link items have https URLs", linksHaveUrls);
}

async function testDatabase(): Promise<void> {
  await showCounts();
  await showItemTypes();
  await showDemoUser();

  console.log(
    failures.length
      ? `\n${failures.length} check(s) failed`
      : "\nAll checks passed",
  );
  if (failures.length) process.exitCode = 1;
}

testDatabase()
  .catch((error: unknown) => {
    console.error("Database test failed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
