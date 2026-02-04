import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUsersStyles } from "@/styles";
import { RoleGuard } from "@/components";

const { width } = Dimensions.get("window");

// ==========================================
// 1. MOCK DATA (ЗАГЛУШКИ ДАННЫХ)
// ==========================================

const MOCK_DATA = {
  clients: [
    {
      id: 101,
      email: "client1@mail.ru",
      name: "Иван И.",
      phone: "89001112233",
      progress: 30,
    },
    {
      id: 102,
      email: "client2@gmail.com",
      name: "Петр П.",
      phone: "89004445566",
      progress: 60,
    },
    {
      id: 103,
      email: "client3@yandex.ru",
      name: "Анна С.",
      phone: "89007778899",
      progress: 90,
    },
  ],
  agents: [
    {
      id: 201,
      email: "agent@sviki.ru",
      name: "Агент 007",
      phone: "88005553535",
      progress: 0,
    },
  ],
  lawyers: [
    {
      id: 301,
      email: "lawyer@sviki.ru",
      name: "Сол Гудман",
      phone: "505-503-4455",
      progress: 0,
    },
  ],
  // Данные для клиента (его менеджеры)
  myManagers: [
    {
      id: 201,
      role: "Мой Агент",
      name: "Алексей Смирнов",
      phone: "+7 999 000-00-01",
    },
    {
      id: 301,
      role: "Мой Юрист",
      name: "Елена Кузнецова",
      phone: "+7 999 000-00-02",
    },
  ],
};

// Строка таблицы пользователей
const UserRow = ({ item, isLast, styles, showProgress }: any) => (
  <View style={[styles.userRow, isLast && styles.lastRow]}>
    <View style={styles.userInfoGrid}>
      <Text style={styles.userId}>ID: {item.id}</Text>
      <Text style={styles.userName}>{item.email}</Text>
    </View>
    <View style={styles.userInfoGrid}>
      <Text style={styles.userSubInfo}>{item.name}</Text>
      <Text style={styles.userSubInfo}>{item.phone}</Text>
    </View>

    {showProgress && (
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
      </View>
    )}
  </View>
);

// Карточка для клиента ("Мои менеджеры")
const ManagerCard = ({ item, styles }: any) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{item.role}</Text>
    </View>
    <View style={{ paddingVertical: 8 }}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={[styles.userSubInfo, { marginTop: 4 }]}>{item.phone}</Text>
    </View>
  </View>
);

// ВИД 1: Полная база (для Агентов, Юристов, Админа)
const FullDatabaseView = ({ styles }: { styles: any }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Клиенты", "Агенты", "Юристы"];

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveTab(index);
  };

  const renderTable = (title: string, data: any[], showProgress: boolean) => (
    <View style={styles.page}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.totalCount}>Всего: {data.length}</Text>
        </View>
        {data.map((item, index) => (
          <UserRow
            key={item.id}
            item={item}
            isLast={index === data.length - 1}
            styles={styles}
            showProgress={showProgress}
          />
        ))}
        {/* Пагинация (статичная для примера) */}
        <View style={styles.pagination}>
          <View style={styles.pageIndicator}>
            <Text style={styles.pageIndicatorText}>1</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === index && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={styles.pager}
      >
        {renderTable("Список Клиентов", MOCK_DATA.clients, true)}
        {renderTable("Список Агентов", MOCK_DATA.agents, false)}
        {renderTable("Список Юристов", MOCK_DATA.lawyers, false)}
      </ScrollView>
    </View>
  );
};

// ВИД 2: "Моя команда" (для Клиента)
const ClientManagersView = ({ styles }: { styles: any }) => {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.cardTitle, { marginBottom: 16, fontSize: 22 }]}>
        Ваши помощники
      </Text>
      {MOCK_DATA.myManagers.map((mgr) => (
        <ManagerCard key={mgr.id} item={mgr} styles={styles} />
      ))}
    </ScrollView>
  );
};

const UsersScreen = () => {
  const theme = useColorScheme() ?? "light";
  const styles = useMemo(() => createUsersStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <RoleGuard
        // Клиент видит список своих менеджеров
        client={<ClientManagersView styles={styles} />}
        // Сотрудники видят полную базу
        agent={<FullDatabaseView styles={styles} />}
        lawyer={<FullDatabaseView styles={styles} />}
        // Админ видит полную базу
        admin={<FullDatabaseView styles={styles} />}
      />
    </SafeAreaView>
  );
};

export default UsersScreen;
