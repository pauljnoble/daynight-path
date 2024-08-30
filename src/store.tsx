import { create } from "zustand";
import { MS_PER_DAY } from "./constants";
import { MotionValue, useMotionValue } from "framer-motion";

export type Theme = "purple" | "green" | "blue";

// Define the store interface
interface TimeStore {
  theme: Theme;
  appTime: number;
  realTime: number;
  offsetDays: number;
  msSinceStartOfDay: number;
  setTheme: (newTheme: Theme) => void;
  setAppTime: (newTime: number) => void;
  setRealTime: (newTime: number) => void;
  resetAppTime: () => void;
}

export const offsetDaysSelector = (state: TimeStore) => state.offsetDays;
export const setThemeSelector = (state: TimeStore) => state.setTheme;
export const resetAppTimeSelector = (state: TimeStore) => state.resetAppTime;

// Create the store
export const useStore = create<TimeStore>((set, get) => ({
  theme: "purple",
  appTime: Date.now(), // Initial value for appTime
  realTime: Date.now(), // Initial value for realTime
  offsetDays: 0,
  msSinceStartOfDay: Date.now() % MS_PER_DAY,
  setAppTime: (newTime: number) => {
    const realTime = get().realTime;
    const offsetMs = newTime - realTime;
    const offsetDays = offsetMs / MS_PER_DAY;
    let offsetDaysRounded =
      offsetMs > 0 ? Math.floor(offsetDays) : Math.ceil(offsetDays); // Convert milliseconds to days

    if (offsetDaysRounded === -0) offsetDaysRounded = 0;

    const msSinceStartOfDay = newTime % MS_PER_DAY;

    set({ appTime: newTime, offsetDays: offsetDaysRounded, msSinceStartOfDay });
  },
  setRealTime: (newTime: number) => set({ realTime: newTime }),
  setTheme: (newTheme: Theme) => set({ theme: newTheme }),
  resetAppTime: () => set({ appTime: get().realTime, offsetDays: 0 }),
}));
