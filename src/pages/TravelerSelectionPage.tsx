const travelers = [
  { name: 'Hansa', countries: 47, focus: 'Europa og Norden', status: 'Aktiv profil' },
  { name: 'Marius', countries: 28, focus: 'Storbyhelger og langhelger', status: 'Sammenlignbar profil' },
  { name: 'Lea', countries: 19, focus: 'Asia og kystreiser', status: 'Klar for neste ferie' },
]

const launchSteps = [
  'Velg en eksisterende profil eller opprett en ny direkte i nettleseren.',
  'Fortsett inn til Mitt kart uten backend eller innloggingstjeneste.',
  'La senere iterasjoner fylle på med landdata, sammenligning og forslag.',
]

export function TravelerSelectionPage() {
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
            Forsiden etablerer plass til hurtigvalg, aktive profiler og tydelige neste steg. Denne
            iterasjonen fokuserer på struktur, ikke ferdig funksjonalitet.
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
              <h2>Eksempel på reisende som senere kan lagres lokalt</h2>
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
