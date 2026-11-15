import "dotenv/config";
import { prisma } from "../src/lib/prisma";

interface SystemItemType {
  name: string;
  icon: string;
  color: string;
}

// `icon` holds lucide-react icon names (see src/lib/item-type-icons.ts).
const SYSTEM_ITEM_TYPES: SystemItemType[] = [
  { name: "Snippets", icon: "Code", color: "#3b82f6" },
  { name: "Prompts", icon: "Sparkles", color: "#8b5cf6" },
  { name: "Commands", icon: "Terminal", color: "#f97316" },
  { name: "Notes", icon: "StickyNote", color: "#fde047" },
  { name: "Files", icon: "File", color: "#6b7280" },
  { name: "Images", icon: "Image", color: "#ec4899" },
  { name: "Links", icon: "Link", color: "#10b981" },
];

// System types have a null userId, and Postgres treats nulls as distinct in
// unique indexes, so upsert manually to keep the seed idempotent.
async function seedItemTypes(): Promise<void> {
  for (const type of SYSTEM_ITEM_TYPES) {
    const existing = await prisma.itemType.findFirst({
      where: { userId: null, name: type.name },
    });

    if (existing) {
      await prisma.itemType.update({
        where: { id: existing.id },
        data: { icon: type.icon, color: type.color, isSystem: true },
      });
    } else {
      await prisma.itemType.create({ data: { ...type, isSystem: true } });
    }
  }
}

seedItemTypes()
  .then(() => console.log(`Seeded ${SYSTEM_ITEM_TYPES.length} system item types`))
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
