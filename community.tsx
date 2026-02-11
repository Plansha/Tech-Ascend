import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CommunityMessage {
  id: string;
  author: string;
  text: string;
  timestamp: number;
}

function MessageItem({ message }: { message: CommunityMessage }) {
  const timeAgo = (timestamp: number): string => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <View style={styles.messageCard}>
      <View style={styles.messageHeader}>
        <View style={styles.avatarWrap}>
          <Icon name="person" size={16} color="#4CAF50" />
        </View>
        <View style={styles.messageHeaderText}>
          <Text style={styles.authorName}>{message.author}</Text>
          <Text style={styles.messageTime}>{timeAgo(message.timestamp)}</Text>
        </View>
      </View>
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );
}

export default function CommunityScreen({ navigation }) {
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [text, setText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const authorNames = ['Farmer Ram', 'Farmer Shyam', 'Farmer Suresh', 'Farmer Mohan'];

  const addMessage = (messageText: string, author: string) => {
    const newMessage: CommunityMessage = {
      id: Date.now().toString(),
      author,
      text: messageText,
      timestamp: Date.now(),
    };
    setMessages(prev => [newMessage, ...prev]); // Add to beginning for inverted list
  };

  const handleSend = () => {
    if (!text.trim()) return;
    const randomAuthor = authorNames[Math.floor(Math.random() * authorNames.length)];
    addMessage(text.trim(), randomAuthor);
    setText('');
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="chatbubbles-outline" size={48} color="#999" />
      <Text style={styles.emptyText}>No messages yet. Start the conversation!</Text>
    </View>
  );

  // Scroll to bottom when new messages added
  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [messages]);

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      console.log('Go back pressed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <Pressable onPress={handleBackPress} style={styles.backBtn}>
          <Icon name="arrow-back" size={22} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Community</Text>
        <View style={{ width: 30 }} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => <MessageItem message={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          messages.length === 0 && styles.listContentEmpty,
        ]}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        inverted
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Write a message..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
          />
          <Pressable
            style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!text.trim()}
          >
            <Icon 
              name="send" 
              size={18} 
              color={text.trim() ? '#fff' : 'rgba(255,255,255,0.5)'} 
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    color: '#000',
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
    gap: 10,
    paddingBottom: 100, // Extra space for input
  },
  listContentEmpty: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontWeight: '500',
  },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageHeaderText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 13,
    color: '#000',
    fontWeight: '600',
  },
  messageTime: {
    fontSize: 11,
    color: '#999',
  },
  messageText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
    marginLeft: 42,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: '#A5D6A7',
    opacity: 0.5,
  },
});


