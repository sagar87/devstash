import { Pin, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ItemTypeIcon } from "@/components/dashboard/item-type-icon";
import { getItemTypeBorderClass } from "@/lib/item-type-icons";
import type { ItemWithType } from "@/types/items";

interface ItemRowProps {
  item: ItemWithType;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function ItemRow({ item }: ItemRowProps) {
  const { type } = item;

  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-xl border border-l-2 bg-card p-4",
        getItemTypeBorderClass(type.color)
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <ItemTypeIcon icon={type.icon} color={type.color} className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-medium">{item.title}</h3>
          {item.isPinned && <Pin className="size-3.5 shrink-0 text-muted-foreground" />}
          {item.isFavorite && (
            <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
          )}
        </div>
        <p className="truncate text-sm text-muted-foreground">{item.description}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <time dateTime={item.createdAt.toISOString()} className="shrink-0 text-xs text-muted-foreground">
        {formatDate(item.createdAt)}
      </time>
    </div>
  );
}
