import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/styles/theme";
import { createAuthStyles } from "@/styles/auth.styles";

type UserRole = "Клиент" | "Агент" | "Юрист" | null;

export default function AuthScreen() {
  const router = useRouter();

  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  // Функциональные переменные
  const [role, setRole] = useState<UserRole>(null);
  const [isRolePickerOpen, setIsRolePickerOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const styles = createAuthStyles(theme);

  const roles: UserRole[] = ["Клиент", "Агент", "Юрист"];

  const handleRegister = () => {
    if (!role) {
      Alert.alert("Ошибка", "Выберите роль");
      return;
    }
    if (!identifier || !password || !confirmPassword) {
      Alert.alert("Ошибка", "Заполните все поля");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Ошибка", "Пароли не совпадают");
      return;
    }
    if (!agreementAccepted) {
      Alert.alert("Ошибка", "Примите соглашение");
      return;
    }
    router.replace("/quiz");
  };

  const handleLogin = () => {
    if (identifier === "1234" && password === "1234") {
      console.log("Remember Me:", rememberMe);
      router.replace("/main");
    } else {
      Alert.alert("Ошибка", "Неверные данные");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <ThemedView style={styles.container}>
        {/* Заголовок как в первом варианте */}
        <ThemedText type="title" style={styles.title}>
          {isRegisterMode ? "Добро пожаловать в SVIKI" : "С возвращением в SVIKI"}
        </ThemedText>

        {/* Выбор роли (Выпадающий список) */}
        {isRegisterMode && (
          <View style={{ width: "100%", marginBottom: 12, zIndex: 10 }}>
            <TouchableOpacity
              style={[
                styles.input,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderColor: isRolePickerOpen ? theme.primary : theme.outlineVariant,
                },
              ]}
              onPress={() => setIsRolePickerOpen(!isRolePickerOpen)}
              activeOpacity={0.7}
            >
              <ThemedText style={{ color: role ? theme.onSurface : theme.onSurfaceVariant }}>
                {role ? `Роль: ${role}` : "Выберите роль"}
              </ThemedText>
              <MaterialCommunityIcons
                name={isRolePickerOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color={theme.icon}
              />
            </TouchableOpacity>

            {isRolePickerOpen && (
              <View
                style={{
                  backgroundColor: theme.surfaceContainer,
                  borderRadius: 12,
                  marginTop: 4,
                  borderWidth: 1,
                  borderColor: theme.outlineVariant,
                  overflow: "hidden",
                }}
              >
                {roles.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={{
                      padding: 15,
                      backgroundColor: role === item ? theme.primaryContainer : "transparent",
                      borderBottomWidth: 1,
                      borderBottomColor: theme.outlineVariant,
                    }}
                    onPress={() => {
                      setRole(item);
                      setIsRolePickerOpen(false);
                    }}
                  >
                    <ThemedText style={role === item ? { color: theme.primary, fontWeight: "600" } : {}}>
                      {item}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Почта или телефон"
          placeholderTextColor={theme.icon}
          value={identifier}
          onChangeText={setIdentifier}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Пароль"
          placeholderTextColor={theme.icon}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {isRegisterMode ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Повторите пароль"
              placeholderTextColor={theme.icon}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAgreementAccepted(!agreementAccepted)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, agreementAccepted && styles.checkboxChecked]}>
                {agreementAccepted && (
                  <MaterialCommunityIcons name="check" size={16} color={theme.background} />
                )}
              </View>
              <ThemedText style={styles.checkboxText}>
                Принимаю пользовательское соглашение
              </ThemedText>
            </TouchableOpacity>
          </>
        ) : (
          /* Галка "Запомнить меня" для входа */
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && (
                <MaterialCommunityIcons name="check" size={16} color={theme.background} />
              )}
            </View>
            <ThemedText style={styles.checkboxText}>
              Запомнить меня
            </ThemedText>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.mainButton}
          onPress={isRegisterMode ? handleRegister : handleLogin}
        >
          <ThemedText style={styles.mainButtonText}>
            {isRegisterMode ? "Зарегистрироваться" : "Войти"}
          </ThemedText>
        </TouchableOpacity>

        {/* Нижние кнопки в оригинальном стиле */}
        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              setIsRegisterMode(!isRegisterMode);
              setIsRolePickerOpen(false);
            }}
          >
            <ThemedText style={styles.secondaryButtonText}>
              {isRegisterMode ? "Войти" : "Регистрация"}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => Alert.alert("Госуслуги", "Интеграция в процессе")}
          >
            <ThemedText style={styles.secondaryButtonText}>
              Госуслуги
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}