import { Pin } from "lucide-react";
import { CollectionCard } from "@/components/dashboard/collection-card";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { ItemRow } from "@/components/dashboard/item-row";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { getCollectionStats, getRecentCollections } from "@/lib/db/collections";
import { getItemStats, getPinnedItems, getRecentItems } from "@/lib/db/items";
import { getDemoUserId } from "@/lib/db/users";

const RECENT_COLLECTIONS_LIMIT = 6;
const RECENT_ITEMS_LIMIT = 10;

export default async function DashboardPage() {
  const userId = await getDemoUserId();
  const [recentCollections, collectionStats, pinnedItems, recentItems, itemStats] = userId
    ? await Promise.all([
        getRecentCollections(userId, RECENT_COLLECTIONS_LIMIT),
        getCollectionStats(userId),
        getPinnedItems(userId),
        getRecentItems(userId, RECENT_ITEMS_LIMIT),
        getItemStats(userId),
      ])
    : [[], { total: 0, favorites: 0 }, [], [], { total: 0, favorites: 0 }];

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Your developer knowledge hub</p>
      </header>

      <StatsCards itemStats={itemStats} collectionStats={collectionStats} />

      <DashboardSection title="Collections" viewAllHref="/collections">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recentCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </DashboardSection>

      {pinnedItems.length > 0 && (
        <DashboardSection title="Pinned" icon={<Pin className="size-4 text-muted-foreground" />}>
          <div className="flex flex-col gap-3">
            {pinnedItems.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </DashboardSection>
      )}

      <DashboardSection title="Recent Items">
        <div className="flex flex-col gap-3">
          {recentItems.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
