import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from './theme';

const { width } = Dimensions.get('window');

export const createChatStyles = (theme: 'light' | 'dark') => {
  const color = Colors[theme];
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: color.background,
    },
    // Верхняя навигация между окнами
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
    // Контейнер для свайпа
    pager: {
      flex: 1,
      width: width * 3,
      flexDirection: 'row',
    },
    page: {
      width: width,
      flex: 1,
    },
    // Список контактов
    contactItem: {
      flexDirection: 'row',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: color.outlineVariant,
      alignItems: 'center',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: color.secondaryContainer,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    avatarText: {
      color: color.onSecondaryContainer,
      fontWeight: 'bold',
    },
    contactInfo: {
      flex: 1,
    },
    contactName: {
      fontSize: 16,
      fontWeight: '600',
      color: color.onSurface,
      marginBottom: 4,
    },
    lastMessage: {
      fontSize: 14,
      color: color.onSurfaceVariant,
    },
    // Окно самого чата (Overlay)
    chatOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: color.background,
      zIndex: 10,
    },
    chatHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      paddingTop: 40,
      backgroundColor: color.surfaceContainerHigh,
    },
    backButton: {
      marginRight: 16,
    },
    // Сообщения
    messageList: {
      flex: 1,
      padding: 16,
    },
    bubble: {
      padding: 12,
      borderRadius: 16,
      marginBottom: 8,
      maxWidth: '80%',
    },
    sentBubble: {
      backgroundColor: color.primary,
      alignSelf: 'flex-end',
      borderBottomRightRadius: 4,
    },
    receivedBubble: {
      backgroundColor: color.surfaceContainerHighest,
      alignSelf: 'flex-start',
      borderBottomLeftRadius: 4,
    },
    messageText: {
      fontSize: 15,
    },
    sentText: {
      color: color.onPrimary,
    },
    receivedText: {
      color: color.onSurface,
    },
    // Поле ввода
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderTopWidth: 1,
      borderTopColor: color.outlineVariant,
      backgroundColor: color.surface,
    },
    input: {
      flex: 1,
      backgroundColor: color.surfaceContainerLow,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginHorizontal: 8,
      color: color.onSurface,
    },
    iconButton: {
      padding: 8,
    }
  });
};