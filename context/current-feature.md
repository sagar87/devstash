# Current Feature

Stats & Sidebar — show the stats in the main area from database data instead of mock data, and show the system item types and actual collections from the database in the sidebar.

## Status

Completed

## Goals

- Display stats pertaining to database data, keeping the current design/layout
- Display item types in sidebar with their icons, linking to /items/[typename]
- Add "View all collections" link under the collections list that goes to /collections
- Keep the star icons for favorite collections; for recents, show a colored circle based on the most-used item type in that collection
- Add the database functions to `src/lib/db/items.ts` (use `src/lib/db/collections.ts` for reference)

## Notes

- Spec: @context/features/stats-sidebar-spec.md
- UI reference: @context/screenshots/dashboard-ui-main.png, @context/screenshots/dashboard-ui-drawer.png
- Replaces usage of mock data in @src/lib/mock-data.ts for stats and the sidebar
- DB item type names are singular lowercase (`snippet`, `prompt`, ...), unlike the plural names in the mock data; icon/color mapping lives in @src/lib/item-type-icons.ts
- Prisma client: @src/lib/prisma.ts; demo user is demo@devstash.io (no auth yet)
- Existing fetchers to follow as a pattern: @src/lib/db/collections.ts, @src/lib/db/users.ts, @src/lib/db/items.ts
- Database standards: @context/coding-standards.md

## History


<!-- Keep this updated, earliest to latest -->

- Created mock data file at src/lib/mock-data.ts (user, item types, collections, items)
- Started Dashboard UI Phase 1
- Implemented Phase 1: ShadCN init (button, input), dark mode default, /dashboard layout with top bar and sidebar/main placeholders
- Completed Dashboard UI Phase 1
- Started Dashboard UI Phase 2
- Implemented Phase 2: collapsible sidebar (icon rail on desktop, drawer on mobile) with type links, favorite/recent collections, and user area; added sheet, avatar, collapsible ShadCN components
- Completed Dashboard UI Phase 2
- Started Dashboard UI Phase 3
- Implemented Phase 3: dashboard main area with stats cards, recent collections, pinned items, and recent items (up to 10)
- Completed Dashboard UI Phase 3
- Started Prisma + Neon PostgreSQL setup
- Added Prisma 7 schema (NextAuth + DevStash models), prisma.config.ts, and src/lib/prisma.ts client; initial migration pending a Neon DATABASE_URL
- Applied initial migration to Neon dev DB, added system item type seed (prisma/seed.ts) and scripts/test-db.ts
- Completed Prisma + Neon PostgreSQL setup
- Started seed data feature
- Implemented seed: demo user (bcryptjs), singular system item types (legacy plural names renamed), 5 collections with 18 items; data in prisma/seed-data.ts; extended scripts/test-db.ts
- Extended scripts/test-db.ts to display demo data and verify it with checks
- Completed seed data feature
- Started dashboard collections feature
- Implemented dashboard collections: src/lib/db/collections.ts + users.ts fetch recent collections and stats from Neon; cards use real data with border color from most-used type and icons for all types
- Completed dashboard collections feature
- Started dashboard items feature
- Implemented dashboard items: src/lib/db/items.ts fetches pinned items, recent items and item stats from Neon; ItemRow and StatsCards use real data
- Completed dashboard items feature
- Started stats & sidebar feature
- Implemented stats & sidebar: sidebar loads system item types (fixed order, capitalized labels, /items/[type] links) and favorite/recent collections from Neon; recents show a colored circle from the most-used type; added "View all collections" link
- Completed stats & sidebar feature
