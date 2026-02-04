import React from "react";
import {
  View,
  Text,
  ScrollView
} from "react-native";
import { MOCK_USER_DATA } from "@/MOCK_DATA";

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

// ВИД 2: "Моя команда" (для Клиента)
export const ClientManagersView = ({ styles }: { styles: any }) => {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      <Text style={[styles.cardTitle, { marginBottom: 16, fontSize: 22 }]}>
        Ваши помощники
      </Text>
      {MOCK_USER_DATA.myManagers.map((mgr) => (
        <ManagerCard key={mgr.id} item={mgr} styles={styles} />
      ))}
    </ScrollView>
  );
};