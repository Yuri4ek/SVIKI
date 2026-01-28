import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from './theme';

const { width } = Dimensions.get('window');

export const createUsersStyles = (theme: 'light' | 'dark') => {
  const color = Colors[theme];
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: color.background,
    },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: color.surfaceContainer,
      margin: 16,
      borderRadius: 12,
      padding: 4,
    },
    tabButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 8,
    },
    activeTabButton: {
      backgroundColor: color.primaryContainer,
    },
    tabText: {
      fontSize: 12,
      fontWeight: '600',
      color: color.onSurfaceVariant,
    },
    activeTabText: {
      color: color.onPrimaryContainer,
    },
    pager: {
      flex: 1,
    },
    page: {
      width: width,
      paddingHorizontal: 16,
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
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: color.outlineVariant,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: color.onSurface,
    },
    totalCount: {
      fontSize: 12,
      color: color.onSurfaceVariant,
    },
    // Стили «Таблицы» для мобилки
    userRow: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: color.outlineVariant,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    userInfoGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    userId: {
      fontSize: 12,
      fontWeight: '700',
      color: color.primary,
    },
    userName: {
      fontSize: 14,
      fontWeight: '600',
      color: color.onSurface,
    },
    userSubInfo: {
      fontSize: 12,
      color: color.onSurfaceVariant,
    },
    progressTrack: {
      height: 4,
      backgroundColor: color.surfaceVariant,
      borderRadius: 2,
      marginTop: 8,
      width: '100%',
    },
    progressFill: {
      height: '100%',
      backgroundColor: color.primary,
      borderRadius: 2,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 8,
    },
    pageIndicator: {
      backgroundColor: color.primary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    pageIndicatorText: {
      color: color.onPrimary,
      fontSize: 12,
      fontWeight: 'bold',
    }
  });
};