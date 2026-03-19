import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { appRoutes, getRouteMeta } from '../appRoutes'

export function AppShell() {
  const location = useLocation()
  const routeMeta = getRouteMeta(location.pathname)

  return (
    <div className="app-shell">
      <div className="app-frame">
        <header className="app-header">
          <div className="top-bar">
            <div className="brand-block">
              <span className="brand-badge">Reisekart</span>
              <div>
                <p className="brand-title">Countries I Have Visited</p>
                <p className="brand-subtitle">SPA foundation for the first browser-only release</p>
              </div>
            </div>

            <nav aria-label="Hovednavigasjon" className="top-nav">
              {appRoutes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  end={route.path === '/'}
                  className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
                >
                  {route.navLabel}
                </NavLink>
              ))}
            </nav>
          </div>

          <section className="hero-card">
            <div>
              <p className="eyebrow">{routeMeta.heroEyebrow}</p>
              <h1>{routeMeta.heroTitle}</h1>
              <p className="hero-copy">{routeMeta.heroDescription}</p>
            </div>

            <aside className="hero-highlights" aria-label="Denne iterasjonen leverer">
              <p className="card-label">Denne iterasjonen leverer</p>
              <ul className="highlight-list">
                {routeMeta.heroHighlights.map((highlight) => (
                  <li key={highlight} className="highlight-card">
                    {highlight}
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        </header>

        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
