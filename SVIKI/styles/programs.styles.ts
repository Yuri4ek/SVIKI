import { StyleSheet, Platform } from "react-native";
import { Colors } from "@/styles/theme";

export const createProgramsStyles = (theme: "light" | "dark") => {
  const color = Colors[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.background,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    headerContainer: {
      paddingTop: Platform.OS === "ios" ? 60 : 20, // Отступ под статусбар
      paddingHorizontal: 16,
      paddingBottom: 12,
      backgroundColor: color.background,
      zIndex: 10,
    },
    screenTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: color.onSurface,
      marginBottom: 16,
      textAlign: "center",
    },

    // === КНОПКИ ВЫБОРА ПРОГРАММЫ (В один ряд) ===
    tabBar: {
      flexDirection: "row",
      backgroundColor: color.surfaceContainer, // Серый фон подложки
      borderRadius: 12,
      padding: 4,
      marginBottom: 8,
    },
    tabButton: {
      flex: 1, // Растягиваем кнопки равномерно
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    activeTabButton: {
      backgroundColor: color.primary, // Активная кнопка цветная
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    tabText: {
      fontSize: 12, // Чуть меньше, чтобы влезло
      fontWeight: "600",
      color: color.onSurfaceVariant,
    },
    activeTabText: {
      color: color.onPrimary, // Белый текст на активной кнопке
      fontWeight: "bold",
    },

    // === ТАБЛИЦА (Возвращаем табличный вид) ===
    tableHeader: {
      flexDirection: "row",
      backgroundColor: color.surfaceContainerHigh,
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: 8,
    },
    headerText: {
      fontSize: 13,
      fontWeight: "bold",
      color: color.onSurface,
    },

    // Строки таблицы
    row: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: color.outlineVariant,
      minHeight: 50, // Минимальная высота строки
      alignItems: "center",
    },
    rowEven: {
      backgroundColor: color.background,
    },
    rowOdd: {
      backgroundColor: color.surfaceContainerLow, // Чередование цветов
    },

    // Колонки
    columnService: {
      flex: 1.5, // Колонка с названием услуги шире
      padding: 10,
      borderRightWidth: 1,
      borderRightColor: color.outlineVariant,
    },
    columnValue: {
      flex: 1, // Колонка со значением
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
    },

    // Тексты в ячейках
    cellTextTitle: {
      fontSize: 13,
      color: color.onSurface,
      fontWeight: "500",
    },
    cellTextValue: {
      fontSize: 13,
      color: color.onSurfaceVariant,
      textAlign: "center",
    },

    // Поля ввода (для админа)
    input: {
      backgroundColor: color.surface,
      borderWidth: 1,
      borderColor: color.outline,
      borderRadius: 4,
      padding: 4,
      fontSize: 12,
      color: color.onSurface,
      width: "100%",
      textAlign: "center",
    },
    inputTitle: {
      textAlign: "left",
    },

    // Кнопка сохранить
    saveButton: {
      position: "absolute",
      right: 16,
      top: Platform.OS === "ios" ? 60 : 20,
      backgroundColor: color.primary,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
    },
    saveButtonText: {
      color: color.onPrimary,
      fontWeight: "bold",
      fontSize: 12,
    },
  });
};
