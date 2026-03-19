import { Link } from 'react-router-dom'
import { supportedCountryCount } from '../features/countries/countryData'
import { buildVacationSuggestions, getTravelerSummary } from '../features/countries/travelStats'
import { useTravelers } from '../features/travelers/TravelerContext'

export function SuggestionsPage() {
  const { activeTraveler } = useTravelers()

  if (activeTraveler === null) {
    return (
      <section className="page-stack">
        <article className="card empty-state">
          <p className="eyebrow">Aktiv profil mangler</p>
          <h2>Velg en reisende før du ber om neste ferieforslag</h2>
          <p className="section-copy">
            Ferieforslag bygger på landene som er lagret på den aktive profilen. Gå til Reisende-siden og
            velg eller opprett en profil først.
          </p>
          <Link to="/" className="cta-link">
            Gå til Reisende
          </Link>
        </article>
      </section>
    )
  }

  const travelerSummary = getTravelerSummary(activeTraveler)
  const suggestions = buildVacationSuggestions(activeTraveler)
  const missingCountryCount = Math.max(supportedCountryCount - travelerSummary.visitedCountries.length, 0)
  const stats = [
    {
      label: 'Aktiv profil',
      value: activeTraveler.displayName,
      detail: 'Forslagene bygges direkte fra denne profilens lagrede besøkskoder',
      className: 'stat-value-text',
    },
    {
      label: 'Dekning i datasettet',
      value: `${travelerSummary.datasetCoveragePercentage}%`,
      detail:
        travelerSummary.visitedCountries.length === 0
          ? 'Ingen støttede land er registrert ennå'
          : `${travelerSummary.visitedCountries.length} av ${supportedCountryCount} støttede land er dekket`,
      className: '',
    },
    {
      label: 'Forslag klare',
      value: `${suggestions.length}`,
      detail:
        missingCountryCount === 0
          ? 'Alle støttede land er allerede dekket i denne profilen'
          : `${missingCountryCount} støttede land gjenstår i datasettet`,
      className: '',
    },
  ]

  if (missingCountryCount === 0 || suggestions.length === 0) {
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

        <article className="card empty-state empty-card">
          <p className="eyebrow">Ingen åpne forslag</p>
          <h2>{activeTraveler.displayName} dekker allerede hele det støttede datasettet</h2>
          <p className="section-copy">
            Når alle støttede land allerede er registrert på profilen, finnes det ingen manglende subregioner å
            anbefale med den nåværende, regelbaserte motoren.
          </p>
          <p className="card-note">
            Neste utvidelse kan se på forskjeller mellom reisende eller alternative typer prioritering.
          </p>
        </article>
      </section>
    )
  }

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

      <div className="page-grid page-grid-three">
        {suggestions.map((suggestion) => (
          <article key={suggestion.title} className="card suggestion-card">
            <div className="card-header">
              <div>
                <p className="card-label">{suggestion.continentLabel}</p>
                <h2>{suggestion.title}</h2>
              </div>
              <span className="pill">{suggestion.countries.length} land</span>
            </div>

            <div className="pill-list" aria-label={`Land i forslaget ${suggestion.title}`}>
              {suggestion.countries.map((country) => (
                <span key={country.code} className="pill">
                  {country.name}
                </span>
              ))}
            </div>

            <p className="section-copy">{suggestion.reason}</p>
            <p className="card-note">
              Forslaget dekker {suggestion.countries.length} manglende land i{' '}
              {suggestion.subregion.toLocaleLowerCase('nb-NO')}.
            </p>
          </article>
        ))}
      </div>

      <article className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Regelbasert motor</p>
            <h2>Forslagene forklares med samme metadata som filtrene og kartet bruker</h2>
          </div>
        </div>

        <div className="list-stack">
          <article className="list-row">
            <p className="list-row-title">
              Forslagene grupperer bare land som {activeTraveler.displayName} ikke allerede har registrert i den støttede datamodellen.
            </p>
          </article>
          <article className="list-row">
            <p className="list-row-title">
              Hver anbefaling prioriterer subregioner i kontinenter der profilen fortsatt har lav dekning.
            </p>
          </article>
          <article className="list-row">
            <p className="list-row-title">
              Samme helper kan senere utvides med flere regler uten at Ferieforslag-siden må få egen logikk.
            </p>
          </article>
        </div>

        {travelerSummary.unsupportedCountryCodes.length > 0 && (
          <p className="card-note">
            Koder utenfor datasettet på profilen: {travelerSummary.unsupportedCountryCodes.join(', ')}.
          </p>
        )}
      </article>
    </section>
  )
}
