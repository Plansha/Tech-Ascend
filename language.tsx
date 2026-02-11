import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default function LanguageScreen({ navigation }: { navigation?: any }) {
  const handleSelect = (lang: 'en' | 'hi') => {
    // Mock setLanguage - store in local state or pass via props
    console.log('Language selected:', lang);
    
    if (navigation) {
      navigation.replace('dashboard');
    } else {
      Alert.alert('Language Selected', `Language set to ${lang}. Navigate to Dashboard.`);
    }
  };

  return (
    <LinearGradient
      colors={['#F1F8E9', '#E8F5E9', '#C8E6C9']}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F1F8E9" />
      
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Icon name="language" size={32} color="#4CAF50" />
        </View>
        <Text style={styles.title}>Select Your Language</Text>
      </View>

      <View style={styles.optionsContainer}>
        <Pressable
          style={({ pressed }) => [styles.langCard, pressed && styles.langCardPressed]}
          onPress={() => handleSelect('en')}
        >
          <View style={styles.langLeft}>
            <View style={[styles.langIcon, { backgroundColor: '#E3F2FD' }]}>
              <Text style={styles.langEmoji}>A</Text>
            </View>
            <View>
              <Text style={styles.langName}>English</Text>
              <Text style={styles.langNative}>English</Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={20} color="#999" />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.langCard, pressed && styles.langCardPressed]}
          onPress={() => handleSelect('hi')}
        >
          <View style={styles.langLeft}>
            <View style={[styles.langIcon, { backgroundColor: '#FFF3E0' }]}>
              <Text style={styles.langEmoji}>अ</Text>
            </View>
            <View>
              <Text style={styles.langName}>हिंदी</Text>
              <Text style={styles.langNative}>Hindi</Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={20} color="#999" />
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Icon name="leaf" size={16} color="#81C784" />
        <Text style={styles.footerText}>FarmGPT</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
    marginTop: 20,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
  },
  langCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  langCardPressed: {
    backgroundColor: '#F5F5F5',
    transform: [{ scale: 0.98 }],
  },
  langLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  langIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langEmoji: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  langName: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  langNative: {
    fontSize: 13,
    color: '#666',
    fontWeight: '400',
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  footerText: {
    fontSize: 14,
    color: '#81C784',
    fontWeight: '600',
  },
});
