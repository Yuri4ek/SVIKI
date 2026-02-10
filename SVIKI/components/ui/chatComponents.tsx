// --- FILE: ./components/ui/chatComponents.tsx ---
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { MessageModel } from "@/api/chatService";

// Единичный элемент списка контактов
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
         <Text style={styles.contactName}>{item.name}</Text>
         {item.unread > 0 && (
           <View style={{backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2}}>
             <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>{item.unread}</Text>
           </View>
         )}
      </View>
      <Text style={styles.lastMessage} numberOfLines={1}>
        {item.lastMsg}
      </Text>
    </View>
  </TouchableOpacity>
);

interface ChatOverlayProps {
  user: string;
  messages: MessageModel[]; // Используем типизацию
  onClose: () => void;
  onSend: (text: string) => void;
  styles: any;
}

// Окно активного чата (Overlay)
export const ChatOverlay = ({ user, messages, onClose, onSend, styles }: ChatOverlayProps) => {
  const [text, setText] = React.useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  // Функция для форматирования времени
  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.chatOverlay}>
      {/* Хедер */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
           {/* Можно заменить на иконку Ionicons */}
          <Text style={styles.backButtonText}>←</Text> 
        </TouchableOpacity>
        <View>
          <Text style={styles.contactName}>{user}</Text>
          <Text style={{fontSize: 12, color: '#888'}}>В сети</Text>
        </View>
      </View>

      {/* Список сообщений */}
      <View style={styles.messageList}>
        <FlashList
          data={messages}
          estimatedItemSize={60}
          inverted={true} // !!! ВАЖНО: Список перевернут (новые снизу)
          contentContainerStyle={{ paddingVertical: 16 }}
          renderItem={({ item }: { item: any }) => {
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
                {/* Время сообщения */}
                <Text style={[
                  styles.timeText,
                  isMy ? styles.sentTimeText : styles.receivedTimeText
                ]}>
                  {formatTime(item.sentAt)}
                </Text>
              </View>
            );
          }}
        />
      </View>

      {/* Поле ввода */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
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
      </KeyboardAvoidingView>
    </View>
  );
};