import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createChatStyles } from "@/styles";
import { RoleGuard } from "@/components";

const { width } = Dimensions.get("window");

// ==========================================
// 1. MOCK DATA
// ==========================================

const CHAT_DATA = {
  // Контакты, доступные Клиенту
  clientContacts: [
    {
      id: 1,
      type: "Support",
      name: "Техподдержка",
      lastMsg: "Ваш запрос обрабатывается",
      avatar: "TP",
    },
    {
      id: 2,
      type: "Agent",
      name: "Ваш Агент",
      lastMsg: "Документы получил",
      avatar: "A",
    },
  ],
  // Контакты для сотрудников (списки по категориям)
  workerLists: {
    clients: [
      { id: 101, name: "Иван Иванов", lastMsg: "Где справка?", avatar: "K" },
      { id: 102, name: "Петр Петров", lastMsg: "Спасибо!", avatar: "K" },
    ],
    agents: [
      { id: 201, name: "Коллега Агент", lastMsg: "Взял в работу", avatar: "A" },
    ],
    lawyers: [
      { id: 301, name: "Главный Юрист", lastMsg: "Нужен отчет", avatar: "J" },
    ],
  },
  // Пример переписки
  messages: [
    { id: 1, text: "Здравствуйте! Есть вопрос по программе.", isMy: false },
    {
      id: 2,
      text: "Добрый день! Готов помочь, прикрепите файл договора.",
      isMy: true,
    },
  ],
};

// Окно активного чата (Overlay)
const ChatOverlay = ({ user, onClose, styles }: any) => (
  <View style={styles.chatOverlay}>
    <View style={styles.chatHeader}>
      <TouchableOpacity onPress={onClose} style={styles.backButton}>
        <Text style={{ color: styles.tabText.color, fontSize: 18 }}>←</Text>
      </TouchableOpacity>
      <Text style={styles.contactName}>{user}</Text>
    </View>

    <ScrollView style={styles.messageList}>
      {CHAT_DATA.messages.map((msg) => (
        <View
          key={msg.id}
          style={[
            styles.bubble,
            msg.isMy ? styles.sentBubble : styles.receivedBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              msg.isMy ? styles.sentText : styles.receivedText,
            ]}
          >
            {msg.text}
          </Text>
        </View>
      ))}
    </ScrollView>

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

// Единичный элемент списка контактов
const ContactItem = ({ item, onPress, styles }: any) => (
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

// ВИД 1: Расширенный список (свайп табов) - для Сотрудников и Админа
const FullChatView = ({ styles }: { styles: any }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const tabs = ["Клиенты", "Агенты", "Юристы"];

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveTab(index);
  };

  const renderList = (data: any[]) => (
    <ScrollView style={styles.page}>
      {data.map((item) => (
        <ContactItem
          key={item.id}
          item={item}
          onPress={setSelectedUser}
          styles={styles}
        />
      ))}
    </ScrollView>
  );

  return (
    <>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
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
              {tab}
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
      >
        {renderList(CHAT_DATA.workerLists.clients)}
        {renderList(CHAT_DATA.workerLists.agents)}
        {renderList(CHAT_DATA.workerLists.lawyers)}
      </ScrollView>

      {selectedUser && (
        <ChatOverlay
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          styles={styles}
        />
      )}
    </>
  );
};

// ВИД 2: Простой список (без табов) - для Клиента
const ClientChatView = ({ styles }: { styles: any }) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16, paddingBottom: 0 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: styles.contactName.color,
          }}
        >
          Чаты
        </Text>
      </View>
      <ScrollView style={{ flex: 1, marginTop: 10 }}>
        {CHAT_DATA.clientContacts.map((item) => (
          <ContactItem
            key={item.id}
            item={item}
            onPress={setSelectedUser}
            styles={styles}
          />
        ))}
      </ScrollView>

      {selectedUser && (
        <ChatOverlay
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          styles={styles}
        />
      )}
    </View>
  );
};

const ChatScreen = () => {
  const theme = useColorScheme() ?? "light";
  const styles = createChatStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <RoleGuard
        // Клиенту простой вид
        client={<ClientChatView styles={styles} />}
        // Остальным полный вид с табами
        agent={<FullChatView styles={styles} />}
        lawyer={<FullChatView styles={styles} />}
        admin={<FullChatView styles={styles} />}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
