import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Platform,
  RefreshControl,
  StatusBar,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

// Mock data types
interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
}

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
  icon: string;
  rainfall: number;
  visibility: number;
  tempMin: number;
  tempMax: number;
}

interface ForecastData {
  date: string;
  dayName: string;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  humidity: number;
  rainfall: number;
}

interface SoilInfo {
  soilType: string;
  majorCrops: string;
  irrigation: string;
}

// Mock components
const WeatherCard = ({ icon, label, value, unit, color }: any) => (
  <View style={[styles.weatherCard, { borderLeftColor: color }]}>
    <Icon name={icon} size={20} color={color} />
    <View style={styles.weatherCardText}>
      <Text style={styles.weatherCardLabel}>{label}</Text>
      <Text style={styles.weatherCardValue}>{value} <Text style={styles.weatherCardUnit}>{unit}</Text></Text>
    </View>
  </View>
);

const Footer = () => <View style={{ height: 60, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E0E0E0' }} />;

const DrawerMenu = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <View style={styles.drawerOverlay}>
      <View style={styles.drawerContent}>
        <Pressable style={styles.drawerClose} onPress={onClose}>
          <Icon name="close" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.drawerTitle}>Menu</Text>
        <Text style={styles.drawerItem}>Dashboard</Text>
        <Text style={styles.drawerItem}>Crop Calendar</Text>
        <Text style={styles.drawerItem}>Community</Text>
      </View>
    </View>
  </Modal>
);

