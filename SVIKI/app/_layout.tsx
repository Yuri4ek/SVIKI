import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
// 1. Импортируем вашу палитру цветов
import { Colors } from '@/styles/theme'; 

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // 2. Создаем свою тему на основе стандартной
  const MyTheme = {
    ...(colorScheme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(colorScheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      // Устанавливаем фон из вашей палитры (тот самый #FEF7FF)
      background: Colors[colorScheme ?? 'light'].background, 
      card: Colors[colorScheme ?? 'light'].background,
    },
  };

  return (
    // 3. Используем MyTheme вместо стандартных констант
    <ThemeProvider value={MyTheme}>
      <Stack>
        {/* Убедитесь, что основная группа экранов тоже здесь описана */}
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}