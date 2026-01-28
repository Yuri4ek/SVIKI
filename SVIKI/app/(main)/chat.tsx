import React, { useState, useRef } from 'react';
import { 
  View, Text, ScrollView, TextInput, TouchableOpacity, 
  useColorScheme, Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createChatStyles } from '@/styles';

const { width } = Dimensions.get('window');

const ChatScreen = () => {
  const theme = useColorScheme() ?? 'light';
  const styles = createChatStyles(theme);
  const scrollRef = useRef<ScrollView>(null);
  
  const [activeTab, setActiveTab] = useState(0); // 0: Клиенты, 1: Агенты, 2: Юристы
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const tabs = ['Клиенты', 'Агенты', 'Юристы'];

  // Переключение через кнопки
  const handleTabPress = (index: number) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  // Обработка свайпа
  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveTab(index);
  };

  const renderContactList = (type: string) => (
    <ScrollView style={styles.page}>
      {[1, 2, 3].map((i) => (
        <TouchableOpacity 
          key={i} 
          style={styles.contactItem}
          onPress={() => setSelectedUser(`${type} #${i}`)}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{type[0]}</Text>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{type} Пользователь {i}</Text>
            <Text style={styles.lastMessage} numberOfLines={1}>Последнее сообщение в этом чате...</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Переключатель окон */}
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === index && styles.activeTabButton]}
            onPress={() => handleTabPress(index)}
          >
            <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Контейнер со свайпом */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {renderContactList('Клиент')}
        {renderContactList('Агент')}
        {renderContactList('Юрист')}
      </ScrollView>

      {/* Окно чата (открывается при выборе пользователя) */}
      {selectedUser && (
        <View style={styles.chatOverlay}>
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setSelectedUser(null)} style={styles.backButton}>
              <Text style={{ color: styles.tabText.color, fontSize: 18 }}>←</Text>
            </TouchableOpacity>
            <Text style={styles.contactName}>{selectedUser}</Text>
          </View>

          <ScrollView style={styles.messageList}>
            <View style={[styles.bubble, styles.receivedBubble]}>
              <Text style={[styles.messageText, styles.receivedText]}>Здравствуйте! Есть вопрос по программе.</Text>
            </View>
            <View style={[styles.bubble, styles.sentBubble]}>
              <Text style={[styles.messageText, styles.sentText]}>Добрый день! Готов помочь, прикрепите файл договора.</Text>
            </View>
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
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;