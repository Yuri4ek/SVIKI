import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants";
import { useUserStore } from "@/store";
import { createProfileStyles } from "@/styles";
import { RoleGuard } from "@/components";

// ==========================================
// 1. MOCK DATA
// ==========================================
const MOCK_PROFILE_DATA = {
  name: "Иван Иванов Иванович",
  email: "ivanov@sviki.ru",
  phone: "+7 (999) 123-45-67",
  bik: "044525225",
  account: "40817810099910004312",
};

interface CommonLayoutProps {
  styles: any;
  roleName?: string;
  userRole: string;
  data: { email: string; phone: string };
  setters: { setEmail: (v: string) => void; setPhone: (v: string) => void };
  children?: React.ReactNode; 
  onLogout: () => void;
}

const CommonProfileLayout = ({
  styles,
  roleName,
  userRole,
  data,
  setters,
  children,
  onLogout,
}: CommonLayoutProps) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.header}>
        Профиль {roleName ? roleName : "Клиента"}
      </Text>

      {/* Бейдж пользователя */}
      <View style={styles.profileBadge}>
        <View>
          <Text style={styles.userName}>{MOCK_PROFILE_DATA.name}</Text>
          <Text style={styles.userRoleText}>
            {userRole || "Роль не определена"}
          </Text>
        </View>
      </View>

      {/* Общая секция: Безопасность */}
      <Text style={styles.sectionTitle}>Безопасность и данные</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.label}>Электронная почта</Text>
            <TextInput
              style={styles.inputMinimal}
              value={data.email}
              onChangeText={setters.setEmail}
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
              value={data.phone}
              onChangeText={setters.setPhone}
              placeholder="+7 (000) 000-00-00"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.row, styles.lastRow]}
        >
          <Text style={styles.linkText}>Подтвердить данные</Text>
        </TouchableOpacity>
      </View>

      {/* Общая секция: Госуслуги */}
      <View style={styles.card}>
        <TouchableOpacity
          style={[styles.row, styles.lastRow]}
          onPress={() => console.log("Госуслуги")}
        >
          <Text style={styles.label}>Верификация через Госуслуги</Text>
          <Text style={styles.linkText}>Войти</Text>
        </TouchableOpacity>
      </View>

      {/* Уникальный контент (Проф. данные для агентов) */}
      {children}

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Выйти</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const ClientProfile = ({ styles, logout, userRole }: any) => {
  const router = useRouter();
  const [email, setEmail] = useState(MOCK_PROFILE_DATA.email);
  const [phone, setPhone] = useState(MOCK_PROFILE_DATA.phone);

  return (
    <CommonProfileLayout
      styles={styles}
      userRole={userRole}
      data={{ email, phone }}
      setters={{ setEmail, setPhone }}
      onLogout={logout}
    />
  );
};

const WorkerProfile = ({ styles, logout, roleName, userRole }: any) => {
  const router = useRouter();
  const [email, setEmail] = useState(MOCK_PROFILE_DATA.email);
  const [phone, setPhone] = useState(MOCK_PROFILE_DATA.phone);

  // Дополнительные стейты для сотрудников
  const [bik, setBik] = useState(MOCK_PROFILE_DATA.bik);
  const [account, setAccount] = useState(MOCK_PROFILE_DATA.account);

  return (
    <CommonProfileLayout
      styles={styles}
      roleName={roleName}
      userRole={userRole}
      data={{ email, phone }}
      setters={{ setEmail, setPhone }}
      onLogout={logout}
    >
      {/* Вставляем уникальный блок через children */}
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
              value={account}
              onChangeText={setAccount}
              placeholder="000000000000000000"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    </CommonProfileLayout>
  );
};

export default function ProfilePage() {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const styles = useMemo(() => createProfileStyles(theme), [theme]);

  const logout = useUserStore((state) => state.logout);
  const userRole = useUserStore((state) => state.role);

  const handleLogout = () => {
    logout();
    router.replace(ROUTES.AUTH);
  };

  return (
    <View style={styles.container}>
      <RoleGuard
        client={
          <ClientProfile
            styles={styles}
            logout={handleLogout}
            userRole={userRole}
          />
        }
        agent={
          <WorkerProfile
            styles={styles}
            logout={handleLogout}
            roleName="Агента"
            userRole={userRole}
          />
        }
        lawyer={
          <WorkerProfile
            styles={styles}
            logout={handleLogout}
            roleName="Юриста"
            userRole={userRole}
          />
        }
      />
    </View>
  );
}
