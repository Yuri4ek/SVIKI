import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUserStore } from "@/store";
import { Colors } from "@/styles/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const Placeholder = ({ title }: { title: string }) => {
  const role = useUserStore((s) => s.role);
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <Text style={[styles.text, { color: Colors[theme].onSurface }]}>
        {title}
      </Text>
      <Text style={[styles.subText, { color: Colors[theme].onSurfaceVariant }]}>
        Раздел для роли {role}а находится в разработке.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  subText: { fontSize: 14, textAlign: "center" },
});
