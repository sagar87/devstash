"use client";

import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <Collapsible defaultOpen className="px-3 py-2">
      <CollapsibleTrigger className="group/trigger flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground group-data-[collapsed=true]/sidebar:hidden">
        {title}
        <ChevronDown className="size-3.5 -rotate-90 transition-transform group-data-panel-open/trigger:rotate-0" />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-1 flex flex-col gap-0.5">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
