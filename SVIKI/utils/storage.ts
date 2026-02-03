import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserRole } from '@/store';

const ROLE_KEY = 'sviki_user_role';

export const saveUserRole = async (role: UserRole): Promise<void> => {
  try {
    await AsyncStorage.setItem(ROLE_KEY, role);
  } catch (error) {
    console.error("Ошибка при сохранении роли:", error);
  }
};

export const getUserRole = async (): Promise<UserRole | null> => {
  try {
    const role = await AsyncStorage.getItem(ROLE_KEY);
    return role as UserRole | null;
  } catch (error) {
    console.error("Ошибка при получении роли:", error);
    return null;
  }
};