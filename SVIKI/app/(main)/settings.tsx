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
        <Text style={styles.title}>Настройки</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.text}>
            <Text style={styles.label}>Пользователь: </Text>SVIKI User
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Версия: </Text>1.0.0 (M3 Design)
          </Text>
        </View>

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