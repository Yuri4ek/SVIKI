import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  StatusBar,
  TouchableOpacity,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useUserStore } from "@/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMainStyles } from "@/styles";

const MainPage = () => {
  const theme = useColorScheme() ?? "light";
  const styles = createMainStyles(theme);

  const userRole = useUserStore((state) => state.role);

  const [quizData, setQuizData] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        // Загрузка данных из анкеты
        const jsonValue = await AsyncStorage.getItem("user_quiz_data");
        if (jsonValue != null) setQuizData(JSON.parse(jsonValue));
      } catch (e) {
        console.error("Ошибка:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuizData();
  }, []);

  // Хелперы для получения данных
  const getAnswer = (id: string) => quizData?.[id]?.answer || "Нет данных";
  const getDetails = (id: string) => quizData?.[id]?.details || "";

  // 1. Состояние загрузки: пока проверяем роль, не показываем ничего или крутилку
  if (userRole !== "Клиент") {
    return (
      <View style={styles.container}>
         <StatusBar barStyle={theme === "light" ? "dark-content" : "light-content"} />
         {/* Для Агентов и Юристов показываем заглушку или другой контент */}
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: styles.header.color }}>Кабинет {userRole}</Text>
         </View>
      </View>
    );
  }

  // 3. Основной контент (виден только роли "Клиент")
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <Text style={styles.header}>СВИКИ</Text>

        {/* Кредитный рейтинг */}
        <Text style={styles.sectionTitle}>Кредитный рейтинг</Text>
        <TouchableOpacity
          style={styles.card}
          onPress={() => setShowHistory(true)}
        >
          <View style={styles.scoreGrid}>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreValue}>450</Text>
              <Text style={styles.scoreLabel}>НБКИ</Text>
            </View>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreValue}>380</Text>
              <Text style={styles.scoreLabel}>ОКБ</Text>
            </View>
          </View>
          <Text style={{ textAlign: "center", fontSize: 12, marginTop: 12, opacity: 0.5, color: "#888" }}>
            Нажмите для просмотра динамики
          </Text>
        </TouchableOpacity>

        {/* Остальные секции: Транспорт, Недвижимость, Долги... */}
        {/* (Весь ваш существующий код ScrollView остается здесь без изменений) */}
        
        <Text style={styles.sectionTitle}>Транспорт</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Авто в собственности</Text>
            <Text style={styles.value}>{getAnswer("7")}</Text>
          </View>
          {getAnswer("7") === "Да" && (
            <View style={styles.row}>
              <Text style={styles.label}>Стоимость</Text>
              <Text style={styles.value}>{getDetails("7")}</Text>
            </View>
          )}
          <View style={[styles.row, styles.lastRow]}>
            <Text style={styles.label}>Автокредит</Text>
            <Text style={styles.value}>
              {getAnswer("8")}{" "}
              {getAnswer("8") === "Да" ? `(${getDetails("8")})` : ""}
            </Text>
          </View>
        </View>

        {/* Ипотека */}
        <Text style={styles.sectionTitle}>Недвижимость</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Ипотека</Text>
            <Text style={styles.value}>{getAnswer("5")}</Text>
          </View>
          {getAnswer("5") === "Да" && (
            <View style={styles.row}>
              <Text style={styles.label}>Остаток долга</Text>
              <Text style={styles.value}>{getDetails("5")}</Text>
            </View>
          )}
          <View style={[styles.row, styles.lastRow]}>
            <Text style={styles.label}>Доп. имущество</Text>
            <Text style={styles.value}>{getAnswer("6")}</Text>
          </View>
        </View>

        {/* Долги */}
        <Text style={styles.sectionTitle}>Задолженности</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Долги ФССП</Text>
            <Text style={[styles.value, getAnswer("10") === "Нет" ? styles.statusPositive : styles.statusNegative]}>
              {getAnswer("10")} {getAnswer("10") === "Да" ? `(${getDetails("10")})` : ""}
            </Text>
          </View>
          <View style={[styles.row, styles.lastRow]}>
            <Text style={styles.label}>Налоги</Text>
            <Text style={[styles.value, getAnswer("11") === "Нет" ? styles.statusPositive : styles.statusNegative]}>
              {getAnswer("11")} {getAnswer("11") === "Да" ? `(${getDetails("11")})` : ""}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal динамики */}
      <Modal visible={showHistory} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setShowHistory(false)}>
          <View style={styles.modalContent}>
            <Text style={[styles.sectionTitle, { marginTop: 0, marginLeft: 0 }]}>Динамика рейтинга</Text>
            <View style={{ marginVertical: 10 }}>
              <View style={styles.row}>
                <Text style={styles.label}>Январь</Text>
                <Text style={styles.scoreValue}>450</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Декабрь</Text>
                <Text style={styles.scoreValue}>430</Text>
              </View>
              <View style={[styles.row, styles.lastRow]}>
                <Text style={styles.label}>Ноябрь</Text>
                <Text style={styles.scoreValue}>415</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.mainButton} onPress={() => setShowHistory(false)}>
              <Text style={styles.mainButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default MainPage;