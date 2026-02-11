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
import { createProgramsStyles } from "@/styles/programs.styles";
import { useUserStore } from "@/store";
import {
  fetchServiceTable,
  updateServiceTableItem,
  IServiceTableItem,
} from "@/api/tableService";

type ProgramType = "Initial" | "Standard" | "Optimal";

export default function ProgramsScreen() {
  const theme = useColorScheme() ?? "light";
  const styles = useMemo(() => createProgramsStyles(theme), [theme]);
  const { role } = useUserStore();

  const canEdit = role === "Admin" || role === "Manager";

  const [tableData, setTableData] = useState<IServiceTableItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Активная вкладка
  const [activeTab, setActiveTab] = useState<ProgramType>("Standard");

  const [editedData, setEditedData] = useState<
    Record<number, IServiceTableItem>
  >({});

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
          const updatedItem = { ...item, [field]: text };
          setEditedData((prevEdited) => ({ ...prevEdited, [id]: updatedItem }));
          return updatedItem;
        }
        return item;
      }),
    );
  };

  const saveChanges = async () => {
    try {
      setSaving(true);
      const updates = Object.values(editedData);
      await Promise.all(
        updates.map((item) => updateServiceTableItem(item.id, item)),
      );
      setEditedData({});
      Alert.alert("Успех", "Изменения сохранены");
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось сохранить");
    } finally {
      setSaving(false);
    }
  };

  // Рендер одной строки таблицы
  const renderRow = (item: IServiceTableItem, index: number) => {
    // Определяем, какое поле показывать во второй колонке
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
        style={[styles.row, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}
      >
        {/* КОЛОНКА 1: Название услуги */}
        <View style={styles.columnService}>
          {canEdit ? (
            <TextInput
              style={[styles.input, styles.inputTitle]}
              value={item.serviceColumn}
              multiline
              onChangeText={(text) =>
                handleTextChange(item.id, "serviceColumn", text)
              }
            />
          ) : (
            <Text style={styles.cellTextTitle}>{item.serviceColumn}</Text>
          )}
        </View>

        {/* КОЛОНКА 2: Значение для выбранной программы */}
        <View style={styles.columnValue}>
          {canEdit ? (
            <TextInput
              style={styles.input}
              value={value}
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
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const TABS: ProgramType[] = ["Initial", "Standard", "Optimal"];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Программы Восстановления</Text>

        {/* Кнопка сохранения (для админа) */}
        {canEdit && Object.keys(editedData).length > 0 && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveChanges}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Сохранить</Text>
            )}
          </TouchableOpacity>
        )}

        {/* ТАБЫ */}
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

      {/* ИСПРАВЛЕНИЕ: 
          1. Убрали stickyHeaderIndices (так как шапка уже вынесена наверх)
          2. Добавили style={{ flex: 1 }}, чтобы скролл работал на всю высоту
      */}
      <ScrollView style={{ flex: 1 }}>
        {/* Контент таблицы */}
        <View style={{ paddingBottom: 40 }}>
          {tableData.map((item, index) => renderRow(item, index))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
