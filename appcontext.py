import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '@/data/translations';

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

interface ForecastDay {
  date: string;
  dayName: string;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  humidity: number;
  rainfall: number;
}

interface CommunityMessage {
  id: string;
  text: string;
  author: string;
  timestamp: number;
}

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  location: LocationData | null;
  setLocation: (loc: LocationData) => void;
  weather: WeatherData | null;
  setWeather: (w: WeatherData) => void;
  forecast: ForecastDay[];
  setForecast: (f: ForecastDay[]) => void;
  communityMessages: CommunityMessage[];
  addCommunityMessage: (text: string, author: string) => void;
  isLanguageLoaded: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [communityMessages, setCommunityMessages] = useState<CommunityMessage[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('farmgpt_language');
        if (savedLang === 'en' || savedLang === 'hi') {
          setLanguageState(savedLang);
        }
        const savedMessages = await AsyncStorage.getItem('farmgpt_community');
        if (savedMessages) {
          setCommunityMessages(JSON.parse(savedMessages));
        }
      } catch (e) {
        console.error('Failed to load data:', e);
      }
      setIsLanguageLoaded(true);
    };
    loadData();
  }, []);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    try {
      await AsyncStorage.setItem('farmgpt_language', lang);
    } catch (e) {
      console.error('Failed to save language:', e);
    }
  };

  const addCommunityMessage = async (text: string, author: string) => {
    const newMessage: CommunityMessage = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text,
      author,
      timestamp: Date.now(),
    };
    const updated = [newMessage, ...communityMessages];
    setCommunityMessages(updated);
    try {
      await AsyncStorage.setItem('farmgpt_community', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save messages:', e);
    }
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      location,
      setLocation,
      weather,
      setWeather,
      forecast,
      setForecast,
      communityMessages,
      addCommunityMessage,
      isLanguageLoaded,
    }),
    [language, location, weather, forecast, communityMessages, isLanguageLoaded]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export type { LocationData, WeatherData, ForecastDay, CommunityMessage };
