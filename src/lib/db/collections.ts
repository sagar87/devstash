import { prisma } from "@/lib/prisma";
import type {
  CollectionStats,
  CollectionTypeSummary,
  CollectionWithTypes,
  SidebarCollections,
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

const collectionInclude = {
  items: {
    select: {
      type: { select: { id: true, name: true, icon: true, color: true } },
    },
  },
} as const;

type CollectionRecord = Awaited<
  ReturnType<typeof prisma.collection.findMany<{ include: typeof collectionInclude }>>
>[number];

function toCollectionWithTypes({ items, ...collection }: CollectionRecord): CollectionWithTypes {
  return {
    id: collection.id,
    name: collection.name,
    description: collection.description,
    isFavorite: collection.isFavorite,
    itemCount: items.length,
    types: summarizeTypes(items.map((item) => item.type)),
  };
}

export async function getRecentCollections(
  userId: string,
  limit: number,
): Promise<CollectionWithTypes[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: collectionInclude,
  });
  return collections.map(toCollectionWithTypes);
}

export async function getSidebarCollections(
  userId: string,
  recentLimit: number,
): Promise<SidebarCollections> {
  const [favorites, recent] = await Promise.all([
    prisma.collection.findMany({
      where: { userId, isFavorite: true },
      orderBy: { name: "asc" },
      include: collectionInclude,
    }),
    prisma.collection.findMany({
      where: { userId, isFavorite: false },
      orderBy: { updatedAt: "desc" },
      take: recentLimit,
      include: collectionInclude,
    }),
  ]);
  return {
    favorites: favorites.map(toCollectionWithTypes),
    recent: recent.map(toCollectionWithTypes),
  };
}

export async function getCollectionStats(userId: string): Promise<CollectionStats> {
  const [total, favorites] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);
  return { total, favorites };
}
