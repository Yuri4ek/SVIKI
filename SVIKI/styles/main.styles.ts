import { StyleSheet } from 'react-native';
import { Colors } from './theme';

export const createMainStyles = (theme: 'light' | 'dark') => {
  const color = Colors[theme];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.background,
    },
    scrollContent: {
      padding: 16,
      paddingBottom: 40,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: color.onSurface,
      marginBottom: 8,
      marginTop: 40,
      paddingHorizontal: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: color.onSurface,
      marginBottom: 12,
      marginTop: 20,
      marginLeft: 8,
    },
    card: {
      backgroundColor: color.surfaceContainer,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: color.outlineVariant,
    },
    // Исправленные имена для соответствия main.tsx
    scoreGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    scoreItem: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: color.secondaryContainer,
      padding: 12,
      borderRadius: 12,
    },
    scoreValue: {
      fontSize: 22,
      fontWeight: 'bold',
      color: color.onSecondaryContainer,
    },
    scoreLabel: {
      fontSize: 12,
      color: color.onSecondaryContainer,
      opacity: 0.8,
      marginTop: 4,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
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
      fontWeight: '600',
      color: color.onSurface,
      textAlign: 'right',
      flex: 1,
    },
    statusPositive: { color: '#10b981' },
    statusNegative: { color: color.error },
    
    // Стили для модального окна
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: color.background,
      borderRadius: 20,
      padding: 24,
      elevation: 5,
    },
    mainButton: {
      height: 50,
      backgroundColor: color.primary,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    mainButtonText: {
      color: color.onPrimary,
      fontSize: 16,
      fontWeight: '600',
    }
  });
};