export default function DashboardScreen({ navigation }: { navigation?: any }) {
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);
  const [soilInfo, setSoilInfo] = useState<SoilInfo | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);

  // Mock location data for demo
  const mockLocation = { latitude: 28.6139, longitude: 77.2090, city: 'New Delhi', state: 'Delhi' };
  const mockWeather: WeatherData = {
    temp: 28,
    feelsLike: 30,
    humidity: 65,
    pressure: 1013,
    windSpeed: 12,
    description: 'partly cloudy',
    icon: '02d',
    rainfall: 0,
    visibility: 10,
    tempMin: 26,
    tempMax: 31,
  };
  const mockForecast: ForecastData[] = [
    { date: '2026-02-12', dayName: 'Thu', tempMin: 24, tempMax: 30, description: 'sunny', icon: '01d', humidity: 60, rainfall: 0 },
    { date: '2026-02-13', dayName: 'Fri', tempMin: 25, tempMax: 32, description: 'cloudy', icon: '04d', humidity: 70, rainfall: 2 },
  ];
  const mockSoil: SoilInfo = {
    soilType: 'Alluvial Soil',
    majorCrops: 'Wheat, Rice, Sugarcane',
    irrigation: 'Canal & Tube well',
  };

  const fetchLocationAndWeather = useCallback(async () => {
    try {
      setLoading(true);
      setLocationError(false);
      setRefreshing(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock location (simulate geolocation)
      setLocation(mockLocation);
      
      // Mock soil data
      setSoilInfo(mockSoil);
      
      // Mock weather
      setWeather(mockWeather);
      
      // Mock forecast
      setForecast(mockForecast);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setLocationError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLocationAndWeather();
  }, [fetchLocationAndWeather]);

  const onRefresh = () => {
    fetchLocationAndWeather();
  };

  const getWeatherIconName = (iconCode: string) => {
    if (iconCode.includes('01')) return 'sunny';
    if (iconCode.includes('02')) return 'partly-sunny';
    if (iconCode.includes('03') || iconCode.includes('04')) return 'cloudy';
    if (iconCode.includes('09') || iconCode.includes('10')) return 'rainy';
    if (iconCode.includes('11')) return 'thunderstorm';
    if (iconCode.includes('13')) return 'snow';
    if (iconCode.includes('50')) return 'cloud';
    return 'sunny';
  };

  const handleNavigation = (screen: string) => {
    setDrawerVisible(false);
    if (navigation) {
      navigation.navigate(screen);
    } else {
      Alert.alert('Navigation', `Navigate to ${screen}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Detecting location...</Text>
      </View>
    );
  }

  if (locationError) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.errorIcon}>
          <Icon name="location-outline" size={48} color="#f44336" />
        </View>
        <Text style={styles.errorText}>Location access denied</Text>
        <Pressable style={styles.retryBtn} onPress={fetchLocationAndWeather}>
          <Text style={styles.retryText}>Enable Location</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DrawerMenu visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
      
      <LinearGradient
        colors={['#1B5E20', '#2E7D32', '#43A047']}
        style={styles.topHeader}
      >
        <View style={styles.headerRow}>
          <Pressable onPress={() => setDrawerVisible(true)} style={styles.menuBtn}>
            <Icon name="menu" size={24} color="#fff" />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>FarmGPT</Text>
          </View>
          <Pressable onPress={() => handleNavigation('language')} style={styles.langBtn}>
            <Icon name="language" size={18} color="#fff" />
          </Pressable>
        </View>

        {location && (
          <View style={styles.locationRow}>
            <Icon name="location" size={14} color="#A5D6A7" />
            <Text style={styles.locationText}>{location.city}, {location.state}</Text>
          </View>
        )}

        {weather && (
          <View style={styles.mainWeather}>
            <View style={styles.tempSection}>
              <Icon name={getWeatherIconName(weather.icon)} size={40} color="#FFD54F" />
              <Text style={styles.bigTemp}>{weather.temp}°C</Text>
            </View>
            <Text style={styles.weatherDesc}>
              {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
            </Text>
            <Text style={styles.feelsLike}>Feels like {weather.feelsLike}°C</Text>
          </View>
        )}
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} />
        }
      >
        {weather && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weather</Text>
            <View style={styles.cardsGrid}>
              <WeatherCard icon="thermometer-outline" label="Temperature" value={weather.temp.toString()} unit="°C" color="#E65100" />
              <WeatherCard icon="water-outline" label="Humidity" value={weather.humidity.toString()} unit="%" color="#1565C0" />
              <WeatherCard icon="rainy-outline" label="Rainfall" value={weather.rainfall.toString()} unit="mm" color="#0277BD" />
              <WeatherCard icon="speedometer-outline" label="Wind Speed" value={weather.windSpeed.toString()} unit="km/h" color="#00695C" />
            </View>
          </View>
        )}

        {soilInfo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Soil Information</Text>
            <View style={styles.soilCard}>
              <View style={styles.soilRow}>
                <View style={styles.soilIconWrap}>
                  <Icon name="earth" size={18} color="#4CAF50" />
                </View>
                <View style={styles.soilTextWrap}>
                  <Text style={styles.soilLabel}>Soil Type</Text>
                  <Text style={styles.soilValue}>{soilInfo.soilType}</Text>
                </View>
              </View>
              <View style={styles.soilDivider} />
              <View style={styles.soilRow}>
                <View style={styles.soilIconWrap}>
                  <Icon name="leaf" size={18} color="#4CAF50" />
                </View>
                <View style={styles.soilTextWrap}>
                  <Text style={styles.soilLabel}>Major Crops</Text>
                  <Text style={styles.soilValue}>{soilInfo.majorCrops}</Text>
                </View>
              </View>
              <View style={styles.soilDivider} />
              <View style={styles.soilRow}>
                <View style={styles.soilIconWrap}>
                  <Icon name="water" size={18} color="#1565C0" />
                </View>
                <View style={styles.soilTextWrap}>
                  <Text style={styles.soilLabel}>Irrigation</Text>
                  <Text style={styles.soilValue}>{soilInfo.irrigation}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How can we help?</Text>
          <View style={styles.helpOptions}>
            <Pressable style={({ pressed }) => [styles.helpCard, pressed && styles.helpCardPressed]}
              onPress={() => handleNavigation('recommendations')}>
              <LinearGrad
