import { Sidebar } from "@/components/dashboard/sidebar";
import { DesktopSidebar, MobileSidebar } from "@/components/dashboard/sidebar-containers";
import { SidebarProvider } from "@/components/dashboard/sidebar-context";
import { TopBar } from "@/components/dashboard/top-bar";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <DesktopSidebar>
          <Sidebar />
        </DesktopSidebar>
        <MobileSidebar>
          <Sidebar />
        </MobileSidebar>
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="min-h-0 flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
