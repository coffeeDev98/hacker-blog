import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Theme {
  darkMode: boolean;
}

export const useTheme = create<Theme>()(
  persist(
    (set, get) => ({
      darkMode: false,
    }),
    {
      name: "theme",
    }
  )
);
