const stats = [
  { label: 'Besokte land', value: '47', detail: 'Mal for fremtidig beregning per profil' },
  { label: 'Verdensandel', value: '24%', detail: 'Kort som senere kobles mot landdatasett' },
  { label: 'Kontinenter', value: '5', detail: 'Filtrering og progresjon samles i samme oppsett' },
]

const filters = ['Alle', 'Europa', 'Asia', 'Nord-Amerika', 'Sor-Amerika', 'Afrika', 'Oseania']

const countries = [
  'Norge',
  'Sverige',
  'Danmark',
  'Tyskland',
  'Italia',
  'Japan',
]

export function MyMapPage() {
  return (
    <section className="page-stack">
      <div className="stat-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="card stat-card">
            <p className="card-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
            <p className="card-note">{stat.detail}</p>
          </article>
        ))}
      </div>

      <article className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Filtre</p>
            <h2>Kontinentvalg, sok og listeplassholdere</h2>
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
              <h2>Verdenskartet kan integreres i denne hovedflaten</h2>
            </div>
            <span className="metric-chip">Interaktiv senere</span>
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
              <h2>Land kan senere hukes av fra kart eller liste</h2>
            </div>
          </div>

          <div className="list-stack">
            {countries.map((country, index) => (
              <article key={country} className="list-row">
                <div>
                  <p className="list-row-title">{country}</p>
                  <p className="list-row-subtitle">Klargjort for status, sok og filtrering</p>
                </div>
                <span className="pill">{index < 4 ? 'Besokt' : 'Planlagt'}</span>
              </article>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
