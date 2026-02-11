import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import { cropCalendarData, SeasonData } from '@/data/cropCalendar';
import Colors from '@/constants/colors';
import Footer from '@/components/Footer';
import Animated, { FadeInDown } from 'react-native-reanimated';

const seasonColors: Record<string, { bg: string; accent: string }> = {
  'Kharif (Monsoon)': { bg: '#E8F5E9', accent: '#2E7D32' },
  'Rabi (Winter)': { bg: '#E3F2FD', accent: '#1565C0' },
  'Zaid (Summer)': { bg: '#FFF8E1', accent: '#F57F17' },
};

function SeasonSection({ season, language, index }: { season: SeasonData; language: 'en' | 'hi'; index: number }) {
  const t = translations[language];
  const colors = seasonColors[season.season] || { bg: Colors.backgroundDark, accent: Colors.primary };

  return (
    <Animated.View entering={FadeInDown.delay(index * 150).duration(400)}>
      <View style={styles.seasonCard}>
        <View style={[styles.seasonHeader, { backgroundColor: colors.bg }]}>
          <View style={[styles.seasonDot, { backgroundColor: colors.accent }]} />
          <View style={styles.seasonTextWrap}>
            <Text style={[styles.seasonName, { color: colors.accent }]}>
              {language === 'hi' ? season.seasonHi : season.season}
            </Text>
            <Text style={styles.seasonMonths}>
              {language === 'hi' ? season.monthsHi : season.months}
            </Text>
          </View>
        </View>

        {season.crops.map((crop, i) => (
          <View key={crop.name}>
            <View style={styles.cropRow}>
              <View style={[styles.cropIconWrap, { backgroundColor: colors.bg }]}>
                <Ionicons name={crop.icon as any} size={18} color={colors.accent} />
              </View>
              <View style={styles.cropInfo}>
                <Text style={styles.cropName}>
                  {language === 'hi' ? crop.nameHi : crop.name}
                </Text>
                <View style={styles.cropTimeline}>
                  <View style={styles.timelineItem}>
                    <Ionicons name="arrow-down-circle-outline" size={12} color={Colors.primary} />
                    <Text style={styles.timelineLabel}>{t.sowingPeriod}: </Text>
                    <Text style={styles.timelineValue}>
                      {language === 'hi' ? crop.sowingHi : crop.sowing}
                    </Text>
                  </View>
                  <View style={styles.timelineItem}>
                    <Ionicons name="arrow-up-circle-outline" size={12} color={Colors.accent} />
                    <Text style={styles.timelineLabel}>{t.harvestPeriod}: </Text>
                    <Text style={styles.timelineValue}>
                      {language === 'hi' ? crop.harvestHi : crop.harvest}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {i < season.crops.length - 1 && <View style={styles.cropDivider} />}
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

export default function CropCalendarScreen() {
  const { language } = useApp();
  const t = translations[language];
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t.cropCalendar}</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cropCalendarData.map((season, index) => (
          <SeasonSection key={season.season} season={season} language={language} index={index} />
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>

      <Footer />
    </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  seasonCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  seasonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  seasonDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  seasonTextWrap: {
    flex: 1,
  },
  seasonName: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
  seasonMonths: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_400Regular',
  },
  cropRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    gap: 12,
  },
  cropIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 6,
  },
  cropTimeline: {
    gap: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timelineLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_500Medium',
  },
  timelineValue: {
    fontSize: 11,
    color: Colors.text,
    fontFamily: 'Poppins_600SemiBold',
  },
  cropDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 14,
  },
});
