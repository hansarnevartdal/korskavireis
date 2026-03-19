import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="page-stack">
      <article className="card empty-card">
        <p className="eyebrow">Fant ikke siden</p>
        <h2>Denne ruten er ikke satt opp enda</h2>
        <p className="section-copy">
          Navigasjonen i bootstrappen dekker hovedflatene. Gå tilbake til startsiden for a se
          appskallet.
        </p>
        <Link to="/" className="cta-link">
          Tilbake til Reisende
        </Link>
      </article>
    </section>
  )
}
