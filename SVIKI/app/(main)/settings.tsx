import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { createSettingsStyles } from '@/styles';

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const styles = createSettingsStyles(theme);

  const handleLogout = () => {
    router.replace('/authorizationRegistration');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Заголовок и расшифровка SVIKI */}
        <View style={styles.headerSection}>
          <Text style={styles.appTitle}>SVIKI</Text>
          <Text style={styles.appDescription}>
            Система Восстановления И Контроля Кредитной Истории
          </Text>
        </View>
        
        {/* Информационный блок */}
        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Пользователь</Text>
            <Text style={styles.value}>SVIKI User</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Версия</Text>
            <Text style={styles.value}>1.0.0 (M3 Design)</Text>
          </View>
        </View>

        {/* Секция разработчиков */}
        <View style={styles.developerSection}>
          <Text style={styles.developerLabel}>Разработчики</Text>
          <Text style={styles.developerText}>@antonov99dm</Text>
          <Text style={styles.developerText}>@genby9</Text>
        </View>

        {/* Кнопка выхода */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}