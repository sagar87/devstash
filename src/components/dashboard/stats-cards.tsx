import { FolderOpen, Layers, Star, type LucideIcon } from "lucide-react";
import type { CollectionStats } from "@/types/collections";
import type { ItemStats } from "@/types/items";

interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
}

interface StatsCardsProps {
  itemStats: ItemStats;
  collectionStats: CollectionStats;
}

export function StatsCards({ itemStats, collectionStats }: StatsCardsProps) {
  const stats: Stat[] = [
    { label: "Items", value: itemStats.total, icon: Layers },
    { label: "Collections", value: collectionStats.total, icon: FolderOpen },
    { label: "Favorite Items", value: itemStats.favorites, icon: Star },
    { label: "Favorite Collections", value: collectionStats.favorites, icon: Star },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="flex items-center gap-3 rounded-xl border bg-card p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-2xl leading-none font-semibold">{value}</p>
            <p className="mt-1 truncate text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
