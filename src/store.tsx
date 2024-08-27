import { create } from "zustand";
import { MS_PER_DAY } from "./constants";

// Define the store interface
interface TimeStore {
  appTime: number;
  realTime: number;
  offsetDays: number;
  setAppTime: (newTime: number) => void;
  setRealTime: (newTime: number) => void;
}

export const offsetDaysSelector = (state: TimeStore) => state.offsetDays;

// Create the store
export const useStore = create<TimeStore>((set, get) => ({
  appTime: Date.now(), // Initial value for appTime
  realTime: Date.now(), // Initial value for realTime
  offsetDays: 0,
  setAppTime: (newTime: number) => {
    const realTime = get().realTime;
    const offsetMs = newTime - realTime;
    const offsetDays = offsetMs / MS_PER_DAY;
    let offsetDaysRounded =
      offsetMs > 0 ? Math.floor(offsetDays) : Math.ceil(offsetDays); // Convert milliseconds to days

    if (offsetDaysRounded === -0) offsetDaysRounded = 0;

    set({ appTime: newTime, offsetDays: offsetDaysRounded });
  },
  setRealTime: (newTime: number) => set({ realTime: newTime }),
}));
