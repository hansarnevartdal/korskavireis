export type TravelerProfile = {
  id: string
  displayName: string
  visitedCountryCodes: string[]
  createdAt: string
  updatedAt: string
}

export type PersistedTravelerState = {
  travelers: TravelerProfile[]
  activeTravelerId: string | null
}

export type TravelerStateLoadResult = {
  state: PersistedTravelerState
  errorMessage: string | null
}

const STORAGE_KEY = 'reisekart.traveler-state.v1'

const emptyTravelerState: PersistedTravelerState = {
  travelers: [],
  activeTravelerId: null,
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string')
}

function isValidDateString(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function isTravelerProfile(value: unknown): value is TravelerProfile {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.displayName === 'string' &&
    isStringArray(candidate.visitedCountryCodes) &&
    isValidDateString(candidate.createdAt) &&
    isValidDateString(candidate.updatedAt)
  )
}

function isPersistedTravelerState(value: unknown): value is PersistedTravelerState {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    Array.isArray(candidate.travelers) &&
    candidate.travelers.every((traveler) => isTravelerProfile(traveler)) &&
    (typeof candidate.activeTravelerId === 'string' || candidate.activeTravelerId === null)
  )
}

function normalizeTravelerState(state: PersistedTravelerState): PersistedTravelerState {
  const activeTravelerExists = state.travelers.some((traveler) => traveler.id === state.activeTravelerId)

  return {
    travelers: state.travelers,
    activeTravelerId: activeTravelerExists ? state.activeTravelerId : (state.travelers[0]?.id ?? null),
  }
}

export function loadTravelerState(): TravelerStateLoadResult {
  if (typeof window === 'undefined') {
    return { state: emptyTravelerState, errorMessage: null }
  }

  const rawState = window.localStorage.getItem(STORAGE_KEY)

  if (rawState === null) {
    return { state: emptyTravelerState, errorMessage: null }
  }

  let parsedState: unknown

  try {
    parsedState = JSON.parse(rawState)
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)

    return {
      state: emptyTravelerState,
      errorMessage:
        'Kunne ikke lese lagrede reisende fra nettleseren. Lagringen ble tilbakestilt til en tom start.',
    }
  }

  if (!isPersistedTravelerState(parsedState)) {
    window.localStorage.removeItem(STORAGE_KEY)

    return {
      state: emptyTravelerState,
      errorMessage:
        'Lagret reisedata hadde et ugyldig format. Lagringen ble tilbakestilt til en tom start.',
    }
  }

  return {
    state: normalizeTravelerState(parsedState),
    errorMessage: null,
  }
}

export function saveTravelerState(state: PersistedTravelerState): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeTravelerState(state)))
    return null
  } catch {
    return 'Kunne ikke lagre reisende i nettleseren. Sjekk at lokal lagring er tilgjengelig og prøv igjen.'
  }
}

export function createTravelerProfile(displayName: string): TravelerProfile {
  const trimmedName = displayName.trim()
  const timestamp = new Date().toISOString()

  return {
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    displayName: trimmedName,
    visitedCountryCodes: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}
