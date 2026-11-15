# Current Feature

Dashboard UI Phase 2 — collapsible sidebar with item types, favorite and recent collections, user avatar area, and a mobile drawer (phase 2 of 3).

## Status

Completed

## Goals

- Collapsible sidebar
- Items/types with links to /items/TYPE (eg. /items/snippets)
- Favorite collections
- Most recent collections
- User avatar area at the bottom
- Drawer icon to open/close sidebar
- Always a drawer on mobile view

## Notes

- Spec: @context/features/dashboard-phase-2-spec.md
- UI reference: @context/screenshots/dashboard-ui-main.png
- Project overview: @context/project-overview.md
- Mock data: @src/lib/mock-data.ts (import directly until the database is implemented)
- Previous phase: @context/features/dashboard-phase-1-spec.md
- Next phase: @context/features/dashboard-phase-3-spec.md

## History

<!-- Keep this updated, earliest to latest -->

- Created mock data file at src/lib/mock-data.ts (user, item types, collections, items)
- Started Dashboard UI Phase 1
- Implemented Phase 1: ShadCN init (button, input), dark mode default, /dashboard layout with top bar and sidebar/main placeholders
- Completed Dashboard UI Phase 1
- Started Dashboard UI Phase 2
- Implemented Phase 2: collapsible sidebar (icon rail on desktop, drawer on mobile) with type links, favorite/recent collections, and user area; added sheet, avatar, collapsible ShadCN components
- Completed Dashboard UI Phase 2
