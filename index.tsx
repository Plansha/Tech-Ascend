import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { useApp } from '@/context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const { isLanguageLoaded } = useApp();
  const leafScale = useSharedValue(0);
  const leafRotate = useSharedValue(-30);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const taglineOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    leafScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    leafRotate.value = withSpring(0, { damping: 10, stiffness: 80 });
    titleOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    titleTranslateY.value = withDelay(400, withSpring(0, { damping: 12 }));
    taglineOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
    pulseScale.value = withDelay(
      1200,
      withSequence(
        withTiming(1.1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) })
      )
    );
  }, []);

  useEffect(() => {
    if (!isLanguageLoaded) return;
    const timer = setTimeout(async () => {
      const savedLang = await AsyncStorage.getItem('farmgpt_language');
      if (savedLang) {
        router.replace('/dashboard');
      } else {
        router.replace('/language');
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [isLanguageLoaded]);

  const leafStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: leafScale.value * pulseScale.value },
      { rotate: `${leafRotate.value}deg` },
    ],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  return (
    <LinearGradient
      colors={['#1B5E20', '#2E7D32', '#388E3C']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.bgPattern}>
        {[...Array(6)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.bgCircle,
              {
                top: `${15 + i * 15}%`,
                left: `${(i % 3) * 30 + 10}%`,
                width: 80 + i * 20,
                height: 80 + i * 20,
                opacity: 0.04 + i * 0.01,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.content}>
        <Animated.View style={[styles.logoContainer, leafStyle]}>
          <View style={styles.logoOuter}>
            <View style={styles.logoInner}>
              <Ionicons name="leaf" size={48} color="#FFFFFF" />
            </View>
          </View>
        </Animated.View>

        <Animated.View style={titleStyle}>
          <Text style={styles.appName}>FarmGPT</Text>
        </Animated.View>

        <Animated.View style={[styles.taglineWrap, taglineStyle]}>
          <View style={styles.taglineLine} />
          <Text style={styles.tagline}>
            Your AI Farming Assistant{'\n'}for Smarter Agriculture
          </Text>
          <View style={styles.taglineLine} />
        </Animated.View>
      </View>

      <View style={styles.bottomBadge}>
        <Ionicons name="shield-checkmark" size={14} color="rgba(255,255,255,0.4)" />
        <Text style={styles.bottomText}>Made for Indian Farmers</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgPattern: {
    ...StyleSheet.absoluteFillObject,
  },
  bgCircle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  logoContainer: {
    marginBottom: 8,
  },
  logoOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 40,
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 1,
  },
  taglineWrap: {
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 40,
  },
  taglineLine: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 1,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomBadge: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? 50 : 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bottomText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
});
