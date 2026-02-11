import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Government schemes data
interface GovScheme {
  id: string;
  name: string;
  icon: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  howToApply: string;
}

const governmentSchemes: GovScheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM Kisan Samman Nidhi',
    icon: 'cash-outline',
    description: 'Income support scheme providing ₹6000 per year to small and marginal farmers',
    eligibility: [
      'Small & marginal farmers',
      'Landholding in own name',
      'Aadhaar linked bank account',
      'Not classified as income taxpayer'
    ],
    benefits: [
      '₹2000 every 4 months',
      'Direct bank transfer',
      'No upper age limit',
      'Covers 14 crore+ farmers'
    ],
    howToApply: 'Register on pmkisan.gov.in with Aadhaar & bank details or visit local Common Service Center',
  },
  {
    id: 'pmfb',
    name: 'PM Fasal Bima Yojana',
    icon: 'shield-checkmark-outline',
    description: 'Crop insurance scheme protecting farmers from crop losses',
    eligibility: [
      'Farmers with crop loans',
      'Non-loanee farmers can opt-in',
      'Notified crops only',
      'Premium contribution required'
    ],
    benefits: [
      'Covers yield losses',
      'Prevents & post-harvest loss',
      'Low premium rates',
      'Quick claim settlement'
    ],
    howToApply: 'Automatic for loanee farmers or register via bank/CSC before sowing season',
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card',
    icon: 'card-outline',
    description: 'Short-term credit for cultivation needs at concessional rates',
    eligibility: [
      'Landholding farmers',
      'Tenant farmers/JLG',
      'SHG members',
      'Age 18-75 years'
    ],
    benefits: [
      '7% interest rate',
      'Limit up to ₹3 lakh',
      '4% interest subvention',
      'Valid 5 years'
    ],
    howToApply: 'Apply at nearest bank branch with land documents and ID proof',
  },
  {
    id: 'soil-health',
    name: 'Soil Health Card',
    icon: 'leaf-outline',
    description: 'Provides soil test-based nutrient management recommendations',
    eligibility: [
      'All farmers',
      'One card per 2.5 hectare',
      'Valid for 2 years'
    ],
    benefits: [
      '14 essential nutrients',
      'Fertilizer recommendations',
      'Soil test at 50% subsidy',
      'Digital tracking'
    ],
    howToApply: 'Free at Soil Testing Labs or Common Service Centers',
  },
];

function SchemeCard({ scheme, index }: { scheme: GovScheme; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.schemeCardContainer}>
      <Pressable
        style={[styles.schemeCard, expanded && styles.schemeCardExpanded]}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.schemeHeader}>
          <View style={styles.schemeIconWrap}>
            <Icon name={scheme.icon} size={22} color="#66BB6A" />
          </View>
          <Text style={styles.schemeName} numberOfLines={expanded ? undefined : 2}>
            {scheme.name}
          </Text>
          <Icon
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#999"
          />
        </View>

        <Text style={styles.schemeDesc} numberOfLines={expanded ? undefined : 2}>
          {scheme.description}
        </Text>

        {expanded && (
          <View style={styles.schemeDetails}>
            <View style={styles.detailSection}>
              <View style={styles.detailTitleRow}>
                <Icon name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.detailTitle}>Eligibility</Text>
              </View>
              {scheme.eligibility.map((item, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.detailSection}>
              <View style={styles.detailTitleRow}>
                <Icon name="gift" size={16} color="#66BB6A" />
                <Text style={styles.detailTitle}>Benefits</Text>
              </View>
              {scheme.benefits.map((item, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.applySection}>
              <View style={styles.detailTitleRow}>
                <Icon name="document-text" size={16} color="#1565C0" />
                <Text style={styles.detailTitle}>How to Apply</Text>
              </View>
              <Text style={styles.applyText}>{scheme.howToApply}</Text>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
}

export default function SchemesScreen({ navigation }: { navigation?: any }) {
  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      console.log('Go back pressed');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <Pressable onPress={handleBackPress} style={styles.backBtn}>
          <Icon name="arrow-back" size={22} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Government Schemes</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoBanner}>
          <Icon name="information-circle" size={20} color="#4CAF50" />
          <Text style={styles.infoBannerText}>
            Tap on any scheme to view full details
          </Text>
        </View>

        {governmentSchemes.map((scheme, index) => (
          <SchemeCard key={scheme.id} scheme={scheme} index={index} />
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoBannerText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  schemeCardContainer: {
    marginBottom: 12,
  },
  schemeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  schemeCardExpanded: {
    borderColor: '#C8E6C9',
    borderWidth: 2,
    marginBottom: 16,
  },
  schemeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  schemeIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(102, 187, 106, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  schemeName: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
    lineHeight: 20,
  },
  schemeDesc: {
    fontSize: 12,
    color: '#666',
    fontWeight: '400',
    lineHeight: 18,
    marginLeft: 52,
  },
  schemeDetails: {
    marginTop: 16,
    gap: 16,
  },
  detailSection: {
    gap: 6,
  },
  detailTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  detailTitle: {
    fontSize: 13,
    color: '#000',
    fontWeight: '700',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingLeft: 22,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginTop: 6,
  },
  bulletText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '400',
    lineHeight: 18,
    flex: 1,
  },
  applySection: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  applyText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '400',
    lineHeight: 18,
    paddingLeft: 22,
  },
});
