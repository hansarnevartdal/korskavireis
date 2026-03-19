import { WorldMapIllustration } from '../components/WorldMapIllustration'
import { continentFilterOptions } from '../features/countries/countryData'
import { featuredTraveler } from '../features/countries/demoTravelers'
import { getTravelerSummary } from '../features/countries/travelStats'

export function MyMapPage() {
  const travelerSummary = getTravelerSummary(featuredTraveler)
  const stats = [
    {
      label: 'Besøkte land',
      value: `${travelerSummary.visitedCountryCount}`,
      detail: 'Beregnet fra visitedCountryCodes i den delte datamodellen',
    },
    {
      label: 'Verdensandel',
      value: `${travelerSummary.worldPercentage}%`,
      detail: 'Bruker samme verdensgrunnlag som Highscore og Utforsk',
    },
    {
      label: 'Kontinenter',
      value: `${travelerSummary.visitedContinentCount}`,
      detail: 'Bygger på samme kontinentgruppering som filter og forslag',
    },
  ]

  return (
    <section className="page-stack">
      <div className="stat-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="card stat-card">
            <p className="card-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
            <p className="card-note">{stat.detail}</p>
          </article>
        ))}
      </div>

      <article className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Filtre</p>
            <h2>Kontinentvalg kommer fra det delte metadataregisteret</h2>
          </div>
        </div>

        <div className="pill-list">
          {continentFilterOptions.map((filter) => (
            <span key={filter} className="pill">
              {filter}
            </span>
          ))}
        </div>
      </article>

      <div className="page-grid page-grid-two">
        <article className="card map-card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Kartflate</p>
              <h2>Verdenskartet bruker et lokalt asset som kan gjenbrukes senere</h2>
            </div>
            <span className="metric-chip">{featuredTraveler.displayName}</span>
          </div>

          <div className="map-preview">
            <WorldMapIllustration
              activeContinents={travelerSummary.continentBreakdown
                .filter((continent) => continent.visitedCount > 0)
                .map((continent) => continent.continent)}
            />
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Landliste</p>
              <h2>Landlisten bruker samme navne- og regionsdata som resten av appen</h2>
            </div>
          </div>

          <div className="list-stack">
            {travelerSummary.visitedCountries.slice(0, 8).map((country) => (
              <article key={country.code} className="list-row">
                <div>
                  <p className="list-row-title">{country.name}</p>
                  <p className="list-row-subtitle">
                    {country.subregion} · {country.code}
                  </p>
                </div>
                <span className="pill">Besøkt</span>
              </article>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
