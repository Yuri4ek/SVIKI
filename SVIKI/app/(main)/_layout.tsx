import React, { useMemo } from 'react';
import { View, useColorScheme } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/styles/theme';
import { createLayoutStyles } from '@/styles';

export default function TabsLayout() {
  const theme = useColorScheme() ?? 'light';
  const styles = useMemo(() => createLayoutStyles(theme), [theme]);
  
  const activeColor = Colors[theme].primary; 
  const inactiveColor = Colors[theme].onSurfaceVariant;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        // Отрисовываем фиолетовую плашку как подложку
        tabBarBackground: () => <View style={styles.floatingBackground} />,
      }}
    >
      <Tabs.Screen
        name="main"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "grid" : "grid-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="programs"
        options={{
          title: 'Программы',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "book" : "book-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Чат',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Пользователи',
          tabBarIcon: ({ color, focused }) => (
            // Минималистичная иконка человека, как заказывали
            <Ionicons name={focused ? "person" : "person-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
          title: 'Настройки',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "options" : "options-outline"} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
