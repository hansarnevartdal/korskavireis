export type AppRoute = {
  path: string
  navLabel: string
  heroEyebrow: string
  heroTitle: string
  heroDescription: string
  heroHighlights: string[]
}

export const appRoutes: AppRoute[] = [
  {
    path: '/',
    navLabel: 'Reisende',
    heroEyebrow: 'Oppstart',
    heroTitle: 'Velg reisende og fortsett eventyret',
    heroDescription:
      'Bootstrappen legger på plass skall, navigasjon og sidehierarki for den første versjonen av Reisekart.',
    heroHighlights: [
      'Arkitektur for nettleseren med Vite og React',
      'Klar for lokale profiler og landdata i neste iterasjon',
      'Felles sideoppsett som alle visninger kan bygge videre på',
    ],
  },
  {
    path: '/mitt-kart',
    navLabel: 'Mitt kart',
    heroEyebrow: 'Kartoversikt',
    heroTitle: 'Grunnflate for personlig reisekart',
    heroDescription:
      'Denne siden viser hvordan statistikk, filtre og kartflate kan settes sammen i en senere implementasjon.',
    heroHighlights: [
      'Kort for hovedtall og progresjon',
      'Filtre som kan gjenbrukes på tvers av visninger',
      'Plassholder for interaktivt verdenskart og landliste',
    ],
  },
  {
    path: '/utforsk',
    navLabel: 'Utforsk',
    heroEyebrow: 'Sammenligning',
    heroTitle: 'Klar for sammenligning mellom reisende',
    heroDescription:
      'Skallet er satt opp for å sammenligne profiler, delte statistikker og kartutsnitt med samme designsystem.',
    heroHighlights: [
      'Gjenbrukbare sammenligningskort',
      'Egen flate for visuell kartanalyse',
      'Bygget for senere innhold basert på delt landdatasett',
    ],
  },
  {
    path: '/highscore',
    navLabel: 'Highscore',
    heroEyebrow: 'Rangering',
    heroTitle: 'Podium og rangering i samme oppsett',
    heroDescription:
      'Highscore-siden er klargjort for å vise topp tre, rangerte profiler og fremdriftsindikatorer.',
    heroHighlights: [
      'Podium-seksjon med tydelig hierarki',
      'Listeoppsett som passer for score og fremdrift',
      'Samme kort- og fargelogikk som resten av appen',
    ],
  },
  {
    path: '/ferieforslag',
    navLabel: 'Ferieforslag',
    heroEyebrow: 'Neste tur',
    heroTitle: 'Forslagssiden har plass til forklarbare anbefalinger',
    heroDescription:
      'Layouten for ferieforslag er klar for regler, regiongrupperinger og korte begrunnelser per turforslag.',
    heroHighlights: [
      'Kort som forklarer hvorfor et forslag matcher',
      'Plass til region, land og dekning i samme kort',
      'Enkel å utvide med heuristikker i senere arbeid',
    ],
  },
]

export const defaultRoute = appRoutes[0]
export const notFoundRoute: AppRoute = {
  path: '*',
  navLabel: 'Fant ikke siden',
  heroEyebrow: 'Fant ikke siden',
  heroTitle: 'Denne siden finnes ikke i Reisekart',
  heroDescription:
    'Ruten du forsøkte å åpne er ikke tilgjengelig i denne versjonen. Gå tilbake til en kjent side for å fortsette.',
  heroHighlights: [
    'Hovednavigasjonen leder til sidene som er tilgjengelige nå',
    'Appskallet er klart for flere ruter i senere iterasjoner',
    'Du kan trygt gå tilbake uten å miste oversikten over appen',
  ],
}

export function getRouteMeta(pathname: string): AppRoute {
  return appRoutes.find((route) => route.path === pathname) ?? notFoundRoute
}
