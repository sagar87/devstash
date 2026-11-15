import Link from "next/link";
import { MoreHorizontal, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ItemTypeIcon } from "@/components/dashboard/item-type-icon";
import { getItemTypeBorderClass } from "@/lib/item-type-icons";
import type { CollectionWithTypes } from "@/types/collections";

interface CollectionCardProps {
  collection: CollectionWithTypes;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  // Types are sorted most-used first, so the first one sets the border color.
  const dominantType = collection.types[0];

  return (
    <Link
      href={`/collections/${collection.id}`}
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-l-2 bg-card p-5 transition-colors hover:bg-muted/50",
        getItemTypeBorderClass(dominantType?.color)
      )}
    >
      <div className="flex items-center gap-2">
        <h3 className="truncate font-medium">{collection.name}</h3>
        {collection.isFavorite && (
          <Star className="size-4 shrink-0 fill-yellow-400 text-yellow-400" />
        )}
        <MoreHorizontal className="ml-auto size-4 shrink-0 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">
        {collection.itemCount} {collection.itemCount === 1 ? "item" : "items"}
      </p>
      <p className="truncate text-sm text-muted-foreground">{collection.description}</p>
      <div className="mt-1 flex gap-2">
        {collection.types.map((type) => (
          <ItemTypeIcon key={type.id} icon={type.icon} color={type.color} className="size-4" />
        ))}
      </div>
    </Link>
  );
}
