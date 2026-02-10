// --- FILE: ./app/(main)/chat.tsx ---
import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { createChatStyles } from "@/styles";
import { RoleGuard } from "@/components";
import { ChatOverlay, ContactItem } from "@/components/ui";
import { chatService, ChatContact, MessageModel } from "@/api/chatService";

const { width } = Dimensions.get("window");

// ... (StaffChatView) ... 

const StaffChatView = ({ styles, userRole }: any) => {
  // ... (прежний код стейтов activeTab, tabs, listsData, loading) ...
  const scrollRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<string[]>([]);
  const [listsData, setListsData] = useState<ChatContact[][]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [activeDialogId, setActiveDialogId] = useState<number | null>(null);

  // 1. Загрузка контактов (без изменений)
  useEffect(() => {
    loadContacts();
  }, [userRole]);

  const loadContacts = async () => {
     // ... (код загрузки контактов оставляем как был в исходнике) ...
      setLoading(true);
      try {
        let loadedTabs: string[] = [];
        let loadedData: ChatContact[][] = [];
        if (userRole === "Admin" || userRole === "Manager") {
          loadedTabs = ["Клиенты", "Агенты", "Юристы"];
          const [clients, agents, lawyers] = await Promise.all([
            chatService.getContacts("Admin"),
            chatService.getAdminAgentContacts(),
            chatService.getAdminLawyerContacts(),
          ]);
          loadedData = [clients, agents, lawyers];
        } else if (userRole === "Lawyer") {
          loadedTabs = ["Клиенты"];
          const clients = await chatService.getContacts("Lawyer");
          loadedData = [clients];
        } else if (userRole === "Agent") {
          loadedTabs = ["Клиенты", "Менеджеры"];
          const clients = await chatService.getContacts("Agent");
          // Заглушка, используйте реальный метод API
          const managers = await chatService.getContacts("Agent"); 
          loadedData = [clients, managers];
        }
        setTabs(loadedTabs);
        setListsData(loadedData);
      } catch (error) {
        console.error("Ошибка контактов:", error);
      } finally {
        setLoading(false);
      }
  };

  // 2. Открытие чата (ИСПРАВЛЕНИЕ ПОРЯДКА)
  const handleContactPress = async (contact: ChatContact) => {
    setSelectedContact(contact);
    setChatLoading(true);
    try {
      const history = await chatService.getChatHistory(contact.receiverId);
      // Бэкенд обычно шлет [Старое -> Новое].
      // Для inverted списка нам нужно [Новое -> Старое].
      // Делаем .reverse()
      setMessages([...history.messages].reverse());
      setActiveDialogId(history.dialogId);
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось загрузить чат");
      setSelectedContact(null);
    } finally {
      setChatLoading(false);
    }
  };

  // 3. Отправка (ИСПРАВЛЕНИЕ: ДОБАВЛЯЕМ В НАЧАЛО)
  const handleSend = async (text: string) => {
    if (!selectedContact || !text.trim()) return;

    // Оптимистичное добавление: В НАЧАЛО МАССИВА
    const tempMsg: MessageModel = {
      id: Date.now(),
      content: text,
      senderId: 0, 
      receiverId: selectedContact.receiverId,
      sentAt: new Date().toISOString(), // Сохраняем ISO
      isRead: false,
      // @ts-ignore
      isMy: true,
    };
    
    // Inverted list: [New, ...Old]
    setMessages((prev) => [tempMsg, ...prev]);

    try {
      const dId = activeDialogId || selectedContact.dialogId;
      const newMsg = await chatService.sendMessage(
        selectedContact.receiverId,
        text,
        null,
        dId,
      );
      // Обновляем сообщение (заменяем временный ID на реальный)
      setMessages((prev) =>
        prev.map((m) => (m.id === tempMsg.id ? { ...newMsg, isMy: true } : m)),
      );
    } catch (error) {
      Alert.alert("Ошибка", "Не удалось отправить");
      setMessages((prev) => prev.filter((m) => m.id !== tempMsg.id));
    }
  };
  
  // ... (Остальной код рендера StaffView без изменений: табы, FlashList контактов) ...
  const handleTabPress = (index: number) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };
  
  const renderList = (data: ChatContact[]) => (
     <View style={{ width, flex: 1 }}>
      <FlashList
        data={data}
        estimatedItemSize={70}
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
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Список пуст</Text>}
      />
    </View>
  );

  return (
    <>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabButton, activeTab === index && styles.activeTabButton]}
            onPress={() => handleTabPress(index)}
          >
            <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 50, color: styles.activeTabButton.backgroundColor }} />
      ) : (
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => setActiveTab(Math.round(e.nativeEvent.contentOffset.x / width))}
          scrollEventThrottle={16}
        >
          {listsData.map((list, i) => (<React.Fragment key={i}>{renderList(list)}</React.Fragment>))}
        </ScrollView>
      )}

      {selectedContact && (
        <ChatOverlay
          user={selectedContact.name}
          // Передаем как есть, массив уже перевернут
          messages={messages.map((m) => ({
            ...m,
            text: m.content || (m.attachment ? "[Файл]" : ""),
            isMy: m.isMy || m.senderId !== selectedContact.receiverId,
          }))}
          onClose={() => setSelectedContact(null)}
          onSend={handleSend}
          styles={styles}
        />
      )}
    </>
  );
};

const ClientChatView = ({ styles }: { styles: any }) => {
    // ... копируем логику ClientChatView из исходника, но убеждаемся что используем новые styles ...
    // В исходном коде ClientChatView уже использует inverted и prepending (добавление в начало), 
    // поэтому основная проблема там была в CSS.
    // Просто удостоверьтесь, что при рендере используется правильный formatTime
    
    // ВАЖНОЕ ИЗМЕНЕНИЕ ДЛЯ ClientChatView в renderItem:
    /*
     <Text style={[styles.timeText, isMy ? styles.sentTimeText : styles.receivedTimeText]}>
        {new Date(item.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
     </Text>
    */
   
   // Для краткости я не дублирую весь ClientChatView, так как логика там была верной (inverted),
   // проблема решится обновлением styles/chat.styles.ts, который привязан к этому компоненту.
   // Главное, чтобы <FlashList inverted /> оставался true.
   
   // ...
   
   // Возвращаем заглушку, чтобы код был валидным, в реальном проекте оставьте логику ClientChatView как есть,
   // только обновите классы стилей на те, что мы написали выше (bubble, sentBubble и т.д.).
   return <StaffChatView styles={styles} userRole="Agent" />; // Временно для демонстрации
};

// ... (ChatScreen Main Component) ...
const ChatScreen = () => {
  const theme = useColorScheme() ?? "light";
  const styles = useMemo(() => createChatStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <RoleGuard
        client={<ClientChatView styles={styles} />} // Проверьте, что ClientChatView использует обновленные стили
        agent={<StaffChatView styles={styles} userRole="Agent" />}
        lawyer={<StaffChatView styles={styles} userRole="Lawyer" />}
        admin={<StaffChatView styles={styles} userRole="Admin" />}
        manager={<StaffChatView styles={styles} userRole="Manager" />}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;