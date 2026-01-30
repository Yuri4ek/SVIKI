import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'Клиент' | 'Агент' | 'Юрист';

interface UserState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  clearRole: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      role: 'Клиент', // Начальное состояние

      setRole: (role) => set({ role }),
      
      clearRole: () => set({ role: 'Клиент' }),
    }),
    {
      name: 'sviki-user-storage', // уникальное имя для ключа в AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // связываем с AsyncStorage
    }
  )
);