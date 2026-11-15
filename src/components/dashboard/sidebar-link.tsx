"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/dashboard/sidebar-context";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  trailing?: React.ReactNode;
}

export function SidebarLink({ href, label, icon, trailing }: SidebarLinkProps) {
  const pathname = usePathname();
  const { setMobileOpen } = useSidebar();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      title={label}
      onClick={() => setMobileOpen(false)}
      className={cn(
        "flex h-9 items-center gap-3 rounded-md px-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsed=true]/sidebar:justify-center",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
      )}
    >
      <span className="flex shrink-0 [&_svg]:size-4">{icon}</span>
      <span className="flex-1 truncate group-data-[collapsed=true]/sidebar:hidden">
        {label}
      </span>
      {trailing && (
        <span className="text-xs text-muted-foreground group-data-[collapsed=true]/sidebar:hidden">
          {trailing}
        </span>
      )}
    </Link>
  );
}
