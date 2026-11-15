import Link from "next/link";
import { Layers, Settings, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarLink } from "@/components/dashboard/sidebar-link";
import { SidebarSection } from "@/components/dashboard/sidebar-section";
import { currentUser } from "@/lib/mock-data";
import type { SidebarCollections } from "@/types/collections";
import type { ItemTypeWithCount } from "@/types/items";
import {
  getItemTypeBgClass,
  getItemTypeColorClass,
  getItemTypeIcon,
  getItemTypeLabel,
  getItemTypeSlug,
} from "@/lib/item-type-icons";

const COLLAPSED_HIDDEN = "group-data-[collapsed=true]/sidebar:hidden";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function SidebarHeader() {
  return (
    <div className="flex h-14 shrink-0 items-center gap-2 px-4 group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:px-0">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 text-white">
        <Layers className="size-4" />
      </div>
      <span className={`text-lg font-semibold ${COLLAPSED_HIDDEN}`}>DevStash</span>
    </div>
  );
}

function TypesNav({ itemTypes }: { itemTypes: ItemTypeWithCount[] }) {
  return (
    <SidebarSection title="Types">
      {itemTypes.map((type) => {
        const Icon = getItemTypeIcon(type.icon);
        return (
          <SidebarLink
            key={type.id}
            href={`/items/${getItemTypeSlug(type.name)}`}
            label={getItemTypeLabel(type.name)}
            icon={<Icon className={getItemTypeColorClass(type.color)} />}
            trailing={type.itemCount}
          />
        );
      })}
    </SidebarSection>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 px-2 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
      {children}
    </p>
  );
}

function CollectionsNav({ collections }: { collections: SidebarCollections }) {
  return (
    <div className={COLLAPSED_HIDDEN}>
      <SidebarSection title="Collections">
        <SubHeading>Favorites</SubHeading>
        {collections.favorites.map((c) => (
          <SidebarLink
            key={c.id}
            href={`/collections/${c.id}`}
            label={c.name}
            icon={<Star className="fill-yellow-400 text-yellow-400" />}
            trailing={c.itemCount}
          />
        ))}
        <SubHeading>Recent</SubHeading>
        {collections.recent.map((c) => (
          <SidebarLink
            key={c.id}
            href={`/collections/${c.id}`}
            label={c.name}
            icon={
              <span
                className={`size-2.5 rounded-full ${getItemTypeBgClass(c.types[0]?.color)}`}
              />
            }
            trailing={c.itemCount}
          />
        ))}
        <Link
          href="/collections"
          className="mt-1 px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all collections
        </Link>
      </SidebarSection>
    </div>
  );
}

function UserArea() {
  return (
    <div className="flex shrink-0 items-center gap-3 border-t p-4 group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:px-0">
      <Avatar>
        {currentUser.image && <AvatarImage src={currentUser.image} alt={currentUser.name} />}
        <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
      </Avatar>
      <div className={`min-w-0 flex-1 ${COLLAPSED_HIDDEN}`}>
        <p className="truncate text-sm font-medium">{currentUser.name}</p>
        <p className="truncate text-xs text-muted-foreground">{currentUser.email}</p>
      </div>
      <button
        type="button"
        aria-label="Settings"
        className={`text-muted-foreground hover:text-foreground ${COLLAPSED_HIDDEN}`}
      >
        <Settings className="size-4" />
      </button>
    </div>
  );
}

interface SidebarProps {
  itemTypes: ItemTypeWithCount[];
  collections: SidebarCollections;
}

export function Sidebar({ itemTypes, collections }: SidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <SidebarHeader />
      <nav className="min-h-0 flex-1 overflow-y-auto">
        <TypesNav itemTypes={itemTypes} />
        <div className="mx-4 border-t" />
        <CollectionsNav collections={collections} />
      </nav>
      <UserArea />
    </div>
  );
}
