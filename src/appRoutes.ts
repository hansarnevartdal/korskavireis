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
      'Mitt kart bruker nå felles landmetadata, kontinentfiltre og statistikkhjelpere i stedet for side-lokale plassholdere.',
    heroHighlights: [
      'Statistikk beregnes fra samme visitedCountryCodes-datasett som resten av appen',
      'Kontinentvalg kommer fra ett delt metadataregister',
      'Kartflaten viser et lokalt, gjenbrukbart verdenskart-asset',
    ],
  },
  {
    path: '/utforsk',
    navLabel: 'Utforsk',
    heroEyebrow: 'Sammenligning',
    heroTitle: 'Klar for sammenligning mellom reisende',
    heroDescription:
      'Utforsk-siden leser nå delte sammenligningsdata, rangeringer og dekning fra samme landdatasett som de andre visningene.',
    heroHighlights: [
      'Sammenligningskort beregnes med delte hjelpeselektorer',
      'Kartflaten gjenbruker samme lokale verdenskart-asset som Mitt kart',
      'Differanser og overlapp kommer fra én felles datamodell',
    ],
  },
  {
    path: '/highscore',
    navLabel: 'Highscore',
    heroEyebrow: 'Rangering',
    heroTitle: 'Podium og rangering i samme oppsett',
    heroDescription:
      'Highscore-siden er koblet til delte leaderboard-beregninger, slik at rangeringen kan gjenbrukes uten duplisert logikk.',
    heroHighlights: [
      'Podium og liste bruker samme rangeringsgrunnlag',
      'Verdensandel beregnes i én delt helper',
      'Klar for senere profiler uten manuell oppdatering av siden',
    ],
  },
  {
    path: '/ferieforslag',
    navLabel: 'Ferieforslag',
    heroEyebrow: 'Neste tur',
    heroTitle: 'Forslagssiden har plass til forklarbare anbefalinger',
    heroDescription:
      'Ferieforslag bygger nå på delte subregioner og manglende dekning i datasettet i stedet for faste, håndskrevne kort.',
    heroHighlights: [
      'Anbefalinger henter region og land fra samme metadataregister',
      'Begrunnelser bruker delte dekningstall per kontinent',
      'Samme datalag kan utvides med flere regler senere',
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
