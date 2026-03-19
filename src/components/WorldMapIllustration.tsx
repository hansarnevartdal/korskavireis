import { continentMetadata, continentOrder, type ContinentCode } from '../features/countries/countryData'

type WorldMapIllustrationProps = {
  activeContinents: ContinentCode[]
}

const continentPaths: Array<{ continent: ContinentCode; path: string }> = [
  {
    continent: 'north-america',
    path: 'M60 83c17-27 52-44 96-46l35 18 19 28-13 18-27 0-19 13-3 26-30 22-43 1-15-18 8-22-14-17 6-23z',
  },
  {
    continent: 'south-america',
    path: 'M182 179l26 16 11 35-9 29 11 33-14 29-21-7-10-36 6-34-16-26 16-39z',
  },
  {
    continent: 'europe',
    path: 'M309 85l31-18 31 10-6 18 33 11 5 15-28 10-42-3-25-15z',
  },
  {
    continent: 'africa',
    path: 'M333 144l30 8 24 41-11 69-30 28-24-20 6-40-16-41 21-45z',
  },
  {
    continent: 'asia',
    path: 'M369 70l63-18 79 11 59 28-2 28-49 12-21 18-56-11-30 12-29-18-6-30-27-13 19-19z',
  },
  {
    continent: 'oceania',
    path: 'M528 221l34-9 26 11-12 17-35 8-18-13zm55 29 17-7 13 10-4 16-18 2-10-11z',
  },
]

export function WorldMapIllustration({ activeContinents }: WorldMapIllustrationProps) {
  const activeContinentSet = new Set(activeContinents)

  return (
    <div className="world-map">
      <svg
        className="world-map-svg"
        viewBox="0 0 640 320"
        role="img"
        aria-label="Stilisert verdenskart med markerte verdensdeler"
      >
        {continentPaths.map((continentPath) => (
          <path
            key={continentPath.continent}
            d={continentPath.path}
            className={
              activeContinentSet.has(continentPath.continent)
                ? 'world-map-region world-map-region-active'
                : 'world-map-region world-map-region-muted'
            }
          />
        ))}
      </svg>

      <div className="world-map-legend">
        {continentOrder.map((continent) => (
          <span
            key={continent}
            className={`world-map-legend-item${
              activeContinentSet.has(continent) ? ' world-map-legend-item-active' : ''
            }`}
          >
            {continentMetadata[continent].label}
          </span>
        ))}
      </div>
    </div>
  )
}
