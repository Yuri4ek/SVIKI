import { StyleSheet } from 'react-native';
import { Colors } from '@/styles/theme'; 

export const createSettingsStyles = (theme: 'light' | 'dark') => {
  const currentColors = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentColors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    headerSection: {
      marginBottom: 32,
      alignItems: 'flex-start',
    },
    appTitle: {
      fontSize: 32,
      fontWeight: '700',
      color: currentColors.primary,
      letterSpacing: 2,
    },
    appDescription: {
      fontSize: 14,
      // Заменено: обычно это onSurface или onSurfaceVariant
      color: currentColors.onSurface, 
      marginTop: 8,
      lineHeight: 20,
      opacity: 0.8,
    },
    section: {
      // Используем surfaceContainer из M3, если он есть, 
      // либо рассчитываем на основе surface
      backgroundColor: currentColors.surfaceVariant || currentColors.secondaryContainer,
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: currentColors.outlineVariant || currentColors.outline,
    },
    label: {
      fontSize: 16,
      color: currentColors.onSurface,
      fontWeight: '500',
    },
    value: {
      fontSize: 16,
      color: currentColors.onSurfaceVariant || currentColors.onSurface,
      opacity: 0.7,
    },
    developerSection: {
      marginTop: 'auto',
      marginBottom: 24,
      alignItems: 'center',
    },
    developerLabel: {
      fontSize: 12,
      color: currentColors.onSurface,
      opacity: 0.5,
      marginBottom: 4,
      textTransform: 'uppercase',
    },
    developerText: {
      fontSize: 14,
      color: currentColors.primary,
      fontWeight: '600',
    },
    logoutButton: {
      // В M3 для ошибок используется errorContainer
      backgroundColor: currentColors.errorContainer, 
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    logoutText: {
      color: currentColors.onErrorContainer,
      fontSize: 16,
      fontWeight: '600',
    },
  });
};