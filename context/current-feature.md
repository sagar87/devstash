# Current Feature

Prisma + Neon PostgreSQL Setup — set up Prisma ORM with a Neon PostgreSQL database.

## Status

Completed

## Goals

- Use Neon PostgreSQL (serverless)
- Create initial schema based on data models in project-overview.md (this will evolve)
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes

## Notes

- Spec: @context/features/database-spec.md
- Initial data models: @context/project-overview.md
- Database standards: @context/coding-standards.md
- Use Prisma 7 (breaking changes) — read the upgrade guide: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
- Setup guide: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
- Development branch DB is in DATABASE_URL; a separate production branch exists. ALWAYS create migrations (`prisma migrate dev`), never `db push` unless specified.

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
