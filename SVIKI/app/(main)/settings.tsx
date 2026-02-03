import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store";
import { createSettingsStyles } from "@/styles";
import { RoleGuard } from "@/components";

// ==========================================
// 1. STATIC DATA
// ==========================================

const APP_INFO = {
  title: "SVIKI",
  description: "Система Восстановления И Контроля Кредитной Истории",
  version: "1.0.0 (M3 Design)",
  developers: ["@antonov99dm", "@genby9"],

  // Доп. инфо для админов/сотрудников
  debugInfo: {
    buildNumber: "2024.05.20.1",
    apiEndpoint: "https://api.sviki.internal/v1",
    serverStatus: "Stable",
  },
};

interface SettingsContentProps {
  mode: "simple" | "extended" | "debug";
  styles: any;
  onLogout: () => void;
}

const SettingsView = ({ mode, styles, onLogout }: SettingsContentProps) => {
  return (
    <View style={styles.content}>
      {/* Заголовок */}
      <View style={styles.headerSection}>
        <Text style={styles.appTitle}>{APP_INFO.title}</Text>
        <Text style={styles.appDescription}>{APP_INFO.description}</Text>
      </View>

      {/* Информационный блок */}
      <View style={styles.section}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Версия</Text>
          <Text style={styles.value}>{APP_INFO.version}</Text>
        </View>

        {/* Если режим debug или extended, показываем доп инфу */}
        {(mode === "extended" || mode === "debug") && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Сборка</Text>
            <Text style={styles.value}>{APP_INFO.debugInfo.buildNumber}</Text>
          </View>
        )}

        {/* Только для админа */}
        {mode === "debug" && (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.label}>API</Text>
              <Text style={[styles.value, { fontSize: 10 }]}>
                {APP_INFO.debugInfo.apiEndpoint}
              </Text>
            </View>
            <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.label}>Статус сервера</Text>
              <Text style={[styles.value, { color: "green" }]}>
                {APP_INFO.debugInfo.serverStatus}
              </Text>
            </View>
          </>
        )}
      </View>

      {/* Секция разработчиков (общая) */}
      <View style={styles.developerSection}>
        <Text style={styles.developerLabel}>Разработчики</Text>
        {APP_INFO.developers.map((dev) => (
          <Text key={dev} style={styles.developerText}>
            {dev}
          </Text>
        ))}
        {mode === "debug" && (
          <Text style={[styles.developerText, { color: "red", marginTop: 8 }]}>
            ADMIN MODE ACTIVE
          </Text>
        )}
      </View>

      {/* Кнопка выхода */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={onLogout}
        activeOpacity={0.7}
      >
        <Text style={styles.logoutText}>Выйти из аккаунта</Text>
      </TouchableOpacity>
    </View>
  );
};

const SettingsScreen = () => {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const styles = createSettingsStyles(theme);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.replace("/authorizationRegistration");
  };

  return (
    <SafeAreaView style={styles.container}>
      <RoleGuard
        // Клиент видит простой вид
        client={
          <SettingsView mode="simple" styles={styles} onLogout={handleLogout} />
        }
        // Агент и Юрист видят расширенный
        agent={
          <SettingsView
            mode="extended"
            styles={styles}
            onLogout={handleLogout}
          />
        }
        lawyer={
          <SettingsView
            mode="extended"
            styles={styles}
            onLogout={handleLogout}
          />
        }
        // Админ видит отладочный вид
        admin={
          <SettingsView mode="debug" styles={styles} onLogout={handleLogout} />
        }
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;
