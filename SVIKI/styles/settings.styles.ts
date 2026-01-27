import { StyleSheet } from 'react-native';
import { Colors } from '@/styles/theme';

export const createSettingsStyles = (theme: 'light' | 'dark') => {
  const color = Colors[theme];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.background,
      paddingHorizontal: 20,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 32,
      textAlign: 'left',
      color: color.onSurface,
    },
    infoBox: {
      padding: 24,
      backgroundColor: color.surfaceContainer,
      borderRadius: 28,
      marginBottom: 32,
      borderWidth: 1,
      borderColor: color.outlineVariant,
    },
    text: {
      fontSize: 16,
      color: color.onSurfaceVariant,
      marginBottom: 8,
    },
    label: {
      fontWeight: '700',
      color: color.onSurface,
    },
    logoutButton: {
      backgroundColor: color.errorContainer,
      paddingVertical: 18,
      borderRadius: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: color.error,
    },
    logoutText: {
      color: color.onErrorContainer,
      fontWeight: '600',
      fontSize: 16,
    },
  });
};