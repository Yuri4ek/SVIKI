import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QUIZ_DATA, QuestionType, ROUTES } from "@/constants";
import { createQuizStyles } from "@/styles";

const getVisibleQuestions = (
  questions: QuestionType[],
  answers: Record<string, string>,
): QuestionType[] => {
  let visible: QuestionType[] = [];

  questions.forEach((q) => {
    visible.push(q);
    const userAnswer = answers[q.id];

    if (q.subQuestions && userAnswer) {
      const activeSubQuestions = q.subQuestions.filter(
        (sub: QuestionType) =>
          !sub.triggerValue || sub.triggerValue === userAnswer,
      );

      if (activeSubQuestions.length > 0) {
        visible = [
          ...visible,
          ...getVisibleQuestions(activeSubQuestions, answers),
        ];
      }
    }
  });

  return visible;
};

export default function QuizScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const styles = useMemo(() => createQuizStyles(theme), [theme]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const visibleQuestions = useMemo(() => {
    return getVisibleQuestions(QUIZ_DATA, answers);
  }, [answers]);

  const handleSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const isQuizComplete = () => {
    return visibleQuestions.every((q) => !!answers[q.id]);
  };

  const collectAndLogResults = async () => {
    try {
      const finalData = visibleQuestions.reduce(
        (acc, q) => {
          acc[q.id] = answers[q.id];
          return acc;
        },
        {} as Record<string, string>,
      );

      await AsyncStorage.setItem("user_quiz_data", JSON.stringify(finalData));
      router.replace(ROUTES.MAIN);
    } catch (e) {
      console.error("Ошибка сохранения данных", e);
    }
  };

  /**
   * Рендер одного варианта ответа (кнопки)
   */
  const renderOption = (
    option: string,
    questionId: string,
    selectedValue: string,
  ) => (
    <TouchableOpacity
      key={option}
      style={[
        styles.optionButton,
        selectedValue === option && styles.selectedOption,
        { marginBottom: 8 }, // Добавляем отступ между кнопками
      ]}
      onPress={() => handleSelect(questionId, option)}
    >
      <Text style={styles.optionText}>{option}</Text>
    </TouchableOpacity>
  );

  const renderQuestion = ({ item }: { item: QuestionType }) => {
    const selectedValue = answers[item.id];
    const isChild = !!item.triggerValue;

    return (
      <View style={[styles.card, isChild && { marginLeft: 16, opacity: 0.9 }]}>
        <Text style={styles.questionText}>{item.question}</Text>

        {/* Вместо .map() используем FlashList для вариантов */}
        <View style={{ minHeight: 50 }}>
          <FlashList
            data={item.options}
            renderItem={({ item: opt }) =>
              renderOption(opt, item.id, selectedValue)
            }
            estimatedItemSize={50}
            keyExtractor={(opt) => opt}
            scrollEnabled={false} // Отключаем внутренний скролл, чтобы не конфликтовать с основным
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlashList<QuestionType>
          data={visibleQuestions}
          renderItem={renderQuestion}
          estimatedItemSize={250}
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          keyExtractor={(item: QuestionType) => item.id}
          extraData={answers}
        />
      </View>

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
