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
import LinearGradient from 'react-native-linear-gradient';

// Mock weather data
const weather = {
  temp: 28,
  feelsLike: 30,
  humidity: 65,
  pressure: 1013,
  windSpeed: 12,
  description: 'partly cloudy',
  icon: '02d',
  rainfall: 0,
  visibility: 10,
};

const location = {
  city: 'New Delhi',
  state: 'Delhi',
};

const forecast = [
  { date: '2026-02-13', dayName: 'Fri', tempMin: 25, tempMax: 32, description: 'cloudy', icon: '04d' },
  { date: '2026-02-14', dayName: 'Sat', tempMin: 24, tempMax: 31, description: 'sunny', icon: '01d' },
  { date: '2026-02-15', dayName: 'Sun', tempMin: 26, tempMax: 33, description: 'rainy', icon: '10d' },
  { date: '2026-02-16', dayName: 'Mon', tempMin: 27, tempMax: 34, description: 'partly cloudy', icon: '02d' },
  { date: '2026-02-17', dayName: 'Tue', tempMin: 25, tempMax: 32, description: 'thunderstorm', icon: '11d' },
];

function ForecastItem({ day, index }: { day: any; index: number }) {
  const getIcon = (desc: string) => {
    const d = desc.toLowerCase();
    if (d.includes('rain')) return 'rainy-outline';
    if (d.includes('cloud')) return 'cloudy-outline';
    if (d.includes('clear') || d.includes('sun')) return 'sunny-outline';
    if (d.includes('thunder')) return 'thunderstorm-outline';
    if (d.includes('snow')) return 'snow-outline';
    if (d.includes('mist') || d.includes('haze') || d.includes('fog')) return 'cloud-outline';
    return 'partly-sunny-outline';
  };

  return (
    <View style={styles.forecastRow}>
      <Text style={styles.forecastDay}>{day.dayName}</Text>
      <Icon name={getIcon(day.description)} size={20} color="#4CAF50" />
      <Text style={styles.forecastDesc} numberOfLines={1}>
        {day.description.charAt(0).toUpperCase() + day.description.slice(1)}
      </Text>
      <View style={styles.forecastTemps}>
        <Text style={styles.forecastHigh}>{day.tempMax}°</Text>
        <Text style={styles.forecastLow}>{day.tempMin}°</Text>
      </View>
    </View>
  );
}

export default function WeatherDetailScreen({ navigation }: { navigation?: any }) {
  const getWeatherIconName = (iconCode: string) => {
    if (iconCode?.includes('01')) return 'sunny-outline';
    if (iconCode?.includes('02')) return 'partly-sunny-outline';
    if (iconCode?.includes('03') || iconCode?.includes('04')) return 'cloudy-outline';
    if (iconCode?.includes('09') || iconCode?.includes('10')) return 'rainy-outline';
    if (iconCode?.includes('11')) return 'thunderstorm-outline';
    if (iconCode?.includes('13')) return 'snow-outline';
    if (iconCode?.includes('50')) return 'cloud-outline';
    return 'sunny-outline';
  };

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      console.log('Go back pressed');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D47A1" />
      
      <LinearGradient
        colors={['#0D47A1', '#1565C0', '#1976D2']}
        style={styles.topSection}
      >
        <View style={styles.headerRow}>
          <Pressable onPress={handleBackPress} style={styles.backBtn}>
            <Icon name="arrow-back" size={22} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Weather Details</Text>
          <View style={{ width: 30 }} />
        </View>

        <View style={styles.currentWeather}>
          <Icon
            name={getWeatherIconName(weather.icon)}
            size={56}
            color="#FFD54F"
          />
          <Text style={styles.bigTemp}>{weather.temp}°C</Text>
          <Text style={styles.desc}>
            {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
          </Text>
          <View style={styles.locRow}>
            <Icon name="location" size={12} color="rgba(255,255,255,0.6)" />
            <Text style={styles.locText}>{location.city}, {location.state}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.detailsGrid}>
          <View style={styles.detailCard}>
            <Icon name="thermometer-outline" size={18} color="#E65100" />
            <Text style={styles.detailLabel}>Feels Like</Text>
            <Text style={styles.detailValue}>{weather.feelsLike}°C</Text>
          </View>
          <View style={styles.detailCard}>
            <Icon name="water-outline" size={18} color="#1565C0" />
            <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>{weather.humidity}%</Text>
          </View>
          <View style={styles.detailCard}>
            <Icon name="speedometer-outline" size={18} color="#00695C" />
            <Text style={styles.detailLabel}>Wind Speed</Text>
            <Text style={styles.detailValue}>{weather.windSpeed} km/h</Text>
          </View>
          <View style={styles.detailCard}>
            <Icon name="eye-outline" size={18} color="#4527A0" />
            <Text style={styles.detailLabel}>Visibility</Text>
            <Text style={styles.detailValue}>{weather.visibility} km</Text>
          </View>
          <View style={styles.detailCard}>
            <Icon name="push-outline" size={18} color="#BF360C" />
            <Text style={styles.detailLabel}>Pressure</Text>
            <Text style={styles.detailValue}>{weather.pressure} hPa</Text>
          </View>
          <View style={styles.detailCard}>
            <Icon name="rainy-outline" size={18} color="#0277BD" />
            <Text style={styles.detailLabel}>Rainfall</Text>
            <Text style={styles.detailValue}>{weather.rainfall} mm</Text>
          </View>
        </View>

        {forecast.length > 0 && (
          <View style={styles.forecastSection}>
            <Text style={styles.sectionTitle}>7-Day Forecast</Text>
            <View style={styles.forecastCard}>
              {forecast.map((day, index) => (
                <React.Fragment key={day.date}>
                  <ForecastItem day={day} index={index} />
                  {index < forecast.length - 1 && <View style={styles.forecastDivider} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        )}

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
  topSection: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '700',
  },
  currentWeather: {
    alignItems: 'center',
    gap: 4,
  },
  bigTemp: {
    fontSize: 56,
    color: '#fff',
    fontWeight: '700',
    marginTop: 4,
  },
  desc: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: '500',
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    width: '48%',
    flex: 1,
    minWidth: '45%',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },
  forecastSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
    marginBottom: 12,
  },
  forecastCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  forecastDay: {
    width: 36,
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  forecastDesc: {
    flex: 1,
    fontSize: 12,
    color: '#000',
  },
  forecastTemps: {
    flexDirection: 'row',
    gap: 8,
  },
  forecastHigh: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
  },
  forecastLow: {
    fontSize: 14,
    color: '#666',
  },
  forecastDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 14,
  },
});
