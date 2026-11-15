import { Sidebar } from "@/components/dashboard/sidebar";
import { DesktopSidebar, MobileSidebar } from "@/components/dashboard/sidebar-containers";
import { SidebarProvider } from "@/components/dashboard/sidebar-context";
import { TopBar } from "@/components/dashboard/top-bar";
import { getSidebarCollections } from "@/lib/db/collections";
import { getSystemItemTypes } from "@/lib/db/items";
import { getDemoUserId } from "@/lib/db/users";

const SIDEBAR_RECENT_LIMIT = 5;

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const userId = await getDemoUserId();
  const [itemTypes, collections] = userId
    ? await Promise.all([
        getSystemItemTypes(userId),
        getSidebarCollections(userId, SIDEBAR_RECENT_LIMIT),
      ])
    : [[], { favorites: [], recent: [] }];
  const sidebar = <Sidebar itemTypes={itemTypes} collections={collections} />;

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <DesktopSidebar>
          {sidebar}
        </DesktopSidebar>
        <MobileSidebar>
          {sidebar}
        </MobileSidebar>
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="min-h-0 flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
