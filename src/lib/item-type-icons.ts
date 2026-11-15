import {
  Code,
  File,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

// Maps the `icon` names stored on item types to lucide components.
const ITEM_TYPE_ICONS: Record<string, LucideIcon> = {
  Code,
  File,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
};

// Maps item type colors to Tailwind text classes (styling stays in Tailwind).
const ITEM_TYPE_COLOR_CLASSES: Record<string, string> = {
  "#3b82f6": "text-blue-500",
  "#8b5cf6": "text-violet-500",
  "#f97316": "text-orange-500",
  "#fde047": "text-yellow-300",
  "#6b7280": "text-gray-500",
  "#ec4899": "text-pink-500",
  "#10b981": "text-emerald-500",
};

export function getItemTypeIcon(icon: string | null | undefined): LucideIcon {
  return (icon && ITEM_TYPE_ICONS[icon]) || File;
}

export function getItemTypeColorClass(color: string | null | undefined): string {
  return (color && ITEM_TYPE_COLOR_CLASSES[color]) || "text-muted-foreground";
}

export function getItemTypeSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}
