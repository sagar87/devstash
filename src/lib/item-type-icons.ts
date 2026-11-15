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

const ITEM_TYPE_BORDER_CLASSES: Record<string, string> = {
  "#3b82f6": "border-l-blue-500",
  "#8b5cf6": "border-l-violet-500",
  "#f97316": "border-l-orange-500",
  "#fde047": "border-l-yellow-300",
  "#6b7280": "border-l-gray-500",
  "#ec4899": "border-l-pink-500",
  "#10b981": "border-l-emerald-500",
};

const ITEM_TYPE_BG_CLASSES: Record<string, string> = {
  "#3b82f6": "bg-blue-500",
  "#8b5cf6": "bg-violet-500",
  "#f97316": "bg-orange-500",
  "#fde047": "bg-yellow-300",
  "#6b7280": "bg-gray-500",
  "#ec4899": "bg-pink-500",
  "#10b981": "bg-emerald-500",
};

export function getItemTypeBgClass(color: string | null | undefined): string {
  return (color && ITEM_TYPE_BG_CLASSES[color]) || "bg-muted-foreground";
}

export function getItemTypeBorderClass(color: string | null | undefined): string {
  return (color && ITEM_TYPE_BORDER_CLASSES[color]) || "border-l-border";
}

export function getItemTypeIcon(icon: string | null | undefined): LucideIcon {
  return (icon && ITEM_TYPE_ICONS[icon]) || File;
}

export function getItemTypeColorClass(color: string | null | undefined): string {
  return (color && ITEM_TYPE_COLOR_CLASSES[color]) || "text-muted-foreground";
}

export function getItemTypeSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

// Display label for a type name stored as singular lowercase, e.g. "snippet" -> "Snippets".
export function getItemTypeLabel(name: string): string {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}s`;
}
