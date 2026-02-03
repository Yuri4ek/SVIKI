import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserRole = "Клиент" | "Агент" | "Юрист" | "Админ";

interface UserState {
  role: UserRole;
  isLoggedIn: boolean;
  setRole: (role: UserRole) => void;
  login: (role: UserRole) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      role: "Клиент",
      isLoggedIn: false,

      setRole: (role) => set({ role }),

      login: (role) => set({ role, isLoggedIn: true }),

      logout: () => set({ isLoggedIn: false, role: "Клиент" }),
    }),
    {
      name: "sviki-user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
