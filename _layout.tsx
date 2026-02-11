import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { queryClient } from "@/lib/query-client";
import { AppProvider } from "@/context/AppContext";

const Stack = createStackNavigator();

function RootLayoutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'pop',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="language" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="recommendations" />
      <Stack.Screen name="weather-detail" />
      <Stack.Screen name="schemes" />
      <Stack.Screen name="community" />
      <Stack.Screen name="crop-calendar" />
      <Stack.Screen name="about" />
    </Stack.Navigator>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppProvider>
            <NavigationContainer>
              <RootLayoutNav />
            </NavigationContainer>
          </AppProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
