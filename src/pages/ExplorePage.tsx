const comparisonCards = [
  { traveler: 'Hansa', countries: 47, coverage: '24%', note: 'Sterk dekning i Europa' },
  { traveler: 'Marius', countries: 28, coverage: '14%', note: 'Flest storbyreiser' },
  { traveler: 'Lea', countries: 19, coverage: '10%', note: 'Mest variasjon i Asia' },
]

const insightRows = [
  'Felles modul for sammenligningskort og delte nøkkeltall.',
  'Egen seksjon for senere differanser og overlapp mellom profiler.',
  'Kartflaten kan gjenbruke samme datasett og fargepalett som Mitt kart.',
]

export function ExplorePage() {
  return (
    <section className="page-stack">
      <div className="page-grid page-grid-three">
        {comparisonCards.map((card) => (
          <article key={card.traveler} className="card">
            <p className="card-label">{card.traveler}</p>
            <p className="stat-value">{card.countries}</p>
            <p className="card-note">{card.coverage} av verden</p>
            <p className="section-copy">{card.note}</p>
          </article>
        ))}
      </div>

      <div className="page-grid page-grid-two">
        <article className="card map-card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Kartanalyse</p>
              <h2>Sammenligningskartet har et dedikert hjem i layouten</h2>
            </div>
          </div>

          <div className="map-preview map-preview-contrast" aria-hidden="true">
            <span className="map-shape map-shape-wide"></span>
            <span className="map-shape map-shape-medium"></span>
            <span className="map-shape map-shape-small"></span>
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Neste steg</p>
              <h2>Skallet er klart for innsikt og forskjeller</h2>
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
