# Current Feature

Dashboard Items — replace the mock item data (pinned and recent items) in the dashboard main area with real data from the Neon database via Prisma.

## Status

Completed

## Goals

- Create `src/lib/db/items.ts` with data fetching functions
- Fetch items directly in the server component
- Item card icon/border derived from the item type
- Display item type tags and anything else currently on the cards
- If there are no pinned items, display nothing in the pinned section
- Update collection stats display

## Notes

- Spec: @context/features/dashboard-items-spec.md
- UI reference: @context/screenshots/dashboard-ui-main.png
- Replaces usage of `items` in @src/lib/mock-data.ts for the pinned and recent items sections
- DB item type names are singular lowercase (`snippet`, `prompt`, ...), unlike the plural names in the mock data; icon/color mapping lives in @src/lib/item-type-icons.ts
- Prisma client: @src/lib/prisma.ts; demo user is demo@devstash.io (no auth yet)
- Existing fetchers to follow as a pattern: @src/lib/db/collections.ts, @src/lib/db/users.ts
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
