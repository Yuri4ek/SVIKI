import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/styles/theme";
import { createVerificationStyles } from "@/styles";

export default function VerificationScreen() {
  const router = useRouter();
  // Получаем тип и роль из параметров
  const { type, role } = useLocalSearchParams<{ type: 'email' | 'phone', role: string }>(); 
  const [code, setCode] = useState("");

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const styles = createVerificationStyles(theme);

  const handleVerify = () => {
    if (code.length < 4) {
      Alert.alert("Ошибка", "Введите полный код подтверждения");
      return;
    }

    // ЛОГИКА ПЕРЕХОДА ПО РОЛЯМ
    if (role === "Клиент") {
      router.replace("/quiz"); // Клиенты идут на анкету
    } else {
      router.replace("/main"); // Агенты и Юристы сразу на главную
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Подтверждение</ThemedText>
        
        <ThemedText style={styles.subtitle}>
          Введите код, отправленный на ваш {type === 'email' ? 'e-mail' : 'номер телефона'}
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="0000"
          placeholderTextColor={theme.icon}
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
        />

        <TouchableOpacity style={styles.mainButton} onPress={handleVerify}>
          <ThemedText style={styles.mainButtonText}>Подтвердить</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.back()}>
          <ThemedText style={styles.secondaryButtonText}>Отправить код повторно</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}