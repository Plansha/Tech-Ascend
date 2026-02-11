import React from 'react';
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

interface SeasonData {
  season: string;
  months: string;
  crops: Array<{
    name: string;
    icon: string;
    sowing: string;
    harvest: string;
  }>;
}

const cropCalendarData: SeasonData[] = [
  {
    season: 'Kharif (Monsoon)',
    months: 'June - September',
    crops: [
      {
        name: 'Paddy',
        icon: 'water-outline',
        sowing: 'June-July',
        harvest: 'Oct-Nov',
      },
      {
        name: 'Maize',
        icon: 'nutrition-outline',
        sowing: 'June-July',
        harvest: 'Sept-Oct',
      },
      {
        name: 'Cotton',
        icon: 'shirt-outline',
        sowing: 'June-July',
        harvest: 'Oct-Dec',
      },
    ],
  },
  {
    season: 'Rabi (Winter)',
    months: 'October - March',
    crops: [
      {
        name: 'Wheat',
        icon: 'grain-outline',
        sowing: 'Nov-Dec',
        harvest: 'April-May',
      },
      {
        name: 'Mustard',
        icon: 'leaf-outline',
        sowing: 'Oct-Nov',
        harvest: 'Feb-March',
      },
      {
        name: 'Gram',
        icon: 'nutrition-outline',
        sowing: 'Oct-Nov',
        harvest: 'Feb-March',
      },
    ],
  },
  {
    season: 'Zaid (Summer)',
    months: 'March - June',
    crops: [
      {
        name: 'Cucumber',
        icon: 'restaurant-outline',
        sowing: 'Feb-March',
        harvest: 'May-June',
      },
      {
        name: 'Watermelon',
        icon: 'water-outline',
        sowing: 'Feb-March',
        harvest: 'May-June',
      },
    ],
  },
];

const seasonColors: Record<string, { bg: string; accent: string }> = {
  'Kharif (Monsoon)': { bg: '#E8F5E9', accent: '#2E7D32' },
  'Rabi (Winter)': { bg: '#E3F2FD', accent: '#1565C0' },
  'Zaid (Summer)': { bg: '#FFF8E1', accent: '#F57F17' },
};

function SeasonSection({ season, index }: { 
  season: SeasonData; 
  index: number 
}) {
  const colors = seasonColors[season.season] || { bg: '#F0F0F0', accent: '#666' };

  return (
    <View style={styles.seasonCard}>
      <View style={[styles.seasonHeader, { backgroundColor: colors.bg }]}>
        <View style={[styles.seasonDot, { backgroundColor: colors.accent }]} />
        <View style={styles.seasonTextWrap}>
          <Text style={[styles.seasonName, { color: colors.accent }]}>
            {season.season}
          </Text>
          <Text style={styles.seasonMonths}>{season.months}</Text>
        </View>
      </View>

      {season.crops.map((crop, i) => (
        <View key={crop.name}>
          <View style={styles.cropRow}>
            <View style={[styles.cropIconWrap, { backgroundColor: colors.bg }]}>
              <Icon name={crop.icon as any} size={18} color={colors.accent} />
            </View>
            <View style={styles.cropInfo}>
              <Text style={styles.cropName}>{crop.name}</Text>
              <View style={styles.cropTimeline}>
                <View style={styles.timelineItem}>
                  <Icon name="arrow-down-circle-outline" size={12} color="#4CAF50" />
                  <Text style={styles.timelineLabel}>Sowing: </Text>
                  <Text style={styles.timelineValue}>{crop.sowing}</Text>
                </View>
                <View style={styles.timelineItem}>
                  <Icon name="arrow-up-circle-outline" size={12} color={colors.accent} />
                  <Text style={styles.timelineLabel}>Harvest: </Text>
                  <Text style={styles.timelineValue}>{crop.harvest}</Text>
                </View>
              </View>
            </View>
          </View>
          {i < season.crops.length - 1 && <View style={styles.cropDivider} />}
        </View>
      ))}
    </View>
  );
}

export default function CropCalendarScreen({ navigation }) {
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
        <Text style={styles.headerTitle}>Crop Calendar</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cropCalendarData.map((season, index) => (
          <SeasonSection 
            key={season.season} 
            season={season} 
            index={index} 
          />
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
  seasonCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
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
    fontWeight: '700',
  },
  seasonMonths: {
    fontSize: 12,
    color: '#666',
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
    color: '#000',
    fontWeight: '600',
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
    color: '#666',
    fontWeight: '500',
  },
  timelineValue: {
    fontSize: 11,
    color: '#000',
    fontWeight: '600',
  },
  cropDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 14,
  },
});
