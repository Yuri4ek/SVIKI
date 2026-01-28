import React, { useState, useRef } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, 
  useColorScheme, Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUsersStyles } from '@/styles';

const { width } = Dimensions.get('window');

const UsersScreen = () => {
  const theme = useColorScheme() ?? 'light';
  const styles = createUsersStyles(theme);
  const scrollRef = useRef<ScrollView>(null);
  
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Клиенты', 'Агенты', 'Юристы'];

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveTab(index);
  };

  const renderUserTable = (title: string, total: number, showProgress: boolean = false) => (
    <View style={styles.page}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.totalCount}>Всего: {total}</Text>
        </View>

        {/* Пример данных на основе скриншота «Пользователи» */}
        {[1, 2, 3].map((i, index) => (
          <View key={i} style={[styles.userRow, index === 2 && styles.lastRow]}>
            <View style={styles.userInfoGrid}>
              <Text style={styles.userId}>ID: {i + 3}</Text>
              <Text style={styles.userName}>client{i}@mail.ru</Text>
            </View>
            <View style={styles.userInfoGrid}>
              <Text style={styles.userSubInfo}>User{i}</Text>
              <Text style={styles.userSubInfo}>8953379423{i}</Text>
            </View>
            
            {showProgress && (
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${30 * i}%` }]} />
              </View>
            )}
          </View>
        ))}

        {/* Индикатор страницы как на фото */}
        <View style={styles.pagination}>
          <View style={styles.pageIndicator}>
            <Text style={styles.pageIndicatorText}>1</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === index && styles.activeTabButton]}
            onPress={() => handleTabPress(index)}
          >
            <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
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
        {renderUserTable('Клиенты', 3, true)}
        {renderUserTable('Агенты', 1, false)}
        {renderUserTable('Юристы', 1, false)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UsersScreen;