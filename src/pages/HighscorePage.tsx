import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { rankTravelers } from '../features/countries/travelStats'
import { useTravelers } from '../features/travelers/TravelerContext'

const podiumPlaces = [1, 2, 3]
const tieBreakRuleCopy = 'Ved likt antall land sorteres profiler alfabetisk på visningsnavn og deretter profil-ID.'

function getProgressWidth(datasetCoveragePercentage: number, visitedCountryCount: number) {
  if (visitedCountryCount === 0) {
    return 0
  }

  return Math.min(100, Math.max(datasetCoveragePercentage, 6))
}

export function HighscorePage() {
  const { travelers, activeTraveler } = useTravelers()
  const ranking = useMemo(() => rankTravelers(travelers), [travelers])
  const activeTravelerId = activeTraveler?.id ?? null

  if (travelers.length === 0) {
    return (
      <section className="page-stack">
        <article className="card empty-state empty-card">
          <p className="eyebrow">Ingen leaderboard ennå</p>
          <h2>Opprett minst én reisende for å bygge Highscore-siden</h2>
          <p className="section-copy">
            Highscore henter rangeringen direkte fra profilene som lagres lokalt i nettleseren. Når den
            første reisende finnes, fylles både podium og toppliste automatisk.
          </p>
          <p className="card-note">{tieBreakRuleCopy}</p>
          <Link to="/" className="cta-link">
            Gå til Reisende
          </Link>
        </article>
      </section>
    )
  }

  const podiumEntries = podiumPlaces.map((place) => ranking[place - 1] ?? null)
  const topTraveler = ranking[0]
  const activeTravelerEntry = ranking.find((traveler) => traveler.id === activeTravelerId) ?? null
  const totalVisitedCountries = ranking.reduce(
    (visitedCountryTotal, traveler) => visitedCountryTotal + traveler.visitedCountryCount,
    0,
  )
  const stats = [
    {
      label: 'Reisende i ranking',
      value: `${ranking.length}`,
      detail: ranking.length === 1 ? '1 profil konkurrerer akkurat nå' : `${ranking.length} profiler er rangert`,
      className: '',
    },
    {
      label: 'Beste score',
      value: `${topTraveler.visitedCountryCount}`,
      detail: `${topTraveler.displayName} leder med ${topTraveler.datasetCoveragePercentage}% av datasettet registrert`,
      className: '',
    },
    {
      label: 'Aktiv profil',
      value: activeTravelerEntry === null ? 'Ingen valgt' : `#${activeTravelerEntry.rank}`,
      detail:
        activeTravelerEntry === null
          ? 'Velg en profil på Reisende-siden for å fremheve den i listen'
          : `${activeTravelerEntry.displayName} har ${activeTravelerEntry.visitedCountryCount} land lagret`,
      className: activeTravelerEntry === null ? 'stat-value-text' : '',
    },
  ]

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

      <article className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Podium</p>
            <h2>Topp tre viser hvem som leder akkurat nå</h2>
          </div>
          <span className="metric-chip">{totalVisitedCountries} registrerte land totalt</span>
        </div>

        <p className="section-copy">{tieBreakRuleCopy}</p>

        <div className="page-grid page-grid-three">
          {podiumEntries.map((entry, index) => {
            const place = index + 1
            const isActive = entry?.id === activeTravelerId

            if (entry === null) {
              return (
                <article key={place} className="podium-card podium-card-empty">
                  <span className="podium-rank">#{place}</span>
                  <p className="podium-name">Ledig plass</p>
                  <p className="card-note">Opprett flere reisende for å fylle hele podiumet.</p>
                </article>
              )
            }

            return (
              <article
                key={entry.id}
                className={`podium-card podium-card-place-${place}${isActive ? ' podium-card-active' : ''}`}
              >
                <span className="podium-rank">#{place}</span>
                <p className="podium-name">{entry.displayName}</p>
                <p className="podium-score">{entry.visitedCountryCount} land</p>
                <p className="card-note">{entry.datasetCoveragePercentage}% av datasettet registrert</p>
                {isActive && <span className="row-state status-pill-active">Aktiv profil</span>}
              </article>
            )
          })}
        </div>
      </article>

      <article className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Rangering</p>
            <h2>Hele leaderboardet hentes fra lagrede profiler</h2>
          </div>
          <span className="pill">
            {ranking.length === 1 ? '1 rangert profil' : `${ranking.length} rangerte profiler`}
          </span>
        </div>

        <div className="list-stack">
          {ranking.map((entry) => (
            <article
              key={entry.id}
              className={`list-row highscore-row${entry.id === activeTravelerId ? ' highscore-row-active' : ''}`}
            >
              <div className="highscore-row-main">
                <div>
                  <p className="list-row-title">
                    #{entry.rank} {entry.displayName}
                  </p>
                  <p className="list-row-subtitle">
                    {entry.datasetCoveragePercentage}% av datasettet · {entry.visitedCountryCount} unike land registrert
                  </p>
                </div>

                <div
                  className="highscore-progress"
                  aria-label={`${entry.displayName} dekker ${entry.datasetCoveragePercentage}% av datasettet`}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={entry.datasetCoveragePercentage}
                  aria-valuetext={`${entry.displayName} dekker ${entry.datasetCoveragePercentage}% av datasettet`}
                >
                  <span
                    className="highscore-progress-fill"
                    style={{ width: `${getProgressWidth(entry.datasetCoveragePercentage, entry.visitedCountryCount)}%` }}
                  />
                </div>
              </div>

              <div className="list-row-meta">
                <span className="pill">{entry.visitedCountryCount} land</span>
                {entry.id === activeTravelerId && <span className="row-state status-pill-active">Aktiv profil</span>}
              </div>
            </article>
          ))}
        </div>
      </article>
    </section>
  )
}
