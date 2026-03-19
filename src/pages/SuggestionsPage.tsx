import { featuredTraveler } from '../features/countries/demoTravelers'
import { buildVacationSuggestions } from '../features/countries/travelStats'

export function SuggestionsPage() {
  const suggestions = buildVacationSuggestions(featuredTraveler)

  return (
    <section className="page-stack">
      <div className="page-grid page-grid-three">
        {suggestions.map((suggestion) => (
          <article key={suggestion.title} className="card suggestion-card">
            <p className="card-label">{suggestion.title}</p>
            <div className="pill-list">
              {suggestion.countries.map((country) => (
                <span key={country.code} className="pill">
                  {country.name}
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
              <h2>Forslagene forklares nå med samme metadata som filtrene bruker</h2>
            </div>
          </div>

          <div className="list-stack">
            <article className="list-row">
              <p className="list-row-title">
                Forslagene bruker subregioner og kontinentdekning fra det delte metadataregisteret.
              </p>
            </article>
            <article className="list-row">
              <p className="list-row-title">
                Begrunnelsene leser besøkt-andeler fra samme helper som Highscore og Mitt kart.
              </p>
            </article>
            <article className="list-row">
              <p className="list-row-title">
                Samme kortmal kan gjenbrukes for alternative ruter når flere regler legges til senere.
              </p>
            </article>
          </div>
        </article>
    </section>
  )
}
