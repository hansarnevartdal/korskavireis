import { createContext, useContext } from 'react'
import type { TravelerProfile } from './travelerStore'

export type TravelerContextValue = {
  travelers: TravelerProfile[]
  activeTraveler: TravelerProfile | null
  storageNotice: string | null
  createTraveler: (displayName: string) => TravelerProfile
  selectTraveler: (travelerId: string) => void
  clearStorageNotice: () => void
}

export const TravelerContext = createContext<TravelerContextValue | null>(null)

export function useTravelers() {
  const context = useContext(TravelerContext)

  if (context === null) {
    throw new Error('useTravelers must be used within a TravelerProvider')
  }

  return context
}
