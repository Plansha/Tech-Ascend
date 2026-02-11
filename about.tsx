import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import Colors from '@/constants/colors';
import Footer from '@/components/Footer';

export default function AboutScreen() {
  const { language } = useApp();
  const t = translations[language];
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const features = [
    {
      icon: 'location-outline' as const,
      title: language === 'hi' ? '\u0938\u094D\u0925\u093E\u0928-\u0906\u0927\u093E\u0930\u093F\u0924 \u0921\u0947\u091F\u093E' : 'Location-Based Data',
      desc: language === 'hi' ? '\u0906\u092A\u0915\u0947 \u0915\u094D\u0937\u0947\u0924\u094D\u0930 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u091C\u093E\u0928\u0915\u093E\u0930\u0940' : 'Data tailored to your region',
    },
    {
      icon: 'cloud-outline' as const,
      title: language === 'hi' ? '\u0932\u093E\u0907\u0935 \u092E\u094C\u0938\u092E \u0921\u0947\u091F\u093E' : 'Live Weather Data',
      desc: language === 'hi' ? '\u0930\u093F\u092F\u0932-\u091F\u093E\u0907\u092E \u092E\u094C\u0938\u092E \u0914\u0930 \u092A\u0942\u0930\u094D\u0935\u093E\u0928\u0941\u092E\u093E\u0928' : 'Real-time weather and forecasts',
    },
    {
      icon: 'leaf-outline' as const,
      title: language === 'hi' ? '\u092B\u0938\u0932 \u0938\u093F\u092B\u093E\u0930\u093F\u0936\u0947\u0902' : 'Crop Recommendations',
      desc: language === 'hi' ? '\u092E\u094C\u0938\u092E \u0914\u0930 \u092E\u093F\u091F\u094D\u091F\u0940 \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930' : 'Based on weather and soil conditions',
    },
    {
      icon: 'document-text-outline' as const,
      title: language === 'hi' ? '\u0938\u0930\u0915\u093E\u0930\u0940 \u092F\u094B\u091C\u0928\u093E\u090F\u0902' : 'Government Schemes',
      desc: language === 'hi' ? '\u092A\u093E\u0924\u094D\u0930\u0924\u093E \u0914\u0930 \u0932\u093E\u092D \u0915\u0940 \u091C\u093E\u0928\u0915\u093E\u0930\u0940' : 'Eligibility and benefits info',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t.about}</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#1B5E20', '#2E7D32']}
          style={styles.heroBanner}
        >
          <View style={styles.heroLogo}>
            <View style={styles.heroLogoInner}>
              <Ionicons name="leaf" size={36} color="#fff" />
            </View>
          </View>
          <Text style={styles.heroTitle}>FarmGPT</Text>
          <Text style={styles.heroTagline}>{t.tagline}</Text>
        </LinearGradient>

        <View style={styles.descCard}>
          <Text style={styles.descText}>{t.aboutDesc}</Text>
        </View>

        <Text style={styles.sectionTitle}>
          {language === 'hi' ? '\u092E\u0941\u0916\u094D\u092F \u0935\u093F\u0936\u0947\u0937\u0924\u093E\u090F\u0902' : 'Key Features'}
        </Text>

        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={styles.featureIconWrap}>
              <Ionicons name={feature.icon} size={22} color={Colors.primary} />
            </View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </View>
          </View>
        ))}

        <View style={styles.helplineCard}>
          <Ionicons name="call" size={24} color={Colors.primary} />
          <View style={styles.helplineTextWrap}>
            <Text style={styles.helplineTitle}>{t.helpline}</Text>
            <Pressable onPress={() => Linking.openURL('tel:18001801551')}>
              <Text style={styles.helplineNumber}>{t.helplineNumber}</Text>
            </Pressable>
            <Text style={styles.helplineDesc}>{t.officialSupport}</Text>
          </View>
        </View>

        <Text style={styles.versionText}>{t.version}</Text>

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
  heroBanner: {
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  heroLogo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  heroLogoInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
  },
  heroTagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
  descCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  descText: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.text,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 12,
  },
  featureCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  featureIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextWrap: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: 'Poppins_600SemiBold',
  },
  featureDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_400Regular',
  },
  helplineCard: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 16,
    padding: 18,
    marginTop: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  helplineTextWrap: {
    flex: 1,
  },
  helplineTitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_500Medium',
  },
  helplineNumber: {
    fontSize: 20,
    color: Colors.primary,
    fontFamily: 'Poppins_700Bold',
  },
  helplineDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_400Regular',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 8,
  },
});
