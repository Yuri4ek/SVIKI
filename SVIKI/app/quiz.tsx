import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { useRouter } from 'expo-router';
import { QUIZ_DATA, QuestionType } from '../constants/quizData';

export default function QuizScreen() {
  const router = useRouter();
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
        estimatedItemSize={150}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.submitButton, !isQuizComplete() && styles.disabledButton]}
          disabled={!isQuizComplete()}
          onPress={() => router.replace('/main')}
        >
          <Text style={styles.submitButtonText}>Завершить и перейти на главную</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },
  questionText: { fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#333' },
  optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionButton: { 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 8, 
    backgroundColor: '#F1F3F5',
    borderWidth: 1,
    borderColor: '#E9ECEF'
  },
  selectedOption: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  optionText: { color: '#495057', fontWeight: '500' },
  selectedOptionText: { color: '#fff' },
  
  subContainer: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F1F3F5' },
  subQuestionText: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, color: '#555' },
  subOptionButton: { 
    padding: 8, 
    borderRadius: 6, 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#007AFF' 
  },
  selectedSubOption: { backgroundColor: '#E1EFFF' },
  subOptionText: { fontSize: 13, color: '#007AFF' },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#fff' },
  submitButton: { backgroundColor: '#007AFF', padding: 18, borderRadius: 12, alignItems: 'center' },
  disabledButton: { backgroundColor: '#CCC' },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});