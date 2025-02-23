import { create } from "zustand";

interface CoordinatesStore {
  coordinates: number[];
  updateCoordinates: (newCoordinates: number[]) => void;
}

export const useCoordinatesStore = create<CoordinatesStore>(
  (set) => ({
    coordinates: [0, 0],
    updateCoordinates: (newCoordinates) => set({
      coordinates: newCoordinates
    }),
  })
)