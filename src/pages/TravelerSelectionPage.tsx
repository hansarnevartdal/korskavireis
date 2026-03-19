import { demoTravelers } from '../features/countries/demoTravelers'
import { getTravelerSummary } from '../features/countries/travelStats'

const launchSteps = [
  'Velg en eksisterende profil eller opprett en ny direkte i nettleseren.',
  'Alle eksempelprofiler henter nå landdata og statistikk fra ett delt datalag.',
  'Senere iterasjoner kan bruke samme visitedCountryCodes-format uten å duplisere logikk.',
]

const travelerStatuses = ['Aktiv profil', 'Sammenlignbar profil', 'Klar for neste ferie']

export function TravelerSelectionPage() {
  const travelers = demoTravelers.slice(0, 3).map((traveler, index) => {
    const summary = getTravelerSummary(traveler)

    return {
      name: traveler.displayName,
      countries: summary.visitedCountryCount,
      focus:
        summary.leadingContinent === null
          ? 'Klar for å fylle på med landdata'
          : `Sterkest dekning i ${summary.leadingContinent.label}`,
      status: travelerStatuses[index] ?? 'Reiseklar profil',
    }
  })

  return (
    <section className="page-stack">
      <div className="page-grid page-grid-two">
        <article className="card card-feature">
          <div className="card-header">
            <div>
              <p className="eyebrow">Start her</p>
              <h2>Reisende velges fra et enkelt, lokalt oppsett</h2>
            </div>
            <span className="metric-chip">Kun i nettleser</span>
          </div>

          <p className="section-copy">
            Forsiden viser nå eksempelprofiler som trekker besøkte land og dekning fra den samme
            delte datamodellen som brukes på resten av sidene.
          </p>

          <ol className="step-list">
            {launchSteps.map((step) => (
              <li key={step}>
                <div className="list-row">
                  <span className="list-row-title">{step}</span>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Profiler</p>
              <h2>Eksempel på reisende basert på den delte landdatamodellen</h2>
            </div>
            <span className="pill">3 profiler</span>
          </div>

          <div className="list-stack">
            {travelers.map((traveler) => (
              <article key={traveler.name} className="list-row">
                <div>
                  <p className="list-row-title">{traveler.name}</p>
                  <p className="list-row-subtitle">{traveler.focus}</p>
                </div>
                <div className="list-row-meta">
                  <span className="pill">{traveler.countries} land</span>
                  <span className="row-state">{traveler.status}</span>
                </div>
              </article>
            ))}
          </div>
        </article>
      </div>

      <article className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Informasjonsarkitektur</p>
            <h2>Skallet er klart for alle hovedflatene i appen</h2>
          </div>
        </div>

        <div className="pill-list">
          <span className="pill">Reisende</span>
          <span className="pill">Mitt kart</span>
          <span className="pill">Utforsk</span>
          <span className="pill">Highscore</span>
          <span className="pill">Ferieforslag</span>
        </div>
      </article>
    </section>
  )
}
