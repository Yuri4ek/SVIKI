import { StyleSheet } from 'react-native';
import { Colors } from './theme'; // Используем вашу цветовую схему

export const createMainStyles = (theme: 'light' | 'dark') => {
  const color = Colors[theme];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.background,
      padding: 16,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: color.onSurface,
      marginBottom: 16,
      marginTop: 40,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: color.onSurface,
      marginBottom: 12,
      marginTop: 8,
    },
    card: {
      backgroundColor: color.surfaceContainerHigh,
      borderRadius: 24,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    // Рейтинг
    scoreGrid: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    scoreItem: {
      alignItems: 'center',
      width: '45%',
      backgroundColor: color.surfaceContainerLow,
      padding: 12,
      borderRadius: 16,
    },
    scoreValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: color.primary,
    },
    scoreLabel: {
      fontSize: 12,
      color: color.onSurfaceVariant,
      marginTop: 4,
    },
    // Общие строки дашборда
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: color.outlineVariant,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    label: {
      fontSize: 14,
      color: color.onSurfaceVariant,
      flex: 1,
    },
    value: {
      fontSize: 14,
      fontWeight: '500',
      color: color.onSurface,
      textAlign: 'right',
      flex: 1,
    },
    // Список значений (для нескольких авто/кредитов)
    valueList: {
      alignItems: 'flex-end',
      flex: 1,
    },
    subValue: {
      fontSize: 13,
      color: color.onSurface,
      marginBottom: 2,
    },
    // Статусы
    statusPositive: {
      color: '#10b981',
    },
    statusNegative: {
      color: color.error,
    },
  });
};