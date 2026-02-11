import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import Colors from '@/constants/colors';
import Animated, { FadeIn, SlideInLeft } from 'react-native-reanimated';

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route: string;
}

export default function DrawerMenu({ visible, onClose }: DrawerMenuProps) {
  const { language } = useApp();
  const t = translations[language];
  const insets = useSafeAreaInsets();

  const menuItems: MenuItem[] = [
    { icon: 'home-outline', label: t.home, route: '/dashboard' },
    { icon: 'people-outline', label: t.community, route: '/community' },
    { icon: 'calendar-outline', label: t.cropCalendar, route: '/crop-calendar' },
    { icon: 'information-circle-outline', label: t.about, route: '/about' },
  ];

  const handleNavigate = (route: string) => {
    onClose();
    setTimeout(() => {
      router.push(route as any);
    }, 200);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          entering={SlideInLeft.duration(250)}
          style={[styles.drawer, { paddingTop: insets.top + 20 }]}
        >
          <View style={styles.header}>
            <View style={styles.logoRow}>
              <View style={styles.logoCircle}>
                <Ionicons name="leaf" size={24} color="#fff" />
              </View>
              <View>
                <Text style={styles.appName}>{t.appName}</Text>
                <Text style={styles.taglineSmall}>{t.tagline.substring(0, 30)}...</Text>
              </View>
            </View>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="rgba(255,255,255,0.7)" />
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View style={styles.menuList}>
            {menuItems.map((item, index) => (
              <Pressable
                key={item.route}
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}
                onPress={() => handleNavigate(item.route)}
              >
                <View style={styles.menuIconWrap}>
                  <Ionicons name={item.icon} size={22} color="#A5D6A7" />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color="rgba(165,214,167,0.4)" />
              </Pressable>
            ))}
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.divider} />
            <Text style={styles.versionText}>{t.version}</Text>
          </View>
        </Animated.View>

        <Pressable style={styles.backdrop} onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    width: 280,
    backgroundColor: Colors.drawerBg,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
  },
  taglineSmall: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
  },
  closeBtn: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    marginVertical: 16,
  },
  menuList: {
    flex: 1,
    paddingHorizontal: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  menuItemPressed: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(76, 175, 80, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuLabel: {
    color: '#E8F5E9',
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: 20,
  },
  versionText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
});
