import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTravelers } from '../features/travelers/TravelerContext'
import type { TravelerProfile } from '../features/travelers/travelerStore'

const launchSteps = [
  'Velg en eksisterende profil eller opprett en ny direkte i nettleseren.',
  'Den aktive reisende lagres lokalt og huskes neste gang du åpner appen.',
  'Fortsett til Mitt kart med samme profil uten backend eller innloggingstjeneste.',
]

const updatedAtFormatter = new Intl.DateTimeFormat('nb-NO', {
  dateStyle: 'medium',
})

function formatUpdatedAt(updatedAt: string) {
  const parsedTimestamp = Date.parse(updatedAt)

  if (Number.isNaN(parsedTimestamp)) {
    return 'ukjent dato'
  }

  return updatedAtFormatter.format(new Date(parsedTimestamp))
}

function validateTravelerName(displayName: string, travelers: TravelerProfile[]) {
  const trimmedName = displayName.trim()

  if (trimmedName.length === 0) {
    return 'Skriv inn et visningsnavn før du lagrer reisende.'
  }

  if (trimmedName.length < 2) {
    return 'Visningsnavnet må være minst 2 tegn langt.'
  }

  if (trimmedName.length > 32) {
    return 'Visningsnavnet kan ikke være lengre enn 32 tegn.'
  }

  const duplicateTraveler = travelers.some(
    (traveler) => traveler.displayName.toLocaleLowerCase('nb-NO') === trimmedName.toLocaleLowerCase('nb-NO'),
  )

  if (duplicateTraveler) {
    return 'Det finnes allerede en reisende med dette navnet. Velg et annet navn.'
  }

  return null
}

