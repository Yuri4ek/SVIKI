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

import { useUserStore, UserRole } from "@/store";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/styles/theme";
import { createAuthStyles } from "@/styles";

type OrgType = "ИП" | "ООО" | "Самозанятый" | null;

export default function AuthScreen() {
  const router = useRouter();

  const setStoreRole = useUserStore((state) => state.setRole);

  const [role, setRole] = useState<UserRole>("Клиент");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [isRolePickerOpen, setIsRolePickerOpen] = useState(false);

  const [orgType, setOrgType] = useState<OrgType>(null);
  const [inn, setInn] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [bik, setBik] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const styles = useMemo(() => createAuthStyles(theme), [theme]);

  const roles: UserRole[] = ["Клиент", "Агент", "Юрист"];
  const orgTypes: OrgType[] = ["ИП", "ООО", "Самозанятый"];

  const login = useUserStore((state) => state.login);

  const handleRegister = () => {
    if (!role) {
      Alert.alert("Ошибка", "Выберите роль");
      return;
    }
    if (role !== "Клиент") {
      if (!orgType || !inn || !bik || !bankAccount) {
        Alert.alert("Ошибка", "Заполните данные организации и реквизиты");
        return;
      }
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

    login(role);
    router.replace(ROUTES.QUIZ);
  };

  const handleLogin = () => {
    if (identifier === "1234" && password === "1234") {
      login(role);
      router.replace(ROUTES.MAIN);
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

              {/* 2. Замена map на FlashList */}
              {isRolePickerOpen && (
                <View
                  style={{
                    backgroundColor: theme.surfaceContainer,
                    borderRadius: 12,
                    marginTop: 4,
                    borderWidth: 1,
                    borderColor: theme.outlineVariant,
                    // FlashList требует явной высоты или flex-контейнера.
                    // Т.к. элементов мало, считаем высоту динамически (примерно 55px на элемент)
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
                          setRole(item);
                          setIsRolePickerOpen(false);
                          // saveUserRole удален, чтобы не вызывать ошибку
                        }}
                      >
                        <ThemedText>{item}</ThemedText>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>
          )}

          {isRegisterMode && (role === "Агент" || role === "Юрист") && (
            <View style={{ width: "100%", marginBottom: 10 }}>
              <ThemedText style={{ marginBottom: 8, fontWeight: "600" }}>
                Тип организации
              </ThemedText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                {orgTypes.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[
                      {
                        padding: 10,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: theme.outlineVariant,
                        width: "31%",
                        alignItems: "center",
                      },
                      orgType === t && {
                        backgroundColor: theme.primaryContainer,
                        borderColor: theme.primary,
                      },
                    ]}
                    onPress={() => setOrgType(t)}
                  >
                    <ThemedText style={{ fontSize: 12 }}>{t}</ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={styles.input}
                placeholder="ИНН (для автозаполнения)"
                placeholderTextColor={theme.icon}
                value={inn}
                onChangeText={setInn}
                keyboardType="number-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Наименование организации"
                placeholderTextColor={theme.icon}
                value={companyName}
                onChangeText={setCompanyName}
              />
              <TextInput
                style={styles.input}
                placeholder="БИК банка"
                placeholderTextColor={theme.icon}
                value={bik}
                onChangeText={setBik}
                keyboardType="number-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Расчетный счет"
                placeholderTextColor={theme.icon}
                value={bankAccount}
                onChangeText={setBankAccount}
                keyboardType="number-pad"
              />
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
