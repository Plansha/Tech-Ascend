import React from 'react';
import { View, Text, StyleSheet, Linking, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import Colors from '@/constants/colors';

export default function Footer() {
  const { language } = useApp();
  const t = translations[language];

  const handleCall = () => {
    Linking.openURL('tel:18001801551');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Pressable onPress={handleCall} style={styles.content}>
          <View style={styles.iconWrap}>
            <Ionicons name="call" size={16} color="#4CAF50" />
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.title}>
              {t.helpline}: {t.helplineNumber}
            </Text>
            <Text style={styles.subtitle}>{t.officialSupport}</Text>
          </View>
        </Pressable>
        <View style={styles.badge}>
          <Ionicons name="shield-checkmark" size={12} color="#4CAF50" />
          <Text style={styles.badgeText}>GOI</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.footerBg,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'web' ? 44 : 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(76, 175, 80, 0.3)',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: '#A5D6A7',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  subtitle: {
    color: 'rgba(165, 214, 167, 0.6)',
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.2)',
    gap: 4,
  },
  badgeText: {
    color: '#4CAF50',
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
  },
});
