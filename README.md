# Reisekart

Reisekart is a browser-first TypeScript SPA for tracking countries visited, comparing travelers,
surfacing highscores, and suggesting future trips. This repository currently contains the initial
application shell, routing, and shared styling foundation for those features.

## Getting started

```bash
npm install
npm run dev
```

The development server uses Vite. Open the local URL printed in the terminal to view the app.

## Available scripts

- `npm run dev` starts the local development server.
- `npm run build` runs TypeScript compilation and creates the production build.
- `npm run lint` runs ESLint across the project.
- `npm run preview` serves the production build locally.

## Current structure

- `src/components/` contains shared layout components such as the application shell.
- `src/features/countries/` contains the shared country metadata, demo traveler seeds, and reusable travel-statistics selectors.
- `src/pages/` contains route-level pages for the current navigation structure.
- `src/appRoutes.ts` defines navigation and page hero metadata in one place.

## Shared country data source

The repository now keeps its country metadata in `src/features/countries/countryData.ts`.
That module is the in-repo source of truth for ISO alpha-2 country codes, Norwegian display names,
continent grouping, and subregion metadata used by filtering and suggestion helpers.

The reusable selectors live in `src/features/countries/travelStats.ts`, while the local map asset
used by the current placeholder views is the SVG geometry in `src/components/WorldMapIllustration.tsx`.