export function TravelerSelectionPage() {
  const navigate = useNavigate()
  const { travelers, activeTraveler, storageNotice, createTraveler, selectTraveler, clearStorageNotice } =
    useTravelers()
  const [displayName, setDisplayName] = useState('')
  const [formMessage, setFormMessage] = useState<string | null>(null)
  const [formMessageTone, setFormMessageTone] = useState<'error' | 'success'>('success')

  function handleTravelerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationMessage = validateTravelerName(displayName, travelers)

    if (validationMessage !== null) {
      setFormMessage(validationMessage)
      setFormMessageTone('error')
      return
    }

    const nextTraveler = createTraveler(displayName)

    setDisplayName('')
    setFormMessage(`Lagret ${nextTraveler.displayName} lokalt og satte profilen som aktiv reisende.`)
    setFormMessageTone('success')
  }

  function handleTravelerSelect(travelerId: string) {
    selectTraveler(travelerId)

    const traveler = travelers.find((entry) => entry.id === travelerId)

    if (traveler === undefined) {
      setFormMessage('Kunne ikke velge den ønskede reisende. Prøv igjen fra listen.')
      setFormMessageTone('error')
      return
    }

    setFormMessage(`${traveler.displayName} er nå aktiv reisende i denne nettleseren.`)
    setFormMessageTone('success')
  }

  return (
    <section className="page-stack">
      {storageNotice !== null && (
        <article className="card notice-card notice-card-warning" role="status">
          <div className="notice-copy">
            <p className="eyebrow">Lagringsstatus</p>
            <h2>Det oppstod en utfordring med lokal lagring</h2>
            <p className="section-copy">{storageNotice}</p>
          </div>
          <button type="button" className="button button-ghost" onClick={clearStorageNotice}>
            Lukk melding
          </button>
        </article>
      )}

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
            Forsiden lar deg opprette og velge reisende uten backend. Den aktive profilen lagres i
            nettleseren og blir med videre når du åpner kartsiden.
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

          <div className="form-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={() => navigate('/mitt-kart')}
              disabled={activeTraveler === null}
            >
              {activeTraveler === null
                ? 'Velg en reisende for å fortsette'
                : `Fortsett som ${activeTraveler.displayName}`}
            </button>
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Profiler</p>
              <h2>Velg en eksisterende reisende eller opprett den første profilen</h2>
            </div>
            <span className="pill">{travelers.length === 1 ? '1 profil' : `${travelers.length} profiler`}</span>
          </div>

          {travelers.length === 0 ? (
            <div className="empty-state">
              <p className="list-row-title">Ingen reisende er lagret ennå.</p>
              <p className="section-copy">
                Opprett den første profilen under for å komme i gang. Dataene lagres bare i denne
                nettleseren inntil en senere versjon får delt lagring.
              </p>
            </div>
          ) : (
            <div className="list-stack">
              {travelers.map((traveler) => {
                const isActive = activeTraveler?.id === traveler.id

                return (
                  <button
                    key={traveler.id}
                    type="button"
                    className={`list-row traveler-option${isActive ? ' traveler-option-active' : ''}`}
                    aria-pressed={isActive}
                    onClick={() => handleTravelerSelect(traveler.id)}
                  >
                    <div>
                      <p className="list-row-title">{traveler.displayName}</p>
                      <p className="list-row-subtitle">
                        Oppdatert {formatUpdatedAt(traveler.updatedAt)} ·{' '}
                        {traveler.visitedCountryCodes.length === 0
                          ? 'Ingen lagrede land ennå'
                          : `${traveler.visitedCountryCodes.length} lagrede land`}
                      </p>
                    </div>
                    <div className="list-row-meta">
                      <span className="pill">{traveler.visitedCountryCodes.length} land</span>
                      <span className={`row-state${isActive ? ' status-pill-active' : ''}`}>
                        {isActive ? 'Aktiv profil' : 'Velg profil'}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </article>
      </div>

      <div className="page-grid page-grid-two">
        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Ny reisende</p>
              <h2>Opprett en profil med navn som lagres lokalt</h2>
            </div>
          </div>

          <form className="traveler-form" noValidate onSubmit={handleTravelerSubmit}>
            <div className="field-group">
              <label htmlFor="traveler-display-name" className="field-label">
                Visningsnavn
              </label>
              <input
                id="traveler-display-name"
                className="text-input"
                name="displayName"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="For eksempel Hansa eller Lea"
                autoComplete="off"
                maxLength={32}
              />
            </div>

            <p className="card-note">
              Profilen opprettes med et felt for besøkte land, slik at senere sider kan bygge
              videre på samme datastruktur.
            </p>

            {formMessage !== null && (
              <p
                className={`form-message ${
                  formMessageTone === 'error' ? 'form-message-error' : 'form-message-success'
                }`}
                role={formMessageTone === 'error' ? 'alert' : 'status'}
              >
                {formMessage}
              </p>
            )}

            <div className="form-actions">
              <button type="submit" className="button button-primary">
                Lagre reisende
              </button>
              {activeTraveler !== null && (
                <button type="button" className="button button-secondary" onClick={() => navigate('/mitt-kart')}>
                  Åpne Mitt kart
                </button>
              )}
            </div>
          </form>
        </article>

        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Neste steg</p>
              <h2>Profilvalget henger sammen med resten av appen</h2>
            </div>
          </div>

          <div className="pill-list">
            <span className="pill">Reisende</span>
            <span className="pill">Aktiv profil</span>
            <span className="pill">Mitt kart</span>
            <span className="pill">Lokal lagring</span>
          </div>

          <div className="list-stack">
            <article className="list-row">
              <p className="list-row-title">Topplinjen viser alltid hvilken reisende som er aktiv.</p>
            </article>
            <article className="list-row">
              <p className="list-row-title">Mitt kart leser samme profil og kan utvides med landstyring senere.</p>
            </article>
            <article className="list-row">
              <p className="list-row-title">Highscore og Utforsk kan gjenbruke samme profilformat i neste iterasjoner.</p>
            </article>
          </div>
        </article>
      </div>
    </section>
  )
}
