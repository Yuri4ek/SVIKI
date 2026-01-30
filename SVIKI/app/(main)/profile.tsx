import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router"; // Используем useRouter как в настройках
import { getUserRole, UserRole } from "@/utils/storage"; 
import { createProfileStyles } from "@/styles";

const ProfilePage = () => {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const styles = createProfileStyles(theme);

  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Состояния для ввода данных
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("+7");
  const [bik, setBik] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const role = await getUserRole();
      setUserRole(role);
      setIsLoading(false);
    };
    loadProfile();
  }, []);

  // Логика выхода как в settings.tsx
  const handleLogout = () => {
    router.replace('/authorizationRegistration');
  };

  // Переход на верификацию через replace
  const handleConfirmVerification = () => {
    router.replace("/verification");
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={styles.primaryColor.color} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Профиль</Text>
        
        <View style={styles.profileBadge}>
          <View>
            <Text style={styles.userName}>Иван Иванов Иванович</Text>
            <Text style={styles.userRoleText}>{userRole}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Безопасность и данные</Text>
        <View style={styles.card}>
          {/* Поле для почты */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.label}>Электронная почта</Text>
              <TextInput
                style={styles.inputMinimal}
                value={email}
                onChangeText={setEmail}
                placeholder="email@example.com"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Поле для телефона */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.label}>Телефон</Text>
              <TextInput
                style={styles.inputMinimal}
                value={phone}
                onChangeText={setPhone}
                placeholder="+7 (000) 000-00-00"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Кнопка подтверждения */}
          <TouchableOpacity 
            style={[styles.row, styles.lastRow]} 
            onPress={handleConfirmVerification}
          >
            <Text style={styles.linkText}>Подтвердить данные</Text>
          </TouchableOpacity>
        </View>

        {/* Кнопка Госуслуг (текстовая) */}
        <View style={styles.card}>
          <TouchableOpacity 
            style={[styles.row, styles.lastRow]} 
            onPress={() => console.log("Госуслуги")}
          >
            <Text style={styles.label}>Верификация через Госуслуги</Text>
            <Text style={styles.linkText}>Войти</Text>
          </TouchableOpacity>
        </View>

        {(userRole === "Агент" || userRole === "Юрист") && (
          <>
            <Text style={styles.sectionTitle}>Профессиональные данные</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.rowLeft}>
                  <Text style={styles.label}>БИК банка</Text>
                  <TextInput
                    style={styles.inputMinimal}
                    value={bik}
                    onChangeText={setBik}
                    placeholder="Введите БИК"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={[styles.row, styles.lastRow]}>
                <View style={styles.rowLeft}>
                  <Text style={styles.label}>Расчетный счет</Text>
                  <TextInput
                    style={styles.inputMinimal}
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                    placeholder="00000000000000000000"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </>
        )}

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutButtonText}>Выйти из аккаунта</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default ProfilePage;