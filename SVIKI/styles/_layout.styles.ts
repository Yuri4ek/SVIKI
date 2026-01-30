import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/styles/theme';

export const createLayoutStyles = (theme: 'light' | 'dark') => {
  const color = Colors[theme];

  return StyleSheet.create({
    tabBar: {
      height: Platform.OS === 'ios' ? 94 : 84, 
      backgroundColor: 'transparent', 
      borderTopWidth: 0,
      elevation: 0,
      shadowColor: 'transparent',
      paddingTop: 8,
    },
    floatingBackground: {
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? 28 : 12,
      left: 16,
      right: 16,
      height: 64,
      borderRadius: 24,
      backgroundColor: color.surfaceContainer, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    },
    sceneContainer: {
      backgroundColor: color.background,
    },
    tabBarLabel: {
      fontSize: 11,
      fontWeight: '600',
      marginBottom: Platform.OS === 'ios' ? 0 : 8,
    },
    tabBarItem: {
      height: 64,
    }
  });
};