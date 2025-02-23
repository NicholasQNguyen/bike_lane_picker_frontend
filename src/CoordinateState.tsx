import { create } from 'zustand'

interface CoordinateStateProps {
  currentCoordinates: number[]
  updateCurrentCoordinates: (newCoordinates: number[]) => void
}

export const useCoordinateState = create<CoordinateStateProps>(
  (set) => ({
    currentCoordinates: [0, 0],
    updateCurrentCoordinates: (newCurrentCoordinates) => set({
      currentCoordinates: newCurrentCoordinates
    }),
  }))