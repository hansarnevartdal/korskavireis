import { Link } from 'react-router-dom'
import { WorldMapIllustration } from '../components/WorldMapIllustration'
import { continentFilterOptions } from '../features/countries/countryData'
import { getTravelerSummary } from '../features/countries/travelStats'
import { useTravelers } from '../features/travelers/TravelerContext'

const placeholderCountries = ['Norge', 'Sverige', 'Danmark', 'Tyskland', 'Italia', 'Japan']

export function MyMapPage() {
  const { activeTraveler } = useTravelers()

  if (activeTraveler === null) {
    return (
      <section className="page-stack">
        <article className="card empty-state">
          <p className="eyebrow">Aktiv profil mangler</p>
          <h2>Velg en reisende før du åpner Mitt kart</h2>
          <p className="section-copy">
            Reisekart trenger en aktiv profil for å vise riktig kontekst. Gå tilbake til
            Reisende-siden og velg eller opprett en profil først.
          </p>
          <Link to="/" className="cta-link">
            Gå til Reisende
          </Link>
        </article>
      </section>
    )
  }

  const travelerSummary = getTravelerSummary(activeTraveler)
  const stats = [
    {
      label: 'Aktiv profil',
      value: activeTraveler.displayName,
      detail: 'Valgt på Reisende-siden og husket i nettleseren',
      className: 'stat-value-text',
    },
    {
      label: 'Besøkte land',
      value: `${travelerSummary.visitedCountryCount}`,
      detail:
        travelerSummary.visitedCountryCount === 0
          ? 'Ingen land er registrert ennå i denne profilen'
          : travelerSummary.unsupportedCountryCodes.length === 0
            ? 'Teller alle unike besøkskoder som er lagret på profilen'
            : `Inkluderer ${travelerSummary.unsupportedCountryCodes.length} koder utenfor datasettet`,
      className: '',
    },
    {
      label: 'Datadekning',
      value: `${travelerSummary.datasetCoveragePercentage}%`,
      detail: 'Viser hvor stor del av det delte landdatasettet profilen treffer',
      className: '',
    },
  ]

  return (
    <section className="page-stack">
      <div className="stat-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="card stat-card">
            <p className="card-label">{stat.label}</p>
            <p className={`stat-value ${stat.className}`.trim()}>{stat.value}</p>
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
              <h2>{activeTraveler.displayName} bruker nå et delt kartgrunnlag</h2>
            </div>
            <span className="metric-chip">{travelerSummary.visitedCountryCount} registrerte land</span>
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

          {travelerSummary.visitedCountries.length === 0 ? (
            <div className="empty-state">
              <p className="list-row-title">Ingen land i det delte datasettet er koblet til {activeTraveler.displayName} ennå.</p>
              <p className="section-copy">
                Profilen kan fortsatt ha lagrede landkoder, men kartsiden viser foreløpig bare land som finnes
                i den felles metadataoversikten.
              </p>
            </div>
          ) : (
            <div className="list-stack">
              {travelerSummary.visitedCountries.map((country) => (
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
          )}

          {travelerSummary.unsupportedCountryCodes.length > 0 && (
            <p className="card-note">
              Utenfor datasettet: {travelerSummary.unsupportedCountryCodes.join(', ')}.
            </p>
          )}
        </article>
      </div>

      <article className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Neste steg</p>
            <h2>Plassholderland viser hvordan senere kartfunksjoner kan fylles inn</h2>
          </div>
        </div>

        <div className="list-stack">
          {placeholderCountries.map((country) => (
            <article key={country} className="list-row">
              <div>
                <p className="list-row-title">{country}</p>
                <p className="list-row-subtitle">Klar for søk, filtrering og avhuking i neste issue</p>
              </div>
              <span className="row-state">Ikke lagret ennå</span>
            </article>
          ))}
        </div>
      </article>
    </section>
  )
}
