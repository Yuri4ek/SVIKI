import { StyleSheet } from 'react-native';
import { Colors } from './theme';

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
      marginBottom: 24,
      marginTop: 40,
    },
    card: {
      backgroundColor: color.surfaceContainerHigh,
      borderRadius: 28,
      padding: 20,
      marginBottom: 16,
      elevation: 2, // Для Android
      shadowColor: '#000', // Для iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: color.onSurface,
      marginBottom: 8,
    },
    cardDescription: {
      fontSize: 14,
      color: color.onSurfaceVariant,
    },
    fab: {
      position: 'absolute',
      right: 16,
      bottom: 16,
      backgroundColor: color.primaryContainer,
      borderRadius: 16,
      padding: 16,
      elevation: 4,
    }
  });
};