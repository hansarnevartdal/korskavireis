import { useMemo, useState, type PropsWithChildren } from 'react'
import { TravelerContext, type TravelerContextValue } from './TravelerContext'
import {
  createTravelerProfile,
  loadTravelerState,
  saveTravelerState,
  type PersistedTravelerState,
} from './travelerStore'

export function TravelerProvider({ children }: PropsWithChildren) {
  const [travelerState, setTravelerState] = useState<PersistedTravelerState>(() => {
    const { state: persistedState, errorMessage } = loadTravelerState()
    if (errorMessage !== null) {
      return persistedState
    }

    return persistedState
  })
  const [storageNotice, setStorageNotice] = useState<string | null>(() => {
    const { errorMessage } = loadTravelerState()

    return errorMessage
  })

  const activeTraveler = useMemo(
    () => travelerState.travelers.find((traveler) => traveler.id === travelerState.activeTravelerId) ?? null,
    [travelerState.activeTravelerId, travelerState.travelers],
  )

  const contextValue = useMemo<TravelerContextValue>(
    () => ({
      travelers: travelerState.travelers,
      activeTraveler,
      storageNotice,
      createTraveler: (displayName: string) => {
        const nextTraveler = createTravelerProfile(displayName)
        const nextState = {
          travelers: [nextTraveler, ...travelerState.travelers],
          activeTravelerId: nextTraveler.id,
        }
        const errorMessage = saveTravelerState(nextState)

        setTravelerState(nextState)

        if (errorMessage !== null) {
          setStorageNotice(errorMessage)
        } else {
          setStorageNotice(null)
        }

        return nextTraveler
      },
      selectTraveler: (travelerId: string) => {
        const travelerExists = travelerState.travelers.some((traveler) => traveler.id === travelerId)

        if (!travelerExists) {
          setStorageNotice('Den valgte reisende finnes ikke lenger. Velg en annen profil fra listen.')
          return
        }

        const nextState = {
          ...travelerState,
          activeTravelerId: travelerId,
        }
        const errorMessage = saveTravelerState(nextState)

        setTravelerState(nextState)

        if (errorMessage !== null) {
          setStorageNotice(errorMessage)
        } else {
          setStorageNotice(null)
        }
      },
      clearStorageNotice: () => {
        setStorageNotice(null)
      },
    }),
    [activeTraveler, storageNotice, travelerState],
  )

  return <TravelerContext.Provider value={contextValue}>{children}</TravelerContext.Provider>
}
