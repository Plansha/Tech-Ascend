import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/context/AppContext';
import Colors from '@/constants/colors';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function LanguageScreen() {
  const { setLanguage } = useApp();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const handleSelect = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    router.replace('/dashboard');
  };

  return (
    <LinearGradient
      colors={['#F1F8E9', '#E8F5E9', '#C8E6C9']}
      style={[styles.container, { paddingTop: topPad + 40 }]}
    >
      <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons name="language" size={32} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Select Your Language</Text>
        <Text style={styles.titleHi}>{'\u0905\u092A\u0928\u0940 \u092D\u093E\u0937\u093E \u091A\u0941\u0928\u0947\u0902'}</Text>
      </Animated.View>

      <View style={styles.optionsContainer}>
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
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
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(450).duration(500)}>
          <Pressable
            style={({ pressed }) => [styles.langCard, pressed && styles.langCardPressed]}
            onPress={() => handleSelect('hi')}
          >
            <View style={styles.langLeft}>
              <View style={[styles.langIcon, { backgroundColor: '#FFF3E0' }]}>
                <Text style={styles.langEmoji}>{'\u0905'}</Text>
              </View>
              <View>
                <Text style={styles.langName}>{'\u0939\u093F\u0902\u0926\u0940'}</Text>
                <Text style={styles.langNative}>Hindi</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </Pressable>
        </Animated.View>
      </View>

      <View style={[styles.footer, { paddingBottom: Platform.OS === 'web' ? 44 : insets.bottom + 16 }]}>
        <Ionicons name="leaf" size={16} color={Colors.primaryLight} />
        <Text style={styles.footerText}>FarmGPT</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    color: Colors.text,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  titleHi: {
    fontSize: 18,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_500Medium',
  },
  optionsContainer: {
    gap: 16,
  },
  langCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  langCardPressed: {
    backgroundColor: Colors.backgroundDark,
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
    fontFamily: 'Poppins_700Bold',
    color: Colors.text,
  },
  langName: {
    fontSize: 18,
    color: Colors.text,
    fontFamily: 'Poppins_600SemiBold',
  },
  langNative: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_400Regular',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 14,
    color: Colors.primaryLight,
    fontFamily: 'Poppins_600SemiBold',
  },
});
