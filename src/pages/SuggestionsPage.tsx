const suggestions = [
  {
    title: 'Baltisk langhelg',
    countries: ['Estland', 'Latvia', 'Litauen'],
    reason: 'Dekker tre naboland på en effektiv runde og passer for profiler som mangler nordlige byreiser.',
  },
  {
    title: 'Balkan-loop',
    countries: ['Kroatia', 'Bosnia-Hercegovina', 'Montenegro'],
    reason: 'Bygger på eksisterende Europadekning og gir høy uttelling på korte avstander.',
  },
  {
    title: 'Iberisk kombinasjon',
    countries: ['Spania', 'Portugal', 'Andorra'],
    reason: 'Samler flere land i samme region og gir god variasjon mellom storby og natur.',
  },
]

export function SuggestionsPage() {
  return (
    <section className="page-stack">
      <div className="page-grid page-grid-three">
        {suggestions.map((suggestion) => (
          <article key={suggestion.title} className="card suggestion-card">
            <p className="card-label">{suggestion.title}</p>
            <div className="pill-list">
              {suggestion.countries.map((country) => (
                <span key={country} className="pill">
                  {country}
                </span>
              ))}
            </div>
            <p className="section-copy">{suggestion.reason}</p>
          </article>
        ))}
      </div>

      <article className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Regelbasert motor</p>
            <h2>Designet for forklarbare anbefalinger</h2>
          </div>
        </div>

        <div className="list-stack">
          <article className="list-row">
            <p className="list-row-title">Forslagene kan senere forklares med region, avstand og manglende land.</p>
          </article>
          <article className="list-row">
            <p className="list-row-title">Kortene har plass til dekning, sesong og begrunnelse uten redesign.</p>
          </article>
          <article className="list-row">
            <p className="list-row-title">Samme kortmal kan også brukes for alternative reiseruter og favoritter.</p>
          </article>
        </div>
      </article>
    </section>
  )
}
