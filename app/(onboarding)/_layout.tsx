import React from "react";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#05080F" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="motion-permission" />
      <Stack.Screen name="location-permission" />
    </Stack>
  );
}
