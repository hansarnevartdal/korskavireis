import { useMemo, useState, type PropsWithChildren } from 'react'
import { TravelerContext, type TravelerContextValue } from './TravelerContext'
import {
  createTravelerProfile,
  loadTravelerState,
  saveTravelerState,
  type PersistedTravelerState,
} from './travelerStore'

type TravelerProviderState = {
  travelerState: PersistedTravelerState
  storageNotice: string | null
}

export function TravelerProvider({ children }: PropsWithChildren) {
  const [providerState, setProviderState] = useState<TravelerProviderState>(() => {
    const initialLoadResult = loadTravelerState()

    return {
      travelerState: initialLoadResult.state,
      storageNotice: initialLoadResult.errorMessage,
    }
  })

  const activeTraveler = useMemo(
    () =>
      providerState.travelerState.travelers.find(
        (traveler) => traveler.id === providerState.travelerState.activeTravelerId,
      ) ?? null,
    [providerState.travelerState.activeTravelerId, providerState.travelerState.travelers],
  )

  const contextValue = useMemo<TravelerContextValue>(
    () => ({
      travelers: providerState.travelerState.travelers,
      activeTraveler,
      storageNotice: providerState.storageNotice,
      createTraveler: (displayName: string) => {
        const nextTraveler = createTravelerProfile(displayName)
        const nextState = {
          travelers: [nextTraveler, ...providerState.travelerState.travelers],
          activeTravelerId: nextTraveler.id,
        }
        const errorMessage = saveTravelerState(nextState)

        setProviderState({
          travelerState: nextState,
          storageNotice: errorMessage,
        })

        return nextTraveler
      },
      selectTraveler: (travelerId: string) => {
        const travelerExists = providerState.travelerState.travelers.some((traveler) => traveler.id === travelerId)

        if (!travelerExists) {
          setProviderState((currentState) => ({
            ...currentState,
            storageNotice: 'Den valgte reisende finnes ikke lenger. Velg en annen profil fra listen.',
          }))
          return
        }

        const nextState = {
          ...providerState.travelerState,
          activeTravelerId: travelerId,
        }
        const errorMessage = saveTravelerState(nextState)

        setProviderState({
          travelerState: nextState,
          storageNotice: errorMessage,
        })
      },
      clearStorageNotice: () => {
        setProviderState((currentState) => ({
          ...currentState,
          storageNotice: null,
        }))
      },
    }),
    [activeTraveler, providerState],
  )

  return <TravelerContext.Provider value={contextValue}>{children}</TravelerContext.Provider>
}
