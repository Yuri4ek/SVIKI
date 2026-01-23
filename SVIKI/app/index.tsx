import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Простая mock-проверка (в реальном проекте замените на вызов API)
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    // Пример фиктивной успешной авторизации (можно изменить условия)
    if (email.toLowerCase() === 'test@example.com' && password === '123456') {
      setIsAuthenticated(true);
    } else {
      Alert.alert('Ошибка авторизации', 'Неверный email или пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  if (isAuthenticated) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Добро пожаловать!</ThemedText>
        <ThemedText>Вы успешно вошли в систему.</ThemedText>
        <Button title="Выйти" onPress={handleLogout} />
        {/* Здесь можно добавить Link на другие экраны, например модал */}
        <Link href="/modal" style={styles.link}>
          <ThemedText type="link">Открыть модальный экран</ThemedText>
        </Link>
      </ThemedView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Авторизация</ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button title="Войти" onPress={handleLogin} />

        {/* Опционально: ссылки на регистрацию или восстановление пароля */}
        <Link href="/modal" style={styles.link}>
          <ThemedText type="link">Забыли пароль?</ThemedText>
        </Link>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff', // можно адаптировать под тему
  },
  link: {
    marginTop: 20,
  },
});