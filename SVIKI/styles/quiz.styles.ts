import { StyleSheet } from 'react-native';
import { Colors } from '@/styles/theme';

export const createQuizStyles = (theme: 'light' | 'dark') => {
  const color = Colors[theme];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.background,
    },
    header: {
      padding: 20,
      backgroundColor: color.surface,
      borderBottomWidth: 1,
      borderBottomColor: color.outlineVariant,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      color: color.onSurface,
    },
    card: {
      backgroundColor: color.surfaceContainer,
      borderRadius: 24,
      padding: 20,
      marginBottom: 16,
      // Тень для легкого объема (elevation в MD3)
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    questionText: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
      color: color.onSurface,
      lineHeight: 24,
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    optionButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: color.surfaceContainerHigh,
      borderWidth: 1,
      borderColor: color.outlineVariant,
    },
    selectedOption: {
      backgroundColor: color.primaryContainer,
      borderColor: color.primary,
    },
    optionText: {
      color: color.onSurfaceVariant,
      fontWeight: '500',
    },
    selectedOptionText: {
      color: color.onPrimaryContainer,
      fontWeight: 'bold',
    },
    subContainer: {
      marginTop: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: color.outlineVariant,
    },
    subQuestionText: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 12,
      color: color.onSurface,
    },
    subOptionButton: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: color.surfaceContainerHighest,
      borderWidth: 1,
      borderColor: color.outline,
    },
    selectedSubOption: {
      backgroundColor: color.tertiaryContainer,
      borderColor: color.tertiary,
    },
    subOptionText: {
      fontSize: 14,
      color: color.onSurface,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 24,
      backgroundColor: color.surface,
      borderTopWidth: 1,
      borderTopColor: color.outlineVariant,
    },
    submitButton: {
      backgroundColor: color.primary,
      paddingVertical: 16,
      borderRadius: 100, // Форма капсулы MD3
      alignItems: 'center',
    },
    disabledButton: {
      backgroundColor: color.surfaceVariant,
      opacity: 0.5,
    },
    submitButtonText: {
      color: color.onPrimary,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
};