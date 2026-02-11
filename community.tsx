import React, { useState } from 'react';
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
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp, CommunityMessage } from '@/context/AppContext';
import { translations } from '@/data/translations';
import Colors from '@/constants/colors';
import Footer from '@/components/Footer';

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
          <Ionicons name="person" size={16} color={Colors.primary} />
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

export default function CommunityScreen() {
  const { language, communityMessages, addCommunityMessage } = useApp();
  const t = translations[language];
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const [text, setText] = useState('');
  const [authorName] = useState(() => {
    const names = language === 'hi'
      ? ['\u0915\u093F\u0938\u093E\u0928 \u0930\u093E\u092E', '\u0915\u093F\u0938\u093E\u0928 \u0936\u094D\u092F\u093E\u092E', '\u0915\u093F\u0938\u093E\u0928 \u0938\u0941\u0930\u0947\u0936', '\u0915\u093F\u0938\u093E\u0928 \u092E\u094B\u0939\u0928']
      : ['Farmer Ram', 'Farmer Shyam', 'Farmer Suresh', 'Farmer Mohan'];
    return names[Math.floor(Math.random() * names.length)];
  });

  const handleSend = () => {
    if (!text.trim()) return;
    addCommunityMessage(text.trim(), authorName);
    setText('');
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="chatbubbles-outline" size={48} color={Colors.textSecondary} />
      <Text style={styles.emptyText}>{t.noMessages}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t.community}</Text>
        <View style={{ width: 30 }} />
      </View>

      <FlatList
        data={communityMessages}
        renderItem={({ item }) => <MessageItem message={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          communityMessages.length === 0 && styles.listContentEmpty,
        ]}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        inverted={communityMessages.length > 0}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder={t.writeMessage}
            placeholderTextColor={Colors.textSecondary}
            multiline
            maxLength={500}
          />
          <Pressable
            style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!text.trim()}
          >
            <Ionicons name="send" size={18} color={text.trim() ? '#fff' : 'rgba(255,255,255,0.5)'} />
          </Pressable>
        </View>
      </View>

      <Footer />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    color: Colors.text,
    fontFamily: 'Poppins_700Bold',
  },
  listContent: {
    padding: 16,
    gap: 10,
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
    color: Colors.textSecondary,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  messageCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
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
    backgroundColor: Colors.backgroundDark,
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
    color: Colors.text,
    fontFamily: 'Poppins_600SemiBold',
  },
  messageTime: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_400Regular',
  },
  messageText: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 20,
    marginLeft: 42,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.text,
    fontFamily: 'Poppins_400Regular',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: Colors.primaryLight,
    opacity: 0.5,
  },
});
