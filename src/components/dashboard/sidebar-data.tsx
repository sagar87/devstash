import { cache } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { getSidebarCollections } from "@/lib/db/collections";
import { getSystemItemTypes } from "@/lib/db/items";
import { getDemoUserId } from "@/lib/db/users";

const SIDEBAR_RECENT_LIMIT = 5;

// Shared by the desktop and mobile sidebars so each request queries once.
const getSidebarData = cache(async () => {
  const userId = await getDemoUserId();
  if (!userId) return { itemTypes: [], collections: { favorites: [], recent: [] } };
  const [itemTypes, collections] = await Promise.all([
    getSystemItemTypes(userId),
    getSidebarCollections(userId, SIDEBAR_RECENT_LIMIT),
  ]);
  return { itemTypes, collections };
});

export async function SidebarData() {
  const { itemTypes, collections } = await getSidebarData();
  return <Sidebar itemTypes={itemTypes} collections={collections} />;
}
