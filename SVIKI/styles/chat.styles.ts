// --- FILE: ./styles/chat.styles.ts ---
import { StyleSheet, Dimensions, Platform } from "react-native";
import { Colors } from "./theme";

const { width } = Dimensions.get("window");

export const createChatStyles = (theme: "light" | "dark") => {
  const color = Colors[theme];

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: color.background,
    },
    // === ТАБЫ ===
    tabBar: {
      flexDirection: "row",
      backgroundColor: color.surfaceContainer,
      marginHorizontal: 16,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 16,
      padding: 4,
    },
    tabButton: {
      flex: 1,
      paddingVertical: 8,
      alignItems: "center",
      borderRadius: 12,
    },
    activeTabButton: {
      backgroundColor: color.primary,
    },
    tabText: {
      fontSize: 12,
      fontWeight: "600",
      color: color.onSurfaceVariant,
      textAlign: "center",
    },
    activeTabText: {
      color: color.onPrimary,
      fontWeight: "bold",
    },

    // === ОСНОВНОЙ КОНТЕЙНЕР (ВАЖНО flex: 1) ===
    chatContainer: {
      flex: 1,
      backgroundColor: color.background,
    },

    // === КОМПАКТНЫЙ ХЕДЕР ===
    chatHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      // На iOS учитываем челку, на Android делаем компактнее
      paddingTop: Platform.OS === "ios" ? 50 : 10,
      paddingBottom: 10,
      backgroundColor: color.surface,
      borderBottomWidth: 1,
      borderBottomColor: color.outlineVariant,
      zIndex: 10,
      height: Platform.OS === "ios" ? 90 : 60, // Фиксированная высота
    },
    backButton: {
      marginRight: 12,
      padding: 4,
    },
    backButtonText: {
      fontSize: 22,
      color: color.onSurface,
    },
    contactName: {
      fontSize: 16,
      fontWeight: "700",
      color: color.onSurface,
    },
    statusText: {
      fontSize: 11,
      color: color.primary,
      fontWeight: "500",
    },

    // === СПИСОК СООБЩЕНИЙ ===
    messageList: {
      flex: 1,
      paddingHorizontal: 16,
    },
    bubble: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      marginBottom: 6,
      maxWidth: "78%",
      minWidth: "20%",
    },
    sentBubble: {
      backgroundColor: color.primary,
      alignSelf: "flex-end",
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      borderBottomLeftRadius: 18,
      borderBottomRightRadius: 4,
    },
    receivedBubble: {
      backgroundColor: color.surfaceContainerHigh,
      alignSelf: "flex-start",
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 18,
    },
    messageText: {
      fontSize: 15,
      lineHeight: 20,
    },
    sentText: { color: color.onPrimary },
    receivedText: { color: color.onSurface },
    timeText: {
      fontSize: 10,
      marginTop: 2,
      alignSelf: "flex-end",
    },
    sentTimeText: { color: color.primaryContainer, opacity: 0.9 },
    receivedTimeText: { color: color.outline },

    // === ПАНЕЛЬ ВВОДА (НОВЫЙ ДИЗАЙН) ===
    inputWrapper: {
      width: "100%",
      backgroundColor: color.background,
      paddingTop: 8,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginHorizontal: 16, // Отступы по бокам
      marginBottom: 12, // Отступ снизу
      borderRadius: 24, // Скругление как у табов
      backgroundColor: color.surfaceContainer,
      paddingVertical: 6,
      paddingHorizontal: 6,
      // Тени
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    input: {
      flex: 1,
      backgroundColor: color.surface,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 8,
      marginHorizontal: 8,
      fontSize: 15,
      color: color.onSurface,
      maxHeight: 100,
    },
    iconButton: {
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 1,
    },
    sendIcon: {
      color: color.primary,
      fontSize: 22,
      fontWeight: "bold",
    },
    attachIcon: {
      color: color.onSurfaceVariant,
      fontSize: 24,
    },

    // === СТИЛИ ДЛЯ СПИСКА КОНТАКТОВ (АДМИН) ===
    contactItem: {
      flexDirection: "row",
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: color.outlineVariant,
      alignItems: "center",
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: color.primaryContainer,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    avatarText: {
      fontSize: 18,
      fontWeight: "bold",
      color: color.onPrimaryContainer,
    },
    contactInfo: { flex: 1 },
    contactNameText: {
      fontSize: 16,
      fontWeight: "600",
      color: color.onSurface,
    },
    lastMessage: {
      fontSize: 13,
      color: color.onSurfaceVariant,
      marginTop: 2,
    },
  });
};
