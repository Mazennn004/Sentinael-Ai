import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useMotionPermission } from "@/hooks/useMotionPermission";

export default function MotionPermissionScreen() {
  const insets = useSafeAreaInsets();
  const { requestPermission, checkPermission } = useMotionPermission();
  const [isRequesting, setIsRequesting] = useState(false);

  // On mount: if motion permission already granted, skip to location screen
  useEffect(() => {
    checkPermission().then((granted) => {
      if (granted) {
        router.replace("/(onboarding)/location-permission");
      }
    });
  }, []);

  const handleAllow = async () => {
    setIsRequesting(true);
    await requestPermission();
    setIsRequesting(false);
    // Navigate to location permission regardless of result
    // (user can still use the app with degraded functionality)
    router.push("/(onboarding)/location-permission");
  };

  return (
    <View className="flex-1 bg-dark-950" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <LinearGradient
        colors={["#060A0F", "#0A0E17", "#0A1018"]}
        className="absolute inset-0"
      />

      <View className="flex-1 px-7 justify-center">
        <Animated.View entering={FadeInDown.duration(600).springify()} className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-[rgba(0,180,200,0.08)] items-center justify-center border border-[rgba(0,180,200,0.15)] mb-6">
            <Ionicons name="speedometer-outline" size={48} color="#00B4C6" />
          </View>
          <Text className="text-[28px] font-extrabold text-white text-center mb-4">
            Motion Sensor
          </Text>
          <Text className="text-[15px] text-white/50 text-center leading-[24px]">
            Sentinel AI relies on your device's accelerometer and gyroscope to detect sudden G-force spikes and unusual rotation associated with accidents in real-time.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(600).springify()} className="bg-[rgba(10,18,30,0.8)] rounded-2xl p-5 border border-[rgba(0,180,200,0.08)] mb-8">
          <View className="flex-row items-center gap-3 mb-4">
            <Ionicons name="shield-checkmark-outline" size={20} color="#00E68A" />
            <Text className="text-white font-bold text-[15px]">Why we need it</Text>
          </View>
          <View className="gap-3">
             <View className="flex-row items-start gap-3">
              <Ionicons name="ellipse" size={6} color="#00B4C6" style={{ marginTop: 8 }} />
              <Text className="text-white/40 text-[14px] flex-1 leading-[20px]">Detect crashes accurately with high-frequency sampling</Text>
            </View>
            <View className="flex-row items-start gap-3">
              <Ionicons name="ellipse" size={6} color="#00B4C6" style={{ marginTop: 8 }} />
              <Text className="text-white/40 text-[14px] flex-1 leading-[20px]">Measure impact severity (G-Force) automatically</Text>
            </View>
            <View className="flex-row items-start gap-3">
              <Ionicons name="ellipse" size={6} color="#00B4C6" style={{ marginTop: 8 }} />
              <Text className="text-white/40 text-[14px] flex-1 leading-[20px]">Operate seamlessly in the background without draining battery</Text>
            </View>
          </View>
        </Animated.View>
      </View>

      <Animated.View entering={FadeIn.delay(400).duration(600)} className="px-7 pb-6 pt-4">
        <TouchableOpacity
          onPress={handleAllow}
          activeOpacity={0.85}
          disabled={isRequesting}
          className="rounded-[14px] overflow-hidden"
          style={{ opacity: isRequesting ? 0.6 : 1 }}
        >
          <LinearGradient
            colors={["#00D4E6", "#00B4C6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 18, gap: 8}}
          >
            <Text className="text-dark-950 text-base font-bold tracking-wide">
              {isRequesting ? "Requesting..." : "Allow Access"}
            </Text>
            {!isRequesting && (
              <Ionicons name="arrow-forward" size={20} color="#060A0F" />
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
