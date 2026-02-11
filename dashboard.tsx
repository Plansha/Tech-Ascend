import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Platform,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/context/AppContext';
import { translations } from '@/data/translations';
import { getSoilInfoByState, SoilInfo } from '@/data/soilData';
import Colors from '@/constants/colors';
import WeatherCard from '@/components/WeatherCard';
import Footer from '@/components/Footer';
import DrawerMenu from '@/components/DrawerMenu';
import { getApiUrl } from '@/lib/query-client';

export default function DashboardScreen() {
  const { language, location, setLocation, weather, setWeather, forecast, setForecast } = useApp();
  const t = translations[language];
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);
  const [soilInfo, setSoilInfo] = useState<SoilInfo | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLocationAndWeather = useCallback(async () => {
    try {
      setLoading(true);
      setLocationError(false);

      let coords: { latitude: number; longitude: number };

      if (Platform.OS === 'web') {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
          });
        });
        coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      } else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationError(true);
          setLoading(false);
          return;
        }
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        coords = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
      }

      const baseUrl = getApiUrl();

      const geoUrl = new URL('/api/geocode/reverse', baseUrl);
      geoUrl.searchParams.set('lat', coords.latitude.toString());
      geoUrl.searchParams.set('lon', coords.longitude.toString());
      const geoRes = await fetch(geoUrl.toString());
      const geoData = await geoRes.json();

      let city = 'Unknown';
      let state = 'Unknown';
      if (Array.isArray(geoData) && geoData.length > 0) {
        city = geoData[0].name || 'Unknown';
        state = geoData[0].state || 'Unknown';
      }

      setLocation({ ...coords, city, state });

      const soil = getSoilInfoByState(state);
      setSoilInfo(soil);

      const weatherUrl = new URL('/api/weather/current', baseUrl);
      weatherUrl.searchParams.set('lat', coords.latitude.toString());
      weatherUrl.searchParams.set('lon', coords.longitude.toString());
      const weatherRes = await fetch(weatherUrl.toString());
      const weatherData = await weatherRes.json();

      if (weatherData.main) {
        setWeather({
          temp: Math.round(weatherData.main.temp),
          feelsLike: Math.round(weatherData.main.feels_like),
          humidity: weatherData.main.humidity,
          pressure: weatherData.main.pressure,
          windSpeed: Math.round(weatherData.wind?.speed * 3.6),
          description: weatherData.weather?.[0]?.description || '',
          icon: weatherData.weather?.[0]?.icon || '01d',
          rainfall: weatherData.rain?.['1h'] || weatherData.rain?.['3h'] || 0,
          visibility: Math.round((weatherData.visibility || 10000) / 1000),
          tempMin: Math.round(weatherData.main.temp_min),
          tempMax: Math.round(weatherData.main.temp_max),
        });
      }

      const forecastUrl = new URL('/api/weather/forecast', baseUrl);
      forecastUrl.searchParams.set('lat', coords.latitude.toString());
      forecastUrl.searchParams.set('lon', coords.longitude.toString());
      const forecastRes = await fetch(forecastUrl.toString());
      const forecastData = await forecastRes.json();

      if (forecastData.list) {
        const dailyMap = new Map<string, any>();
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        for (const item of forecastData.list) {
          const date = item.dt_txt.split(' ')[0];
          if (!dailyMap.has(date)) {
            const d = new Date(item.dt * 1000);
            dailyMap.set(date, {
              date,
              dayName: dayNames[d.getDay()],
              tempMin: item.main.temp_min,
              tempMax: item.main.temp_max,
              description: item.weather[0].description,
              icon: item.weather[0].icon,
              humidity: item.main.humidity,
              rainfall: item.rain?.['3h'] || 0,
            });
          } else {
            const existing = dailyMap.get(date);
            existing.tempMin = Math.min(existing.tempMin, item.main.temp_min);
            existing.tempMax = Math.max(existing.tempMax, item.main.temp_max);
            existing.rainfall += item.rain?.['3h'] || 0;
          }
        }

        const forecastArr = Array.from(dailyMap.values())
          .slice(0, 7)
          .map((d) => ({
            ...d,
            tempMin: Math.round(d.tempMin),
            tempMax: Math.round(d.tempMax),
            rainfall: Math.round(d.rainfall * 10) / 10,
          }));

        setForecast(forecastArr);
      }
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
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchLocationAndWeather();
  };

  const getWeatherIconName = (iconCode: string): keyof typeof Ionicons.glyphMap => {
    if (iconCode.includes('01')) return 'sunny';
    if (iconCode.includes('02')) return 'partly-sunny';
    if (iconCode.includes('03') || iconCode.includes('04')) return 'cloudy';
    if (iconCode.includes('09') || iconCode.includes('10')) return 'rainy';
    if (iconCode.includes('11')) return 'thunderstorm';
    if (iconCode.includes('13')) return 'snow';
    if (iconCode.includes('50')) return 'cloud';
    return 'sunny';
  };

  if (loading && !weather) {
    return (
      <View style={[styles.loadingContainer, { paddingTop: topPad }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>{t.detectingLocation}</Text>
      </View>
    );
  }

  if (locationError && !weather) {
    return (
      <View style={[styles.loadingContainer, { paddingTop: topPad }]}>
        <View style={styles.errorIcon}>
          <Ionicons name="location-outline" size={48} color={Colors.error} />
        </View>
        <Text style={styles.errorText}>{t.locationDenied}</Text>
        <Pressable style={styles.retryBtn} onPress={fetchLocationAndWeather}>
          <Text style={styles.retryText}>{t.enableLocation}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DrawerMenu visible={drawerVisible} onClose={() => setDrawerVisible(false)} />

      <LinearGradient
        colors={['#1B5E20', '#2E7D32', '#43A047']}
        style={[styles.topHeader, { paddingTop: topPad + 12 }]}
      >
        <View style={styles.headerRow}>
          <Pressable onPress={() => setDrawerVisible(true)} style={styles.menuBtn}>
            <Ionicons name="menu" size={24} color="#fff" />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>FarmGPT</Text>
          </View>
          <Pressable
            onPress={() => router.push('/language')}
            style={styles.langBtn}
          >
            <Ionicons name="language" size={18} color="#fff" />
          </Pressable>
        </View>

        {location && (
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color="#A5D6A7" />
            <Text style={styles.locationText}>
              {location.city}, {location.state}
            </Text>
          </View>
        )}

        {weather && (
          <View style={styles.mainWeather}>
            <View style={styles.tempSection}>
              <Ionicons
                name={getWeatherIconName(weather.icon)}
                size={40}
                color="#FFD54F"
              />
              <Text style={styles.bigTemp}>{weather.temp}{t.celsius}</Text>
            </View>
            <Text style={styles.weatherDesc}>
              {weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}
            </Text>
            <Text style={styles.feelsLike}>
              {t.feelsLike} {weather.feelsLike}{t.celsius}
            </Text>
          </View>
        )}
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />
        }
      >
        {weather && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.weather}</Text>
            <View style={styles.cardsGrid}>
              <WeatherCard
                icon="thermometer-outline"
                label={t.temperature}
                value={`${weather.temp}`}
                unit={t.celsius}
                color="#E65100"
              />
              <WeatherCard
                icon="water-outline"
                label={t.humidity}
                value={`${weather.humidity}`}
                unit={t.percent}
                color="#1565C0"
              />
              <WeatherCard
                icon="rainy-outline"
                label={t.rainfall}
                value={`${weather.rainfall}`}
                unit={t.mm}
                color="#0277BD"
              />
              <WeatherCard
                icon="speedometer-outline"
                label={t.windSpeed}
                value={`${weather.windSpeed}`}
                unit={t.kmh}
                color="#00695C"
              />
            </View>
          </View>
        )}

        {soilInfo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.soilInfo}</Text>
            <View style={styles.soilCard}>
              <View style={styles.soilRow}>
                <View style={styles.soilIconWrap}>
                  <Ionicons name="earth" size={18} color={Colors.accent} />
                </View>
                <View style={styles.soilTextWrap}>
                  <Text style={styles.soilLabel}>{t.soilType}</Text>
                  <Text style={styles.soilValue}>
                    {language === 'hi' ? soilInfo.soilTypeHi : soilInfo.soilType}
                  </Text>
                </View>
              </View>
              <View style={styles.soilDivider} />
              <View style={styles.soilRow}>
                <View style={styles.soilIconWrap}>
                  <Ionicons name="leaf" size={18} color={Colors.primary} />
                </View>
                <View style={styles.soilTextWrap}>
                  <Text style={styles.soilLabel}>{t.cropsGrown}</Text>
                  <Text style={styles.soilValue}>
                    {language === 'hi' ? soilInfo.majorCropsHi : soilInfo.majorCrops}
                  </Text>
                </View>
              </View>
              <View style={styles.soilDivider} />
              <View style={styles.soilRow}>
                <View style={styles.soilIconWrap}>
                  <Ionicons name="water" size={18} color="#1565C0" />
                </View>
                <View style={styles.soilTextWrap}>
                  <Text style={styles.soilLabel}>{t.irrigationType}</Text>
                  <Text style={styles.soilValue}>
                    {language === 'hi' ? soilInfo.irrigationHi : soilInfo.irrigation}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.howCanIHelp}</Text>
          <View style={styles.helpOptions}>
            <Pressable
              style={({ pressed }) => [styles.helpCard, pressed && styles.helpCardPressed]}
              onPress={() => router.push('/recommendations')}
            >
              <LinearGradient
                colors={['#E8F5E9', '#C8E6C9']}
                style={styles.helpGradient}
              >
                <View style={[styles.helpIconWrap, { backgroundColor: '#2E7D32' }]}>
                  <Ionicons name="leaf" size={24} color="#fff" />
                </View>
                <Text style={styles.helpTitle}>{t.quickRecommendations}</Text>
                <Text style={styles.helpDesc}>{t.quickRecommendationsDesc}</Text>
                <Ionicons name="arrow-forward" size={18} color={Colors.primary} style={styles.helpArrow} />
              </LinearGradient>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.helpCard, pressed && styles.helpCardPressed]}
              onPress={() => router.push('/weather-detail')}
            >
              <LinearGradient
                colors={['#E3F2FD', '#BBDEFB']}
                style={styles.helpGradient}
              >
                <View style={[styles.helpIconWrap, { backgroundColor: '#1565C0' }]}>
                  <Ionicons name="cloud" size={24} color="#fff" />
                </View>
                <Text style={styles.helpTitle}>{t.weatherInfo}</Text>
                <Text style={styles.helpDesc}>{t.weatherInfoDesc}</Text>
                <Ionicons name="arrow-forward" size={18} color="#1565C0" style={styles.helpArrow} />
              </LinearGradient>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.helpCard, pressed && styles.helpCardPressed]}
              onPress={() => router.push('/schemes')}
            >
              <LinearGradient
                colors={['#FFF8E1', '#FFECB3']}
                style={styles.helpGradient}
              >
                <View style={[styles.helpIconWrap, { backgroundColor: '#F57F17' }]}>
                  <Ionicons name="document-text" size={24} color="#fff" />
                </View>
                <Text style={styles.helpTitle}>{t.govSchemes}</Text>
                <Text style={styles.helpDesc}>{t.govSchemesDesc}</Text>
                <Ionicons name="arrow-forward" size={18} color="#F57F17" style={styles.helpArrow} />
              </LinearGradient>
            </Pressable>
          </View>
        </View>

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    gap: 16,
    padding: 24,
  },
  loadingText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_500Medium',
  },
  errorIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
  },
  topHeader: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  menuBtn: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
  },
  langBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 16,
  },
  locationText: {
    color: '#A5D6A7',
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
  },
  mainWeather: {
    alignItems: 'center',
    gap: 4,
  },
  tempSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bigTemp: {
    fontSize: 48,
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
  },
  weatherDesc: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
  },
  feelsLike: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: Colors.text,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 12,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  soilCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  soilRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  soilIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  soilTextWrap: {
    flex: 1,
  },
  soilLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_500Medium',
  },
  soilValue: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: 'Poppins_600SemiBold',
  },
  soilDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 10,
    marginLeft: 48,
  },
  helpOptions: {
    gap: 12,
  },
  helpCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  helpCardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  helpGradient: {
    padding: 18,
    borderRadius: 16,
  },
  helpIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  helpTitle: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  helpDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 18,
  },
  helpArrow: {
    position: 'absolute',
    right: 18,
    top: 18,
  },
});
