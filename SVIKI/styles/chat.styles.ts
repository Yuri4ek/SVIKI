import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from './theme';

const { width } = Dimensions.get('window');

export const createChatStyles = (theme: 'light' | 'dark') => {
  const color = Colors[theme];

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: color.background,
    },
    // === ТАБЫ (ВЕРХНЕЕ МЕНЮ) ===
    tabBar: {
      flexDirection: 'row',
      backgroundColor: color.surfaceContainer,
      marginHorizontal: 16,
      marginTop: 8,
      marginBottom: 16,
      borderRadius: 16,
      padding: 4,
    },
    tabButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 12,
    },
    activeTabButton: {
      backgroundColor: color.primary,
      shadowColor: color.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    tabText: {
      fontSize: 13,
      fontWeight: '600',
      color: color.onSurfaceVariant,
    },
    activeTabText: {
      color: color.onPrimary,
      fontWeight: 'bold',
    },
    
    // === СПИСОК КОНТАКТОВ ===
    pager: {
      flex: 1,
      width: width * 3, // Для 3-х вкладок, если используется
      flexDirection: 'row',
    },
    page: {
      width: width,
      flex: 1,
    },
    contactItem: {
      flexDirection: 'row',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: color.outlineVariant, // Более тонкий разделитель
      alignItems: 'center',
      backgroundColor: color.background,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: color.primaryContainer,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    avatarText: {
      color: color.onPrimaryContainer,
      fontSize: 20,
      fontWeight: 'bold',
    },
    contactInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    contactName: {
      fontSize: 17,
      fontWeight: '600',
      color: color.onSurface,
      marginBottom: 4,
    },
    lastMessage: {
      fontSize: 14,
      color: color.onSurfaceVariant,
    },

    // === ОКНО ЧАТА (OVERLAY) ===
    chatOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: color.surfaceContainerLowest, // Светлее фона
      zIndex: 50,
    },
    chatHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: Platform.OS === 'ios' ? 50 : 16, // Учитываем челку
      paddingBottom: 16,
      backgroundColor: color.surface,
      borderBottomWidth: 1,
      borderBottomColor: color.outlineVariant,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    backButton: {
      marginRight: 16,
      padding: 8,
    },
    backButtonText: {
      fontSize: 24,
      color: color.onSurface,
    },

    // === СООБЩЕНИЯ (ПУЗЫРЬКИ) ===
    messageList: {
      flex: 1,
      paddingHorizontal: 16, 
    },
    bubble: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginBottom: 8,
      maxWidth: '80%',
      minWidth: '20%',
    },
    // Стиль моих сообщений (справа, фиолетовые)
    sentBubble: {
      backgroundColor: color.primary,
      alignSelf: 'flex-end',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 4, // "Хвостик" справа внизу
    },
    // Стиль чужих сообщений (слева, серые)
    receivedBubble: {
      backgroundColor: color.surfaceContainerHigh,
      alignSelf: 'flex-start',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 4, // "Хвостик" слева внизу
      borderBottomRightRadius: 20,
    },
    messageText: {
      fontSize: 16,
      lineHeight: 22,
    },
    sentText: {
      color: color.onPrimary,
    },
    receivedText: {
      color: color.onSurface,
    },
    timeText: {
      fontSize: 11,
      marginTop: 4,
      alignSelf: 'flex-end',
    },
    sentTimeText: {
      color: color.primaryContainer, // Светлый текст на темном фоне
      opacity: 0.8,
    },
    receivedTimeText: {
      color: color.outline,
    },

    // === ПОЛЕ ВВОДА ===
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end', // Чтобы кнопка была внизу при многострочном вводе
      paddingHorizontal: 12,
      paddingVertical: 12,
      backgroundColor: color.surface,
      borderTopWidth: 1,
      borderTopColor: color.outlineVariant,
    },
    input: {
      flex: 1,
      backgroundColor: color.surfaceContainerHigh,
      borderRadius: 24,
      paddingHorizontal: 20,
      paddingTop: 12, // Для multiline
      paddingBottom: 12,
      marginHorizontal: 8,
      fontSize: 16,
      color: color.onSurface,
      maxHeight: 120, // Ограничение высоты
    },
    iconButton: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendIcon: {
      color: color.primary,
      fontSize: 24,
      fontWeight: 'bold',
    },
    attachIcon: {
      color: color.onSurfaceVariant,
      fontSize: 24,
    }
  });
};