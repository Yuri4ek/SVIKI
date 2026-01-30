import { StyleSheet } from 'react-native';
import { Colors } from '@/styles/theme';

export const createProfileStyles = (theme: 'light' | 'dark') => {
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
      marginBottom: 24,
      marginTop: 40,
      paddingHorizontal: 8,
    },
    profileBadge: {
      backgroundColor: color.surfaceContainerHigh,
      padding: 24,
      borderRadius: 20,
      marginBottom: 24,
      justifyContent: 'center',
    },
    userName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: color.onSurface,
    },
    userRoleText: {
      fontSize: 15,
      color: color.primary,
      fontWeight: '600',
      marginTop: 4,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: color.outline,
      marginBottom: 12,
      marginLeft: 8,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    card: {
      backgroundColor: color.surfaceContainer,
      borderRadius: 16,
      paddingHorizontal: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: color.outlineVariant,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: color.outlineVariant,
    },
    rowLeft: {
      flex: 1,
      gap: 4,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    label: {
      fontSize: 14,
      color: color.outline,
    },
    valueText: {
      fontSize: 16,
      color: color.onSurface,
      marginTop: 2,
    },
    // Стиль для ссылки "Войти" через Госуслуги
    linkText: {
      fontSize: 15,
      color: color.primary,
      fontWeight: '600',
    },
    // Маленькая кнопка "Подтвердить"
    actionButtonSmall: {
      backgroundColor: color.primary,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    },
    actionButtonText: {
      color: color.onPrimary,
      fontSize: 13,
      fontWeight: '700',
    },
    // Стили для ввода банковских реквизитов
    inputMinimal: {
      fontSize: 16,
      color: color.onSurface,
      paddingVertical: 4,
      marginTop: 2,
    },
    logoutButton: {
      height: 56,
      backgroundColor: color.error,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    logoutButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    primaryColor: { color: color.primary },
  });
};