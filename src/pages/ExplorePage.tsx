import { WorldMapIllustration } from '../components/WorldMapIllustration'
import { demoTravelers, featuredTraveler } from '../features/countries/demoTravelers'
import { compareTravelers, getTravelerSummary } from '../features/countries/travelStats'

export function ExplorePage() {
  const referenceSummary = getTravelerSummary(featuredTraveler)
  const comparisonCards = demoTravelers.slice(0, 3).map((traveler) => {
    const summary = getTravelerSummary(traveler)

    return {
      traveler: traveler.displayName,
      countries: summary.visitedCountryCount,
      coverage: `${summary.worldPercentage}% av verden`,
      note:
        summary.leadingContinent === null
          ? 'Klar for første registrerte land'
          : `Sterkest dekning i ${summary.leadingContinent.label}`,
    }
  })

  const insightRows = demoTravelers.slice(1, 4).map((traveler) => compareTravelers(featuredTraveler, traveler).narrative)

  return (
    <section className="page-stack">
      <div className="page-grid page-grid-three">
        {comparisonCards.map((card) => (
            <article key={card.traveler} className="card">
              <p className="card-label">{card.traveler}</p>
              <p className="stat-value">{card.countries}</p>
              <p className="card-note">{card.coverage}</p>
              <p className="section-copy">{card.note}</p>
            </article>
          ))}
      </div>

      <div className="page-grid page-grid-two">
        <article className="card map-card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Kartanalyse</p>
              <h2>Sammenligningskartet gjenbruker samme verdengeometri som Mitt kart</h2>
            </div>
          </div>

          <div className="map-preview map-preview-contrast">
            <WorldMapIllustration
              activeContinents={referenceSummary.continentBreakdown
                .filter((continent) => continent.visitedCount > 0)
                .map((continent) => continent.continent)}
            />
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Neste steg</p>
              <h2>Forskjellene leses nå fra delte sammenligningshjelpere</h2>
            </div>
          </div>

          <div className="list-stack">
            {insightRows.map((row) => (
              <article key={row} className="list-row">
                <p className="list-row-title">{row}</p>
              </article>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
