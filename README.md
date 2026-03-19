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
That module is the in-repo source of truth for the current shared dataset: a curated subset of
ISO 3166-1 alpha-2 country codes with Norwegian display names, continent grouping, and subregion
metadata used by filtering and suggestion helpers.

Source and attribution notes:

- Country identifiers follow the ISO 3166-1 alpha-2 standard. The current list is curated in-repo
  for the prototype rather than imported as a complete third-party snapshot, so coverage-oriented
  UI should describe percentages as coverage of the shared dataset instead of the full world.
- The reusable selectors live in `src/features/countries/travelStats.ts`.
- The local map asset in `src/components/WorldMapIllustration.tsx` is a simplified in-repo SVG
  placeholder authored for this prototype rather than a bundled external geography dataset, so
  there is currently no separate third-party map license file to redistribute.
