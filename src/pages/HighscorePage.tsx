const podium = [
  { place: '1', traveler: 'Hansa', countries: 47 },
  { place: '2', traveler: 'Marius', countries: 28 },
  { place: '3', traveler: 'Lea', countries: 19 },
]

const ranking = [
  { traveler: 'Hansa', countries: 47, progress: '24% av verden' },
  { traveler: 'Marius', countries: 28, progress: '14% av verden' },
  { traveler: 'Lea', countries: 19, progress: '10% av verden' },
  { traveler: 'Nora', countries: 12, progress: '6% av verden' },
]

export function HighscorePage() {
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
            <article key={entry.place} className="podium-card">
              <span className="podium-rank">#{entry.place}</span>
              <p className="podium-name">{entry.traveler}</p>
              <p className="podium-score">{entry.countries} land</p>
            </article>
          ))}
        </div>
      </article>

      <article className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Rangering</p>
            <h2>Listevisningen er klar for hele leaderboardet</h2>
          </div>
        </div>

        <div className="list-stack">
          {ranking.map((entry, index) => (
            <article key={entry.traveler} className="list-row">
              <div>
                <p className="list-row-title">
                  #{index + 1} {entry.traveler}
                </p>
                <p className="list-row-subtitle">{entry.progress}</p>
              </div>
              <span className="pill">{entry.countries} land</span>
            </article>
          ))}
        </div>
      </article>
    </section>
  )
}
