import { demoTravelers } from '../features/countries/demoTravelers'
import { rankTravelers } from '../features/countries/travelStats'

export function HighscorePage() {
  const ranking = rankTravelers(demoTravelers)
  const podium = ranking.slice(0, 3)

  return (
    <section className="page-stack">
      <article className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Podium</p>
            <h2>Topp tre kan fremheves uten ekstra layoutarbeid</h2>
          </div>
        </div>

        <div className="page-grid page-grid-three">
          {podium.map((entry) => (
            <article key={entry.rank} className="podium-card">
              <span className="podium-rank">#{entry.rank}</span>
              <p className="podium-name">{entry.displayName}</p>
              <p className="podium-score">{entry.visitedCountryCount} land</p>
            </article>
          ))}
        </div>
      </article>

      <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Rangering</p>
              <h2>Listevisningen bruker nå samme rangeringsgrunnlag som podiumet</h2>
            </div>
          </div>

          <div className="list-stack">
            {ranking.map((entry) => (
              <article key={entry.displayName} className="list-row">
                <div>
                  <p className="list-row-title">
                    #{entry.rank} {entry.displayName}
                  </p>
                  <p className="list-row-subtitle">
                    {entry.worldPercentage}% av verden · {entry.visitedContinentCount} kontinenter
                  </p>
                </div>
                <span className="pill">{entry.visitedCountryCount} land</span>
              </article>
            ))}
          </div>
        </article>
    </section>
  )
}
