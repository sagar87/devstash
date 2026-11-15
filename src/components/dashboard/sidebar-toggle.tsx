"use client";

import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/dashboard/sidebar-context";

export function SidebarToggle() {
  const { toggleCollapsed, setMobileOpen } = useSidebar();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Open sidebar"
        onClick={() => setMobileOpen(true)}
      >
        <PanelLeft />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:inline-flex"
        aria-label="Toggle sidebar"
        onClick={toggleCollapsed}
      >
        <PanelLeft />
      </Button>
    </>
  );
}
