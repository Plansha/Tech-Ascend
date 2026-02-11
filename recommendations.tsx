import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const mockCrops = [
  {
    name: 'Rice',
    season: 'Kharif',
    icon: 'R',
    waterNeeds: 'High',
    expectedYield: '6-8 tons/ha'
  },
  {
    name: 'Maize',
    season: 'Kharif',
    icon: 'M',
    waterNeeds: 'Medium',
    expectedYield: '4-6 tons/ha'
  },
  {
    name: 'Wheat',
    season: 'Rabi',
    icon: 'W',
    waterNeeds: 'Medium',
    expectedYield: '3-5 tons/ha'
  }
];

function CropCard({ crop, index }) {
  return (
    <View style={styles.cropCard}>
      <View style={styles.cropHeader}>
        <View style={styles.cropIconWrap}>
          <Text style={styles.cropIcon}>{crop.icon}</Text>
        </View>
        <View style={styles.cropNameWrap}>
          <Text style={styles.cropName}>{crop.name}</Text>
          <View style={styles.seasonBadge}>
            <Text style={styles.seasonBadgeText}>{crop.season}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cropDetails}>
        <View style={styles.cropDetail}>
          <Text style={styles.waterIcon}>💧</Text>
          <Text style={styles.cropDetailLabel}>Water Needs:</Text>
          <Text style={styles.cropDetailValue}>{crop.waterNeeds}</Text>
        </View>
        <View style={styles.cropDetail}>
          <Text style={styles.yieldIcon}>📈</Text>
          <Text style={styles.cropDetailLabel}>Expected Yield:</Text>
          <Text style={styles.cropDetailValue}>{crop.expectedYield}</Text>
        </View>
      </View>
    </View>
  );
}

export default function RecommendationsScreen() {
  const navigation = useNavigation();
  const topPad = Platform.OS === 'web' ? 67 : 44;

  const temp = 28;
  const rainfall = 45;
  const soilType = 'Alluvial Soil';

  const crops = mockCrops;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Crop Recommendations</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.conditionsBanner}>
          <Text style={styles.conditionsTitle}>Based on current conditions</Text>
          <View style={styles.conditionsRow}>
            <View style={styles.conditionChip}>
              <Text style={styles.conditionIcon}>🌡️</Text>
              <Text style={styles.conditionText}>{temp}°C</Text>
            </View>
            <View style={styles.conditionChip}>
              <Text style={styles.conditionIcon}>🌧️</Text>
              <Text style={styles.conditionText}>{rainfall}mm</Text>
            </View>
            <View style={styles.conditionChip}>
              <Text style={styles.conditionIcon}>🌍</Text>
              <Text style={styles.conditionText}>{soilType}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recommended Crops</Text>

        {crops.map((crop, index) => (
          <CropCard key={crop.name} crop={crop} index={index} />
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backBtn: {
    padding: 4,
  },
  backIcon: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 17,
    color: '#333',
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  conditionsBanner: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  conditionsTitle: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
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
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  conditionIcon: {
    fontSize: 14,
  },
  conditionText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: '700',
    marginBottom: 12,
  },
  cropCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
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
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cropIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  cropNameWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cropName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '700',
    flex: 1,
  },
  seasonBadge: {
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  seasonBadgeText: {
    fontSize: 11,
    color: '#2E7D32',
    fontWeight: '600',
  },
  cropDetails: {
    gap: 8,
  },
  cropDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  waterIcon: {
    fontSize: 14,
    color: '#1565C0',
  },
  yieldIcon: {
    fontSize: 14,
    color: '#2E7D32',
  },
  cropDetailLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    width: 100,
  },
  cropDetailValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
});

 
