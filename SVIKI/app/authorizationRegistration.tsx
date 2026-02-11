import React, { useState, useMemo } from "react";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants";
import {
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  useColorScheme,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";

import {
  useUserStore,
  UserRole,
  RoleDisplay,
  RoleTranslation,
  REGISTRATION_ROLES_UI,
} from "@/store";
import { authService } from "@/api";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/styles/theme";
import { createAuthStyles } from "@/styles";

export default function AuthScreen() {
  const router = useRouter();

  const [role, setRole] = useState<UserRole>("Client");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [isRolePickerOpen, setIsRolePickerOpen] = useState(false);

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const styles = useMemo(() => createAuthStyles(theme), [theme]);

  const roles = REGISTRATION_ROLES_UI;

  const login = useUserStore((state) => state.login);

  const handleRegister = async () => {
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

    try {
      await authService.register(Number(identifier), password, role);

      const loginResponse = await authService.login(identifier, password);

      login(role);

      if (role === "Client") {
        router.replace(ROUTES.QUIZ);
      } else {
        router.replace(ROUTES.MAIN);
      }
    } catch (error: any) {
      console.error(error);
      // Обработка ошибок
      // Если ошибка случилась на шаге регистрации
      const errorMessage =
        error.response?.data?.message || error.message || "Ошибка регистрации";

      Alert.alert(
        "Ошибка",
        typeof errorMessage === "string" ? errorMessage : "Что-то пошло не так",
      );
    }
  };

  const handleLogin = async () => {
    if (identifier !== "" && password !== "") {
      try {
        const loginResponse = await authService.login(identifier, password);
        
        const serverRole = loginResponse.role as UserRole;

        login(serverRole);

        router.replace(ROUTES.MAIN);
      } catch (error: any) {
        console.error(error);
        // Обработка ошибок
        // Если ошибка случилась на шаге регистрации
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Ошибка авторизации";

        Alert.alert(
          "Ошибка",
          typeof errorMessage === "string"
            ? errorMessage
            : "Что-то пошло не так",
        );
      }
    } else {
      Alert.alert("Ошибка", "Неверные данные");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            {isRegisterMode
              ? "Добро пожаловать в SVIKI"
              : "С возвращением в SVIKI"}
          </ThemedText>

          {isRegisterMode && (
            <View style={{ width: "100%", marginBottom: 12, zIndex: 10 }}>
              <TouchableOpacity
                style={[
                  styles.input,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
                onPress={() => setIsRolePickerOpen(!isRolePickerOpen)}
              >
                <ThemedText
                  style={{
                    color: role ? theme.onSurface : theme.onSurfaceVariant,
                  }}
                >
                  {role ? `Роль: ${role}` : "Выберите роль"}
                </ThemedText>
                <MaterialCommunityIcons
                  name="chevron-down"
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
                    height: roles.length * 55,
                    overflow: "hidden",
                  }}
                >
                  <FlashList
                    data={roles}
                    estimatedItemSize={55}
                    // scrollEnabled={false} важен, т.к. мы внутри ScrollView
                    scrollEnabled={false}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          padding: 15,
                          borderBottomWidth: 1,
                          borderBottomColor: theme.outlineVariant,
                        }}
                        onPress={() => {
                          setRole(RoleTranslation[item]);
                          setIsRolePickerOpen(false);
                          // saveUserRole удален, чтобы не вызывать ошибку
                        }}
                      >
                        <ThemedText>{RoleDisplay[item as UserRole]}</ThemedText>
                      </TouchableOpacity>
                    )}
                  />
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
              >
                <View
                  style={[
                    styles.checkbox,
                    agreementAccepted && styles.checkboxChecked,
                  ]}
                >
                  {agreementAccepted && (
                    <MaterialCommunityIcons
                      name="check"
                      size={16}
                      color={theme.background}
                    />
                  )}
                </View>
                <ThemedText style={styles.checkboxText}>
                  Принимаю пользовательское соглашение
                </ThemedText>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
              >
                {rememberMe && (
                  <MaterialCommunityIcons
                    name="check"
                    size={16}
                    color={theme.background}
                  />
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

          <View style={styles.rowButtons}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setIsRegisterMode(!isRegisterMode)}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
