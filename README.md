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
- `src/pages/` contains route-level pages for the current navigation structure.
- `src/appRoutes.ts` defines navigation and page hero metadata in one place.
