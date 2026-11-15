import { prisma } from "@/lib/prisma";
import type {
  CollectionStats,
  CollectionTypeSummary,
  CollectionWithTypes,
} from "@/types/collections";

type ItemTypeRow = Omit<CollectionTypeSummary, "count">;

// Groups a collection's item types by usage, most-used first.
function summarizeTypes(itemTypes: ItemTypeRow[]): CollectionTypeSummary[] {
  const summaries = new Map<string, CollectionTypeSummary>();
  for (const type of itemTypes) {
    const existing = summaries.get(type.id);
    if (existing) existing.count += 1;
    else summaries.set(type.id, { ...type, count: 1 });
  }
  return [...summaries.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );
}

export async function getRecentCollections(
  userId: string,
  limit: number,
): Promise<CollectionWithTypes[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: {
      items: {
        select: {
          type: { select: { id: true, name: true, icon: true, color: true } },
        },
      },
    },
  });

  return collections.map(({ items, ...collection }) => ({
    id: collection.id,
    name: collection.name,
    description: collection.description,
    isFavorite: collection.isFavorite,
    itemCount: items.length,
    types: summarizeTypes(items.map((item) => item.type)),
  }));
}

export async function getCollectionStats(userId: string): Promise<CollectionStats> {
  const [total, favorites] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);
  return { total, favorites };
}
