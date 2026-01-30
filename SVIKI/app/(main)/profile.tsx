import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store";

import { createProfileStyles } from "@/styles";

const ProfilePage = () => {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const styles = createProfileStyles(theme);

  const userRole = useUserStore((state) => state.role);
  const clearRole = useUserStore((state) => state.clearRole);

  // Данные профиля
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("+7");
  const [bik, setBik] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleLogout = () => {
    clearRole();
    router.replace('/authorizationRegistration');
  };

  const handleConfirmVerification = () => {
    router.replace("/verification");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Профиль</Text>
        
        <View style={styles.profileBadge}>
          <View>
            <Text style={styles.userName}>Иван Иванов Иванович</Text>
            {/* Отображаем роль, полученную из хранилища */}
            <Text style={styles.userRoleText}>{userRole || "Роль не определена"}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Безопасность и данные</Text>
        <View style={styles.card}>
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

          <TouchableOpacity 
            style={[styles.row, styles.lastRow]} 
            onPress={handleConfirmVerification}
          >
            <Text style={styles.linkText}>Подтвердить данные</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity 
            style={[styles.row, styles.lastRow]} 
            onPress={() => console.log("Госуслуги")}
          >
            <Text style={styles.label}>Верификация через Госуслуги</Text>
            <Text style={styles.linkText}>Войти</Text>
          </TouchableOpacity>
        </View>

        {/* ЛОГИКА РОЛЕЙ: 
            Если роль "Клиент", блок ниже не отобразится.
            Если роль "Агент" или "Юрист", блок будет виден.
        */}
        {userRole !== "Клиент" && (
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