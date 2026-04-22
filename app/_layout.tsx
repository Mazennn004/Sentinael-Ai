import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#05080F" },
            animation: "fade",
          }}
        >
          {/* Auth screens */}
          <Stack.Screen name="(auth)" />
          {/* Onboarding screens */}
          <Stack.Screen name="(onboarding)" />
          {/* Main tab screens */}
          <Stack.Screen name="(tabs)" />
          {/* Modal screens */}
          <Stack.Screen
            name="crash-countdown"
            options={{
              presentation: "fullScreenModal",
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="processing"
            options={{
              presentation: "fullScreenModal",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="report/[id]"
            options={{
              animation: "slide_from_right",
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
