import { Link } from 'react-router-dom'
import { useTravelers } from '../features/travelers/TravelerContext'

const filters = ['Alle', 'Europa', 'Asia', 'Nord-Amerika', 'Sør-Amerika', 'Afrika', 'Oseania']

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

  const visitedCountryCount = activeTraveler.visitedCountryCodes.length
  const worldCoverage = Math.round((visitedCountryCount / 195) * 100)
  const stats = [
    {
      label: 'Aktiv profil',
      value: activeTraveler.displayName,
      detail: 'Valgt på Reisende-siden og husket i nettleseren',
      className: 'stat-value-text',
    },
    {
      label: 'Besøkte land',
      value: `${visitedCountryCount}`,
      detail:
        visitedCountryCount === 0
          ? 'Ingen land er registrert ennå i denne profilen'
          : 'Antallet er hentet fra lagret profil i nettleseren',
      className: '',
    },
    {
      label: 'Verdensandel',
      value: `${worldCoverage}%`,
      detail: 'Foreløpig beregnet mot 195 land for å vise frem datastrukturen',
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
            <h2>Kontinentvalg, søk og listeplassholdere</h2>
          </div>
        </div>

        <div className="pill-list">
          {filters.map((filter) => (
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
              <h2>{activeTraveler.displayName} har nå en personlig kartflate å bygge videre på</h2>
            </div>
            <span className="metric-chip">{visitedCountryCount} lagrede land</span>
          </div>

          <div className="map-preview" aria-hidden="true">
            <span className="map-shape map-shape-wide"></span>
            <span className="map-shape map-shape-medium"></span>
            <span className="map-shape map-shape-small"></span>
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Landliste</p>
              <h2>Lagringsmodellen er klar for land som hukes av senere</h2>
            </div>
          </div>

          {visitedCountryCount === 0 ? (
            <div className="empty-state">
              <p className="list-row-title">Ingen land er lagret på {activeTraveler.displayName} ennå.</p>
              <p className="section-copy">
                Denne profilen er klar til å motta besøkte land i neste iterasjon. Valget av reisende
                og lagringsformat er allerede på plass.
              </p>
            </div>
          ) : (
            <div className="list-stack">
              {activeTraveler.visitedCountryCodes.map((countryCode) => (
                <article key={countryCode} className="list-row">
                  <div>
                    <p className="list-row-title">{countryCode.toUpperCase()}</p>
                    <p className="list-row-subtitle">Lagret i profilens visitedCountryCodes-felt</p>
                  </div>
                  <span className="pill">Besøkt</span>
                </article>
              ))}
            </div>
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
