import { create } from "zustand";
import { locations } from "#constants/index.js";

const useLocationStore = create((set) => ({
    activeLocation: locations.work,
    setActiveLocation: (location) => {
        if (!location) return;
        set({ activeLocation: location });
    },
    resetActiveLocation: () => set({ activeLocation: locations.work }),
}));

export default useLocationStore;
