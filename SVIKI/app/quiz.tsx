import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from "@shopify/flash-list";
import { useRouter } from 'expo-router';
import { QUIZ_DATA, QuestionType } from '../constants/quizData';
import { createQuizStyles } from '@/styles';

export default function QuizScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const styles = createQuizStyles(theme);
  
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const isQuizComplete = () => {
    return QUIZ_DATA.every(q => answers[q.id]);
  };

  const renderQuestion = ({ item }: { item: QuestionType }) => {
    const selectedValue = answers[item.id];
    const showSubQuestion = item.subQuestion && selectedValue === item.subQuestion.triggerValue;

    return (
      <View style={styles.card}>
        <Text style={styles.questionText}>{item.question}</Text>
        <View style={styles.optionsContainer}>
          {item.options.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionButton, selectedValue === opt && styles.selectedOption]}
              onPress={() => handleSelect(item.id, opt)}
            >
              <Text style={[styles.optionText, selectedValue === opt && styles.selectedOptionText]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {showSubQuestion && (
          <View style={styles.subContainer}>
            <Text style={styles.subQuestionText}>{item.subQuestion?.question}</Text>
            <View style={styles.optionsContainer}>
              {item.subQuestion?.options.map((subOpt) => (
                <TouchableOpacity
                  key={subOpt}
                  style={[
                    styles.subOptionButton, 
                    answers[`${item.id}_sub`] === subOpt && styles.selectedSubOption
                  ]}
                  onPress={() => handleSelect(`${item.id}_sub`, subOpt)}
                >
                  <Text style={styles.subOptionText}>{subOpt}</Text>
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Анкета клиента</Text>
      </View>

      <FlashList
        data={QUIZ_DATA}
        renderItem={renderQuestion}
        estimatedItemSize={200}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.submitButton, !isQuizComplete() && styles.disabledButton]}
          disabled={!isQuizComplete()}
          onPress={() => router.replace('/main')}
        >
          <Text style={styles.submitButtonText}>Завершить</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}