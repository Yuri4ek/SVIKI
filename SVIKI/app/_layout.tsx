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
        {/* экран заглушки */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* экран авторизации */}
        <Stack.Screen
          name="authorizationRegistration"
          options={{ headerShown: false }}
        />

        {/* основные страницы для пользователя */}
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
