// --- FILE: ./app/(main)/chat.tsx ---
import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
  ActivityIndicator,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createChatStyles } from "@/styles";
import { RoleGuard } from "@/components";
import {
  ChatOverlay,
  ContactItem,
  ChatUI,
} from "@/components/ui/chatComponents";
import { chatService, ChatContact, MessageModel } from "@/api/chatService";

const { width } = Dimensions.get("window");

// ==========================================
// 1. ВИД ДЛЯ СОТРУДНИКОВ
// ==========================================
const StaffChatView = ({ styles, userRole }: any) => {
  const [allContacts, setAllContacts] = useState<ChatContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ChatContact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(
    null,
  );
  const [messages, setMessages] = useState<MessageModel[]>([]);

  useEffect(() => {
    loadContacts();
  }, [userRole]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredContacts(allContacts);
    } else {
      const lower = searchQuery.toLowerCase();
      setFilteredContacts(
        allContacts.filter((c) => c.name.toLowerCase().includes(lower)),
      );
    }
  }, [searchQuery, allContacts]);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await chatService.getContacts(userRole);
      setAllContacts(data || []);
      setFilteredContacts(data || []);
    } catch (e) {
      setAllContacts([]);
      setFilteredContacts([]);
    } finally {
      setLoading(false);
    }
  };

  // --- ИСПРАВЛЕНИЕ 1: Вычисляем isMy при открытии чата ---
  const handleContactPress = async (contact: ChatContact) => {
    setSelectedContact(contact);
    try {
      const history = await chatService.getChatHistory(contact.receiverId);

      // Маппинг сообщений:
      // Если отправитель (msg.senderId) НЕ равен ID контакта (contact.receiverId),
      // значит отправитель - это Я.
      const processedMessages = history.messages.map((msg) => ({
        ...msg,
        isMy: msg.senderId !== contact.receiverId,
      }));

      setMessages([...processedMessages].reverse());
    } catch (error) {
      setMessages([]);
    }
  };

  const handleSend = async (text: string) => {
    if (!selectedContact) return;
    const tempMsg: MessageModel = {
      id: Date.now(),
      content: text,
      senderId: 0,
      receiverId: selectedContact.receiverId,
      sentAt: new Date().toISOString(),
      isRead: false,
      isMy: true, // Локальное сообщение всегда мое
    };
    setMessages((prev) => [tempMsg, ...prev]);

    try {
      await chatService.sendMessage(
        selectedContact.receiverId,
        text,
        null,
        selectedContact.dialogId,
      );
    } catch (e) {}
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
        <TextInput
          style={{
            backgroundColor: styles.tabBar.backgroundColor,
            padding: 10,
            borderRadius: 12,
            color: "#000",
            fontSize: 14,
          }}
          placeholder="Поиск..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.receiverId.toString()}
          renderItem={({ item }) => (
            <ContactItem
              item={{
                name: item.name,
                lastMsg: item.lastMessage || "Нет сообщений",
                avatar: item.name.charAt(0).toUpperCase(),
                unread: item.unreadCount,
              }}
              onPress={() => handleContactPress(item)}
              styles={styles}
            />
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Контакты не найдены
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {selectedContact && (
        <ChatOverlay
          user={selectedContact.name}
          messages={messages}
          onClose={() => setSelectedContact(null)}
          onSend={handleSend}
          styles={styles}
        />
      )}
    </View>
  );
};

// ==========================================
// 2. ИЗОЛИРОВАННЫЙ КОМПОНЕНТ КОМНАТЫ ЧАТА
// ==========================================
const ChatRoomWrapper = ({ role, styles }: { role: string; styles: any }) => {
  const [contact, setContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const initRoom = async () => {
      try {
        const contacts = await chatService.getContacts("Client");

        let found: ChatContact | undefined;
        if (role === "Агент") found = contacts[0];
        else if (role === "Юрист") found = contacts[1];
        else if (role === "Менеджер") found = contacts[2];
        else if (role === "Админ") found = contacts[3];

        if (isMounted && found) {
          setContact(found);
          try {
            const history = await chatService.getChatHistory(found.receiverId);

            // --- ИСПРАВЛЕНИЕ 2: Вычисляем isMy для Клиента ---
            const processedMessages = history.messages.map((msg) => ({
              ...msg,
              isMy: msg.senderId !== found!.receiverId, // Используем найденный ID контакта
            }));

            setMessages([...processedMessages].reverse());
          } catch (e) {
            setMessages([]);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    initRoom();
    return () => {
      isMounted = false;
    };
  }, [role]);

  const handleSend = async (text: string) => {
    if (!contact) return;
    const newMsg: MessageModel = {
      id: Date.now(),
      content: text,
      senderId: 0,
      receiverId: contact.receiverId,
      sentAt: new Date().toISOString(),
      isRead: false,
      isMy: true,
    };
    setMessages((prev) => [newMsg, ...prev]);

    try {
      await chatService.sendMessage(
        contact.receiverId,
        text,
        null,
        contact.dialogId,
      );
    } catch (e) {
      Alert.alert("Ошибка", "Не удалось отправить");
    }
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );

  if (!contact) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: "#888", textAlign: "center" }}>
          {role} еще не назначен.
        </Text>
      </View>
    );
  }

  return (
    <ChatUI
      messages={messages}
      onSend={handleSend}
      styles={styles}
      headerTitle={contact.name}
      showBackBtn={false}
    />
  );
};

// ==========================================
// 3. ВИД ДЛЯ КЛИЕНТА
// ==========================================
const ClientChatView = ({ styles }: { styles: any }) => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const ROLES = ["Агент", "Юрист", "Менеджер", "Админ"];

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveTab(index);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabBar}>
        {ROLES.map((role, index) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.tabButton,
              activeTab === index && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText,
              ]}
            >
              {role}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        contentContainerStyle={{ width: width * ROLES.length }}
      >
        {ROLES.map((role) => (
          <View key={role} style={{ width: width, height: "100%" }}>
            <ChatRoomWrapper role={role} styles={styles} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const ChatScreen = () => {
  const theme = useColorScheme() ?? "light";
  // Создаем стили один раз
  const styles = useMemo(() => createChatStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <RoleGuard
        client={<ClientChatView styles={styles} />}
        agent={<StaffChatView styles={styles} userRole="Agent" />}
        lawyer={<StaffChatView styles={styles} userRole="Lawyer" />}
        admin={<StaffChatView styles={styles} userRole="Admin" />}
        manager={<StaffChatView styles={styles} userRole="Manager" />}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
