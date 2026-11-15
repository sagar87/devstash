"use client";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useSidebar } from "@/components/dashboard/sidebar-context";

interface SidebarContainerProps {
  children: React.ReactNode;
}

// Desktop: an inline column that collapses to an icon rail.
export function DesktopSidebar({ children }: SidebarContainerProps) {
  const { collapsed } = useSidebar();

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        "group/sidebar hidden shrink-0 border-r bg-sidebar text-sidebar-foreground transition-[width] duration-200 md:block",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {children}
    </aside>
  );
}

// Mobile: always a drawer.
export function MobileSidebar({ children }: SidebarContainerProps) {
  const { mobileOpen, setMobileOpen } = useSidebar();

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetContent
        side="left"
        className="w-72 gap-0 bg-sidebar p-0 text-sidebar-foreground md:hidden"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  );
}
