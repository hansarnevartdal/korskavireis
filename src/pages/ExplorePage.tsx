import { useMemo, useState } from 'react'
import { WorldMapIllustration } from '../components/WorldMapIllustration'
import { demoTravelers, featuredTraveler } from '../features/countries/demoTravelers'
import { compareTravelers, getTravelerSummary } from '../features/countries/travelStats'

function formatCountryDelta(countryDelta: number) {
  if (countryDelta === 0) {
    return 'Samme antall land'
  }

  return countryDelta > 0 ? `${countryDelta} flere land` : `${Math.abs(countryDelta)} færre land`
}

function formatContinentProgress(visitedCount: number, totalCount: number) {
  if (visitedCount === 0) {
    return 'Ingen registrerte land ennå'
  }

  return `${visitedCount} av ${totalCount} land registrert`
}

export function ExplorePage() {
  const [selectedTravelerId, setSelectedTravelerId] = useState(featuredTraveler.id)
  const travelerEntries = useMemo(
    () =>
      demoTravelers.map((traveler) => ({
        traveler,
        summary: getTravelerSummary(traveler),
      })),
    [],
  )
  const selectedTravelerEntry =
    travelerEntries.find((entry) => entry.traveler.id === selectedTravelerId) ?? travelerEntries[0]
  const comparisonInsights = useMemo(
    () =>
      travelerEntries
        .filter((entry) => entry.traveler.id !== selectedTravelerEntry.traveler.id)
        .map((entry) => compareTravelers(selectedTravelerEntry.traveler, entry.traveler))
        .sort(
          (left, right) =>
            right.sharedVisitedCount - left.sharedVisitedCount ||
            right.countryDelta - left.countryDelta ||
            left.comparedTraveler.localeCompare(right.comparedTraveler, 'nb-NO'),
        ),
    [selectedTravelerEntry, travelerEntries],
  )
  const selectedSummary = selectedTravelerEntry.summary
  const activeContinents = selectedSummary.continentBreakdown
    .filter((continent) => continent.visitedCount > 0)
    .map((continent) => continent.continent)
  const stats = [
    {
      label: 'Besøkte land',
      value: `${selectedSummary.visitedCountryCount}`,
      detail:
        selectedSummary.unsupportedCountryCodes.length === 0
          ? 'Teller alle unike land som finnes i det delte datasettet'
          : `Inkluderer ${selectedSummary.unsupportedCountryCodes.length} koder utenfor datasettet`,
      className: '',
    },
    {
      label: 'Verdensdekning',
      value: `${selectedSummary.datasetCoveragePercentage}%`,
      detail: 'Viser hvor stor del av det delte landdatasettet reisende dekker akkurat nå',
      className: '',
    },
    {
      label: 'Verdensdeler',
      value: `${selectedSummary.visitedContinentCount}`,
      detail:
        selectedSummary.leadingContinent === null
          ? 'Ingen verdensdeler er markert ennå'
          : `${selectedSummary.leadingContinent.label} er sterkest med ${selectedSummary.leadingContinent.visitedCount} land`,
      className: '',
    },
  ]

  return (
    <section className="page-stack">
      <article className="card card-feature">
        <div className="card-header">
          <div>
            <p className="eyebrow">Velg reisende</p>
            <h2>Bytt mellom profiler og sammenlign fotavtrykket deres</h2>
          </div>
          <span className="metric-chip">{travelerEntries.length} reisende i sammenligningen</span>
        </div>

        <p className="section-copy">
          Utforsk holder én reisende i fokus om gangen og bruker samme statistikkhjelpere til å vise
          totalscore, kartdekning og overlapp mot de andre profilene.
        </p>

        <div className="comparison-tablist" role="tablist" aria-label="Velg reisende for sammenligning">
          {travelerEntries.map((entry) => {
            const isSelected = entry.traveler.id === selectedTravelerEntry.traveler.id

            return (
              <button
                key={entry.traveler.id}
                type="button"
                role="tab"
                id={`explore-tab-${entry.traveler.id}`}
                aria-selected={isSelected}
                aria-controls={`explore-panel-${entry.traveler.id}`}
                tabIndex={isSelected ? 0 : -1}
                className={`comparison-tab${isSelected ? ' comparison-tab-active' : ''}`}
                onClick={() => setSelectedTravelerId(entry.traveler.id)}
              >
                <span className="comparison-tab-title">{entry.traveler.displayName}</span>
                <span className="comparison-tab-subtitle">
                  {entry.summary.visitedCountryCount} land · {entry.summary.datasetCoveragePercentage}% av datasettet
                </span>
              </button>
            )
          })}
        </div>
      </article>

      <section
        className="page-stack"
        role="tabpanel"
        id={`explore-panel-${selectedTravelerEntry.traveler.id}`}
        aria-labelledby={`explore-tab-${selectedTravelerEntry.traveler.id}`}
      >
        <div className="stat-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="card stat-card">
              <p className="card-label">{stat.label}</p>
              <p className={`stat-value ${stat.className}`.trim()}>{stat.value}</p>
              <p className="card-note">{stat.detail}</p>
            </article>
          ))}
        </div>

        <div className="page-grid page-grid-two">
          <article className="card map-card">
            <div className="card-header">
              <div>
                <p className="eyebrow">Kartfotavtrykk</p>
                <h2>{selectedTravelerEntry.traveler.displayName} er markert på det delte verdenskartet</h2>
              </div>
              <span className="metric-chip">{selectedSummary.visitedContinentCount} verdensdeler aktive</span>
            </div>

            <p className="section-copy">
              Kartet fremhever hvilke verdensdeler {selectedTravelerEntry.traveler.displayName} allerede dekker, slik
              at det blir enklere å lese forskjellene mot de andre profilene.
            </p>

            <div className="map-preview map-preview-contrast">
              <WorldMapIllustration activeContinents={activeContinents} />
            </div>
          </article>

          <article className="card">
            <div className="card-header">
              <div>
                <p className="eyebrow">Overlapp og forskjeller</p>
                <h2>Sammenligningen er strukturert for å kunne vokse videre</h2>
              </div>
              <span className="pill">
                {comparisonInsights.length === 1
                  ? '1 sammenligning'
                  : `${comparisonInsights.length} sammenligninger`}
              </span>
            </div>

            <div className="list-stack">
              {comparisonInsights.map((insight) => (
                <article key={insight.comparedTravelerId} className="list-row comparison-row">
                  <div className="comparison-row-main">
                    <div>
                      <p className="list-row-title">
                        {selectedTravelerEntry.traveler.displayName} vs. {insight.comparedTraveler}
                      </p>
                      <p className="list-row-subtitle">{insight.narrative}</p>
                    </div>

                    <div className="pill-list comparison-pill-list">
                      <span className="pill">{insight.sharedVisitedCount} felles land</span>
                      <span className="pill">{insight.referenceExclusiveCount} bare hos valgt reisende</span>
                      <span className="pill">{insight.comparedExclusiveCount} bare hos {insight.comparedTraveler}</span>
                    </div>
                  </div>

                  <div className="list-row-meta comparison-row-meta">
                    <span className="pill">{formatCountryDelta(insight.countryDelta)}</span>
                    <span className="row-state">{insight.sharedContinentCount} felles verdensdeler</span>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>

        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Kontinentdekning</p>
              <h2>Verdensdelene bruker samme datagrunnlag som resten av appen</h2>
            </div>
            <span className="pill">
              {selectedSummary.leadingContinent === null
                ? 'Ingen ledende verdensdel'
                : `${selectedSummary.leadingContinent.label} leder`}
            </span>
          </div>

          <div className="list-stack">
            {selectedSummary.continentBreakdown.map((continent) => (
              <article key={continent.continent} className="list-row comparison-row">
                <div className="comparison-row-main">
                  <div>
                    <p className="list-row-title">{continent.label}</p>
                    <p className="list-row-subtitle">
                      {formatContinentProgress(continent.visitedCount, continent.totalCount)}
                    </p>
                  </div>
                </div>

                <div className="list-row-meta comparison-row-meta">
                  <span className="pill">
                    {continent.totalCount === 0
                      ? '0%'
                      : `${Math.round((continent.visitedCount / continent.totalCount) * 100)}%`}
                  </span>
                  <span className={`row-state${continent.visitedCount > 0 ? ' status-pill-active' : ''}`}>
                    {continent.visitedCount}/{continent.totalCount}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>
    </section>
  )
}
