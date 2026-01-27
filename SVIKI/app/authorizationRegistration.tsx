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

export default function AuthScreen() {
  const router = useRouter();

  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const styles = createAuthStyles(theme);

  const handleRegister = () => {
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
        <ThemedText type="title" style={styles.title}>
          {isRegisterMode ? "Создать аккаунт" : "С возвращением"}
        </ThemedText>

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

        {isRegisterMode && (
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
    </KeyboardAvoidingView>
  );
}
