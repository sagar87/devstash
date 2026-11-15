import { prisma } from "@/lib/prisma";
import type { ItemStats, ItemTypeWithCount, ItemWithType } from "@/types/items";

const itemSelect = {
  id: true,
  title: true,
  description: true,
  isPinned: true,
  isFavorite: true,
  createdAt: true,
  type: { select: { id: true, name: true, icon: true, color: true } },
  tags: { select: { tag: { select: { name: true } } } },
} as const;

type ItemRecord = Awaited<
  ReturnType<typeof prisma.item.findMany<{ select: typeof itemSelect }>>
>[number];

function toItemWithType({ tags, ...item }: ItemRecord): ItemWithType {
  return { ...item, tags: tags.map(({ tag }) => tag.name) };
}

export async function getPinnedItems(userId: string): Promise<ItemWithType[]> {
  const items = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: "desc" },
    select: itemSelect,
  });
  return items.map(toItemWithType);
}

export async function getRecentItems(
  userId: string,
  limit: number,
): Promise<ItemWithType[]> {
  const items = await prisma.item.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: itemSelect,
  });
  return items.map(toItemWithType);
}

export async function getItemStats(userId: string): Promise<ItemStats> {
  const [total, favorites] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
  ]);
  return { total, favorites };
}

const SYSTEM_TYPE_ORDER = ["snippet", "prompt", "command", "note", "file", "image", "link"];

function systemTypeRank(name: string): number {
  const index = SYSTEM_TYPE_ORDER.indexOf(name);
  return index === -1 ? SYSTEM_TYPE_ORDER.length : index;
}

export async function getSystemItemTypes(userId: string): Promise<ItemTypeWithCount[]> {
  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      icon: true,
      color: true,
      _count: { select: { items: { where: { userId } } } },
    },
  });
  return types
    .map(({ _count, ...type }) => ({ ...type, itemCount: _count.items }))
    .sort((a, b) => systemTypeRank(a.name) - systemTypeRank(b.name));
}
