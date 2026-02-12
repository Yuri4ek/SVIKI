import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createProgramsStyles } from "@/styles/programs.styles";
import { useUserStore } from "@/store";
import {
  fetchServiceTable,
  updateServiceTableItem,
  createServiceTableItem,
  deleteServiceTableItem,
  IServiceTableItem,
} from "@/api";

type ProgramType = "Initial" | "Standard" | "Optimal";

export default function ProgramsScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = useMemo(() => createProgramsStyles(theme), [theme]);
  const { role } = useUserStore();

  const canEdit = role === "Admin" || role === "Manager";

  const [tableData, setTableData] = useState<IServiceTableItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<ProgramType>("Standard");

  // Цвета и стили
  const isDark = theme === "dark";
  const borderColor = isDark ? "#444" : "#ddd";
  // Безопасно получаем цвет, если он не определен в стилях
  const dashedColor =
    (styles.saveButton && styles.saveButton.backgroundColor) || "#6200ee";

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchServiceTable();
      setTableData(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Ошибка", "Не удалось загрузить данные");
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (
    id: number,
    field: keyof IServiceTableItem,
    text: string,
  ) => {
    setTableData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: text, isEdited: !item.isNew };
        }
        return item;
      }),
    );
  };

  const handleAddRow = () => {
    const newItem: IServiceTableItem = {
      id: Date.now(),
      serviceColumn: "",
      initialColumn: "",
      standardColumn: "",
      optimalColumn: "",
      isNew: true,
    };
    setTableData((prev) => [...prev, newItem]);
  };

  const handleDeleteRow = (id: number, isNew?: boolean) => {
    Alert.alert("Удаление", "Вы уверены, что хотите удалить этот параметр?", [
      { text: "Отмена", style: "cancel" },
      {
        text: "Удалить",
        style: "destructive",
        onPress: async () => {
          if (isNew) {
            setTableData((prev) => prev.filter((item) => item.id !== id));
          } else {
            try {
              setSaving(true);
              await deleteServiceTableItem(id);
              setTableData((prev) => prev.filter((item) => item.id !== id));
            } catch (error) {
              Alert.alert("Ошибка", "Не удалось удалить запись");
            } finally {
              setSaving(false);
            }
          }
        },
      },
    ]);
  };

  const saveChanges = async () => {
    try {
      setSaving(true);
      const itemsToCreate = tableData.filter((i) => i.isNew);
      const itemsToUpdate = tableData.filter((i) => i.isEdited && !i.isNew);

      if (itemsToCreate.length === 0 && itemsToUpdate.length === 0) {
        Alert.alert("Информация", "Нет изменений для сохранения");
        return;
      }

      for (const item of itemsToCreate) {
        await createServiceTableItem(item);
      }
      for (const item of itemsToUpdate) {
        await updateServiceTableItem(item.id, item);
      }

      Alert.alert("Успех", "Все изменения сохранены");
      await loadData();
    } catch (error) {
      console.error(error);
      Alert.alert("Ошибка", "Не удалось сохранить");
    } finally {
      setSaving(false);
    }
  };

  const renderRow = (item: IServiceTableItem, index: number) => {
    let value = "";
    let fieldName: keyof IServiceTableItem = "initialColumn";

    switch (activeTab) {
      case "Initial":
        value = item.initialColumn;
        fieldName = "initialColumn";
        break;
      case "Standard":
        value = item.standardColumn;
        fieldName = "standardColumn";
        break;
      case "Optimal":
        value = item.optimalColumn;
        fieldName = "optimalColumn";
        break;
    }

    return (
      <View
        key={item.id}
        style={[
          styles.row,
          index % 2 === 0 ? styles.rowEven : styles.rowOdd,
          { flexDirection: "row", alignItems: "stretch", paddingVertical: 8 },
        ]}
      >
        {/* КОЛОНКА 1: Название услуги */}
        <View
          style={[
            styles.columnService,
            {
              flex: 1.2,
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 8,
            },
          ]}
        >
          {canEdit && (
            <TouchableOpacity
              onPress={() => handleDeleteRow(item.id, item.isNew)}
              style={{ padding: 6, marginRight: 4 }}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color="red"
                opacity={0.7}
              />
            </TouchableOpacity>
          )}

          {canEdit ? (
            <TextInput
              style={[
                styles.input,
                styles.inputTitle,
                { flex: 1, minHeight: 40, textAlignVertical: "center" },
              ]}
              value={item.serviceColumn}
              placeholder="Название услуги..."
              multiline={true}
              onChangeText={(text) =>
                handleTextChange(item.id, "serviceColumn", text)
              }
            />
          ) : (
            <Text style={[styles.cellTextTitle, { flex: 1 }]}>
              {item.serviceColumn}
            </Text>
          )}
        </View>

        {/* Разделитель */}
        <View style={{ width: 1, backgroundColor: borderColor }} />

        {/* КОЛОНКА 2: Значение */}
        <View
          style={[
            styles.columnValue,
            {
              flex: 1,
              justifyContent: "center",
              paddingLeft: 8,
            },
          ]}
        >
          {canEdit ? (
            <TextInput
              style={[
                styles.input,
                {
                  flex: 1,
                  width: "100%",
                  minHeight: 40,
                  textAlignVertical: "center",
                },
              ]}
              value={value}
              placeholder="Значение..."
              multiline={true}
              onChangeText={(text) =>
                handleTextChange(item.id, fieldName, text)
              }
            />
          ) : (
            <Text style={styles.cellTextValue}>{value || "-"}</Text>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const TABS: ProgramType[] = ["Initial", "Standard", "Optimal"];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { flex: 1 }]}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Программы Восстановления</Text>
        <View style={styles.tabBar}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, isActive && styles.activeTabButton]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[styles.tabText, isActive && styles.activeTabText]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 150 }}
        keyboardShouldPersistTaps="handled"
      >
        <View>{tableData.map((item, index) => renderRow(item, index))}</View>

        {canEdit && (
          <View style={{ padding: 16, marginTop: 10 }}>
            {/* 1. Кнопка Добавить */}
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: dashedColor,
                borderStyle: "dashed",
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: "center",
                backgroundColor: "transparent",
                marginBottom: 20, // ВАЖНО: Отступ снизу, чтобы не слипались
              }}
              onPress={handleAddRow}
            >
              <Text
                style={{ color: dashedColor, fontWeight: "600", fontSize: 16 }}
              >
                + Добавить параметр
              </Text>
            </TouchableOpacity>

            {/* 2. Кнопка Сохранить */}
            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  // ВАЖНО: Сбрасываем абсолютное позиционирование из стилей
                  position: "relative",
                  top: "auto",
                  right: "auto",
                  bottom: "auto",

                  width: "100%",
                  height: 50,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: saving ? 0.7 : 1,
                  marginTop: 0,
                },
              ]}
              onPress={saveChanges}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={[
                    styles.saveButtonText,
                    { fontSize: 16, fontWeight: "bold" },
                  ]}
                >
                  Сохранить изменения
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
