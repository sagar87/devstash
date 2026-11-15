# Current Feature

Seed Data — extend `prisma/seed.ts` to populate the database with a demo user, system item types, and sample collections and items for development and demos.

## Status

Completed

## Goals

- Demo user: demo@devstash.io / Demo User, password `12345678` (bcryptjs, 12 rounds), isPro false, emailVerified now
- 7 system item types (snippet, prompt, command, note, file, image, link) with Lucide icons and colors from the spec
- Collections with items: React Patterns (3 TS snippets), AI Workflows (3 prompts), DevOps (1 snippet, 1 command, 2 links), Terminal Commands (4 commands), Design Resources (4 links)
- Use real URLs for link items

## Notes

- Spec: @context/features/seed-spec.md
- Existing seed: @prisma/seed.ts (currently seeds only system item types, named plural e.g. "Snippets"; the spec uses singular lowercase names — reconcile with the UI and mock data when implementing)
- Needs `bcryptjs` (not yet installed)
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
