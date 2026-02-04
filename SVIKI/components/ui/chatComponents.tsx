import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { FlashList } from "@shopify/flash-list";

// Единичный элемент списка контактов
export const ContactItem = ({ item, onPress, styles }: any) => (
  <TouchableOpacity
    style={styles.contactItem}
    onPress={() => onPress(item.name)}
  >
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{item.avatar}</Text>
    </View>
    <View style={styles.contactInfo}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.lastMessage} numberOfLines={1}>
        {item.lastMsg}
      </Text>
    </View>
  </TouchableOpacity>
);

// Окно активного чата (Overlay)
export const ChatOverlay = ({ user, messages, onClose, styles }: any) => (
  <View style={styles.chatOverlay}>
    <View style={styles.chatHeader}>
      <TouchableOpacity onPress={onClose} style={styles.backButton}>
        <Text style={{ color: styles.tabText.color, fontSize: 18 }}>←</Text>
      </TouchableOpacity>
      <Text style={styles.contactName}>{user}</Text>
    </View>

    <View style={styles.messageList}>
      <FlashList
        data={messages}
        estimatedItemSize={60}
        // ИСПРАВЛЕНИЕ: Явно указываем тип { item: any }
        renderItem={({ item }: { item: any }) => (
          <View
            style={[
              styles.bubble,
              item.isMy ? styles.sentBubble : styles.receivedBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.isMy ? styles.sentText : styles.receivedText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
      />
    </View>

    <View style={styles.inputContainer}>
      <TouchableOpacity style={styles.iconButton}>
        <Text style={{ fontSize: 20 }}>📎</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Сообщение..."
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.iconButton}>
        <Text style={{ fontSize: 20 }}>➡️</Text>
      </TouchableOpacity>
    </View>
  </View>
);