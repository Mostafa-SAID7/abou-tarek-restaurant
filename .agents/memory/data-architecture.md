---
name: Data architecture
description: Where canonical static content lives and how components consume it
---

## Rule
Static content arrays (news, reviews, values, stats, menu items) live in `src/data/*.json` and are imported directly into Vue components. They do NOT go through localStorage or the Pinia stores.

Pinia stores (restaurantStore) are only for **dynamic/user-editable** data (branches, favorites) that needs reactivity and persistence.

## Files
- `src/data/menu.json` — all menu items (bilingual name/description/sizes/customizations)
- `src/data/news.json` — 7 news items; `news[0]` is featured (used by NewsView); `news.slice(0,3)` used by LandingView
- `src/data/reviews.json` — 5 customer reviews
- `src/data/values.json` — 4 company values (used by AboutView)
- `src/data/stats.json` — `{ hero: [...4 items], landing: [...4 items] }` — HomeView uses `hero`, LandingView uses `landing`

**Why:** Eliminates duplicated hardcoded arrays across components. Single source of truth per content type. Components stay thin.

**How to apply:** Any new static content section should get its own data file, not a hardcoded array inside the component script.
