import React from 'react';
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
import { getRecommendedCrops, CropRecommendation } from '@/data/cropRecommendations';
import { getSoilInfoByState } from '@/data/soilData';
import Colors from '@/constants/colors';
import Footer from '@/components/Footer';
import Animated, { FadeInDown } from 'react-native-reanimated';

function CropCard({ crop, language, index }: { crop: CropRecommendation; language: 'en' | 'hi'; index: number }) {
  const t = translations[language];
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <View style={styles.cropCard}>
        <View style={styles.cropHeader}>
          <View style={styles.cropIconWrap}>
            <Ionicons name={crop.icon as any} size={22} color={Colors.primary} />
          </View>
          <View style={styles.cropNameWrap}>
            <Text style={styles.cropName}>
              {language === 'hi' ? crop.nameHi : crop.name}
            </Text>
            <View style={styles.seasonBadge}>
              <Text style={styles.seasonBadgeText}>
                {language === 'hi' ? crop.seasonHi : crop.season}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cropDetails}>
          <View style={styles.cropDetail}>
            <Ionicons name="water-outline" size={14} color="#1565C0" />
            <Text style={styles.cropDetailLabel}>{t.waterNeeds}</Text>
            <Text style={styles.cropDetailValue}>
              {language === 'hi' ? crop.waterNeedsHi : crop.waterNeeds}
            </Text>
          </View>
          <View style={styles.cropDetail}>
            <Ionicons name="trending-up" size={14} color="#2E7D32" />
            <Text style={styles.cropDetailLabel}>{t.expectedYield}</Text>
            <Text style={styles.cropDetailValue}>
              {language === 'hi' ? crop.expectedYieldHi : crop.expectedYield}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default function RecommendationsScreen() {
  const { language, weather, location } = useApp();
  const t = translations[language];
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const soilInfo = location ? getSoilInfoByState(location.state) : null;
  const soilType = soilInfo?.soilType || 'Alluvial Soil';
  const temp = weather?.temp || 25;
  const rainfall = weather?.rainfall || 50;

  const crops = getRecommendedCrops(temp, rainfall, soilType);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t.cropRecommendations}</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.conditionsBanner}>
          <Text style={styles.conditionsTitle}>{t.basedOnConditions}</Text>
          <View style={styles.conditionsRow}>
            <View style={styles.conditionChip}>
              <Ionicons name="thermometer" size={14} color="#E65100" />
              <Text style={styles.conditionText}>{temp}{t.celsius}</Text>
            </View>
            <View style={styles.conditionChip}>
              <Ionicons name="rainy" size={14} color="#1565C0" />
              <Text style={styles.conditionText}>{rainfall}{t.mm}</Text>
            </View>
            <View style={styles.conditionChip}>
              <Ionicons name="earth" size={14} color={Colors.accent} />
              <Text style={styles.conditionText}>{language === 'hi' && soilInfo ? soilInfo.soilTypeHi.substring(0, 15) : soilType.substring(0, 15)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t.recommendedCrops}</Text>

        {crops.map((crop, index) => (
          <CropCard key={crop.name} crop={crop} language={language} index={index} />
        ))}

        {crops.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={48} color={Colors.textSecondary} />
            <Text style={styles.emptyText}>{t.noData}</Text>
          </View>
        )}

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
  conditionsBanner: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  conditionsTitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 10,
  },
  conditionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.backgroundDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  conditionText: {
    fontSize: 12,
    color: Colors.text,
    fontFamily: 'Poppins_500Medium',
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.text,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 12,
  },
  cropCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  cropHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  cropIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cropNameWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cropName: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'Poppins_700Bold',
    flex: 1,
  },
  seasonBadge: {
    backgroundColor: Colors.primaryLight + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  seasonBadgeText: {
    fontSize: 11,
    color: Colors.primary,
    fontFamily: 'Poppins_600SemiBold',
  },
  cropDetails: {
    gap: 8,
  },
  cropDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cropDetailLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_500Medium',
    width: 100,
  },
  cropDetailValue: {
    fontSize: 12,
    color: Colors.text,
    fontFamily: 'Poppins_600SemiBold',
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_500Medium',
  },
});
