import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { UserRow } from "@/components/users";
import { MOCK_USER_DATA } from "@/MOCK_DATA";

const { width } = Dimensions.get("window");

// База данных пользователей (Клиенты, Агенты, Юристы)
export const FullDatabaseView = ({ styles }: { styles: any }) => {
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
        {renderTable("Список Клиентов", MOCK_USER_DATA.clients, true)}
        {renderTable("Список Агентов", MOCK_USER_DATA.agents, false)}
        {renderTable("Список Юристов", MOCK_USER_DATA.lawyers, false)}
      </ScrollView>
    </View>
  );
};