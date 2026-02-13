import React, { useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";

// 1. Элемент списка контактов
export const ContactItem = ({ item, onPress, styles }: any) => (
  <TouchableOpacity
    style={styles.contactItem}
    onPress={() => onPress(item.name)}
    activeOpacity={0.7}
  >
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{item.avatar}</Text>
    </View>
    <View style={styles.contactInfo}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.contactNameText}>{item.name}</Text>
        {item.unread > 0 && (
          <View
            style={{
              backgroundColor: "red",
              borderRadius: 10,
              paddingHorizontal: 6,
              paddingVertical: 2,
            }}
          >
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              {item.unread}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.lastMessage} numberOfLines={1}>
        {item.lastMsg}
      </Text>
    </View>
  </TouchableOpacity>
);

// 2. Интерфейс для пропсов (Добавляем его, чтобы пропала ошибка)
export interface ChatUIProps {
  messages: any[];
  onSend: (text: string) => void;
  styles: any;
  headerTitle?: string;
  onBack?: () => void;
  showBackBtn?: boolean;
}

// 3. Основной компонент Чата
export const ChatUI = ({
  messages,
  onSend,
  styles,
  headerTitle,
  onBack,
  showBackBtn,
}: ChatUIProps) => {
  const [text, setText] = React.useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Стабилизация массива сообщений
  const stableMessages = useMemo(() => messages || [], [messages]);

  return (
    <View style={styles.chatContainer}>
      {/* Хедер */}
      {headerTitle && (
        <View style={styles.chatHeader}>
          {showBackBtn && (
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          )}
          <View>
            <Text style={styles.contactName}>{headerTitle}</Text>
            <Text style={styles.statusText}>В сети</Text>
          </View>
        </View>
      )}
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            data={stableMessages}
            keyExtractor={(item) =>
              item.id ? item.id.toString() : Math.random().toString()
            }
            inverted={true}
            contentContainerStyle={{
              paddingVertical: 16,
              paddingHorizontal: 16,
            }}
            keyboardDismissMode="on-drag"
            renderItem={({ item }) => {
              const isMy = item.isMy;
              return (
                <View
                  style={[
                    styles.bubble,
                    isMy ? styles.sentBubble : styles.receivedBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      isMy ? styles.sentText : styles.receivedText,
                    ]}
                  >
                    {item.text || item.content}
                  </Text>
                  <Text
                    style={[
                      styles.timeText,
                      isMy ? styles.sentTimeText : styles.receivedTimeText,
                    ]}
                  >
                    {formatTime(item.sentAt)}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        {/* Панель ввода */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.attachIcon}>+</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Сообщение..."
              placeholderTextColor="#999"
              value={text}
              onChangeText={setText}
              multiline
            />

            <TouchableOpacity
              style={[styles.iconButton, { opacity: text.trim() ? 1 : 0.5 }]}
              onPress={handleSend}
              disabled={!text.trim()}
            >
              <Text style={styles.sendIcon}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// 4. Обертка (Overlay) для сотрудников
export const ChatOverlay = ({
  user,
  messages,
  onClose,
  onSend,
  styles,
}: any) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: "#fff",
      }}
    >
      <ChatUI
        messages={messages}
        onSend={onSend}
        styles={styles}
        headerTitle={user}
        showBackBtn={true}
        onBack={onClose}
      />
    </View>
  );
};
