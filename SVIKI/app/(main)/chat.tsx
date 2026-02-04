import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { createChatStyles } from "@/styles";
import { RoleGuard } from "@/components";
import { ChatOverlay, ContactItem } from "@/components/ui";

const { width } = Dimensions.get("window");

// ==========================================
// 1. MOCK DATA
// ==========================================

const CHAT_DATA = {
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
  messages: [
    { id: 1, text: "Здравствуйте! Есть вопрос по программе.", isMy: false },
    {
      id: 2,
      text: "Добрый день! Готов помочь, прикрепите файл договора.",
      isMy: true,
    },
  ],
};

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
    <View style={styles.page}>
      <FlashList
        data={data}
        estimatedItemSize={70}
        renderItem={({ item }: { item: any }) => (
          <ContactItem item={item} onPress={setSelectedUser} styles={styles} />
        )}
      />
    </View>
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
          messages={CHAT_DATA.messages}
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
      <FlashList
        data={CHAT_DATA.clientContacts}
        estimatedItemSize={70}
        ListHeaderComponent={
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
        }
        renderItem={({ item }: { item: any }) => (
          <ContactItem item={item} onPress={setSelectedUser} styles={styles} />
        )}
      />

      {selectedUser && (
        <ChatOverlay
          user={selectedUser}
          messages={CHAT_DATA.messages}
          onClose={() => setSelectedUser(null)}
          styles={styles}
        />
      )}
    </View>
  );
};

const ChatScreen = () => {
  const theme = useColorScheme() ?? "light";
  const styles = useMemo(() => createChatStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <RoleGuard
        client={<ClientChatView styles={styles} />}
        agent={<FullChatView styles={styles} />}
        lawyer={<FullChatView styles={styles} />}
        admin={<FullChatView styles={styles} />}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
