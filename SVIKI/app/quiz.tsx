import React, { useState } from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { QUIZ_DATA, QuestionType } from "../constants/quizData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createQuizStyles } from "@/styles";

export default function QuizScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const styles = createQuizStyles(theme);

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (questionId: string, value: string) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev, [questionId]: value };
      // Если это основной вопрос и ответ изменился на "Нет",
      // удаляем ответ на подвопрос для чистоты данных
      if (
        !questionId.includes("_sub") &&
        value !==
          QUIZ_DATA.find((q) => q.id === questionId)?.subQuestion?.triggerValue
      ) {
        delete newAnswers[`${questionId}_sub`];
      }
      return newAnswers;
    });
  };

  const collectAndLogResults = async () => {
    const finalData = QUIZ_DATA.reduce(
      (acc, q) => {
        const mainAnswer = answers[q.id];
        const subAnswer = answers[`${q.id}_sub`];

        acc[q.id] = {
          answer: mainAnswer || "Нет",
          details: subAnswer || null,
        };
        return acc;
      },
      {} as Record<string, any>,
    );

    try {
      await AsyncStorage.setItem("user_quiz_data", JSON.stringify(finalData));
      router.replace("/main");
    } catch (e) {
      console.error("Ошибка сохранения данных", e);
    }
  };

  const isQuizComplete = () => {
    return QUIZ_DATA.every((q) => {
      const hasMainAnswer = !!answers[q.id];
      const needsSubAnswer =
        q.subQuestion && answers[q.id] === q.subQuestion.triggerValue;
      if (needsSubAnswer) {
        return !!answers[`${q.id}_sub`];
      }
      return hasMainAnswer;
    });
  };

  const renderQuestion = ({ item }: { item: QuestionType }) => {
    const selectedValue = answers[item.id];
    const showSubQuestion =
      item.subQuestion && selectedValue === item.subQuestion.triggerValue;

    return (
      <View>
        {/* Основной вопрос */}
        <View style={styles.card}>
          <Text style={styles.questionText}>{item.question}</Text>
          <View style={styles.optionsContainer}>
            {item.options.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.optionButton,
                  selectedValue === opt && styles.selectedOption,
                ]}
                onPress={() => handleSelect(item.id, opt)}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Подвопрос - теперь выглядит идентично основной карточке */}
        {showSubQuestion && (
          <View style={styles.card}>
            <Text style={styles.questionText}>
              {item.subQuestion?.question}
            </Text>
            <View style={styles.optionsContainer}>
              {item.subQuestion?.options.map((subOpt) => (
                <TouchableOpacity
                  key={subOpt}
                  style={[
                    styles.optionButton, // Используем тот же стиль, что и у основных кнопок
                    answers[`${item.id}_sub`] === subOpt &&
                      styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(`${item.id}_sub`, subOpt)}
                >
                  <Text style={styles.optionText}>{subOpt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={QUIZ_DATA}
        renderItem={renderQuestion}
        estimatedItemSize={250}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            !isQuizComplete() && styles.disabledButton,
          ]}
          disabled={!isQuizComplete()}
          onPress={collectAndLogResults}
        >
          <Text style={styles.submitButtonText}>Завершить</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
