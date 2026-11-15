import { createElement } from "react";
import { cn } from "@/lib/utils";
import { getItemTypeColorClass, getItemTypeIcon } from "@/lib/item-type-icons";

interface ItemTypeIconProps {
  icon: string | null | undefined;
  color: string | null | undefined;
  className?: string;
}

export function ItemTypeIcon({ icon, color, className }: ItemTypeIconProps) {
  return createElement(getItemTypeIcon(icon), {
    className: cn(getItemTypeColorClass(color), className),
  });
}
