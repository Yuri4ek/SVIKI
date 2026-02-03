import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/styles/theme";

export const unstable_settings = {
  anchor: "(main)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const MyTheme = {
    ...(colorScheme === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(colorScheme === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      background: Colors[colorScheme ?? "light"].background,
      card: Colors[colorScheme ?? "light"].background,
    },
  };

  return (
    <ThemeProvider value={MyTheme}>
      <Stack>
        {/* Начальный экран (скрываем заголовок) */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Экран авторизации (скрываем заголовок) */}
        <Stack.Screen
          name="authorizationRegistration"
          options={{ headerShown: false }}
        />

        {/* Экран верификации */}
        <Stack.Screen name="verification" options={{ headerShown: false }} />

        {/* Основная группа с табами */}
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
