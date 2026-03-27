import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function DashcamScreen() {
  const insets = useSafeAreaInsets();
  const [isConnected, setIsConnected] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  const liveDot = useSharedValue(0.4);
  const scanLine = useSharedValue(0);

  useEffect(() => {
    liveDot.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.4, { duration: 800 })
      ),
      -1,
      true
    );

    scanLine.value = withRepeat(
      withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.cubic) }),
      -1,
      true
    );
  }, []);

  const liveDotStyle = useAnimatedStyle(() => ({
    opacity: liveDot.value,
  }));

  const scanLineStyle = useAnimatedStyle(() => ({
    top: `${scanLine.value * 100}%`,
  }));

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsConnected(true);
    }, 2500);
  };

  return (
    <View className="flex-1 bg-dark-950" style={{ paddingTop: insets.top }}>
      <LinearGradient
        colors={["#060A0F", "#0A0E17", "#0A1018"]}
        className="absolute inset-0"
      />

      {/* Header */}
      <View className="flex-row items-center px-5 pt-3 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl bg-white/[0.04] items-center justify-center mr-3"
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-[10px] text-white/30 font-bold tracking-[2px] uppercase">
            Live Feed
          </Text>
          <Text className="text-xl font-extrabold text-white">Dashcam</Text>
        </View>
        <View
          className={`flex-row items-center px-3 py-1.5 rounded-full gap-1.5 border ${
            isConnected
              ? "bg-[rgba(0,200,130,0.08)] border-[rgba(0,200,130,0.2)]"
              : "bg-[rgba(255,59,92,0.08)] border-[rgba(255,59,92,0.15)]"
          }`}
        >
          <Animated.View style={liveDotStyle}>
            <View
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: isConnected ? "#00E68A" : "#FF3B5C" }}
            />
          </Animated.View>
          <Text
            className="text-[10px] font-bold tracking-wider"
            style={{ color: isConnected ? "#00E68A" : "#FF3B5C" }}
          >
            {isConnected ? "LIVE" : "OFFLINE"}
          </Text>
        </View>
      </View>

      {/* Video Feed Viewport */}
      <View className="mx-5 rounded-2xl overflow-hidden border border-[rgba(0,180,200,0.08)] mb-5">
        <View className="h-[220px] bg-[rgba(5,10,18,0.95)] items-center justify-center relative">
          {/* Grid overlay */}
          <View className="absolute inset-0 opacity-[0.04]">
            {Array.from({ length: 8 }).map((_, i) => (
              <View key={`h${i}`} className="h-px bg-white" style={{ marginTop: 28 }} />
            ))}
          </View>

          {/* Scan line */}
          <Animated.View
            style={scanLineStyle}
            className="absolute left-0 right-0 h-px bg-[rgba(0,180,200,0.15)]"
          />

          {/* Center content */}
          {isConnected ? (
            <View className="items-center gap-2">
              <View className="w-16 h-16 rounded-2xl bg-[rgba(0,180,200,0.06)] items-center justify-center border border-[rgba(0,180,200,0.1)]">
                <Ionicons name="videocam" size={28} color="rgba(0,180,200,0.4)" />
              </View>
              <Text className="text-sm text-white/30 font-medium">
                Dashcam feed active
              </Text>
              <Text className="text-[10px] text-white/15 font-mono">
                CAM: FRONT_MAIN • 1080p @ 30fps
              </Text>
            </View>
          ) : (
            <View className="items-center gap-2">
              <Ionicons name="videocam-off-outline" size={40} color="rgba(255,59,92,0.4)" />
              <Text className="text-sm text-white/30 font-medium">
                No dashcam signal
              </Text>
            </View>
          )}

          {/* REC badge */}
          {isConnected && (
            <View className="absolute top-3 left-3 flex-row items-center gap-1.5">
              <Animated.View style={liveDotStyle}>
                <View className="w-2 h-2 rounded-full bg-severity-critical" />
              </Animated.View>
              <Text className="text-[10px] text-severity-critical font-bold font-mono tracking-wider">
                REC
              </Text>
            </View>
          )}

          {/* Timestamp */}
          {isConnected && (
            <View className="absolute bottom-3 right-3">
              <Text className="text-[9px] text-white/20 font-mono">
                {new Date().toLocaleTimeString()}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Connection Details */}
      <View className="mx-5 bg-[rgba(10,18,30,0.8)] rounded-2xl p-4 border border-[rgba(0,180,200,0.08)] mb-4">
        <View className="flex-row items-center gap-2 mb-4">
          <Ionicons name="hardware-chip-outline" size={14} color="#00B4C6" />
          <Text className="text-[10px] font-bold text-white/30 tracking-[2px] uppercase">
            Connection Details
          </Text>
        </View>

        <View className="gap-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-[13px] text-white/35">Device</Text>
            <Text className="text-[13px] text-white/70 font-semibold font-mono">
              Sentinel Cam Pro
            </Text>
          </View>
          <View className="h-px bg-white/[0.03]" />
          <View className="flex-row justify-between items-center">
            <Text className="text-[13px] text-white/35">Protocol</Text>
            <Text className="text-[13px] text-white/70 font-semibold font-mono">
              WiFi Direct
            </Text>
          </View>
          <View className="h-px bg-white/[0.03]" />
          <View className="flex-row justify-between items-center">
            <Text className="text-[13px] text-white/35">Signal</Text>
            <View className="flex-row items-center gap-1.5">
              <View className="flex-row gap-0.5 items-end">
                <View className="w-1 h-1.5 bg-[#00E68A] rounded-sm" />
                <View className="w-1 h-2.5 bg-[#00E68A] rounded-sm" />
                <View className="w-1 h-3.5 bg-[#00E68A] rounded-sm" />
                <View className="w-1 h-4.5 bg-white/10 rounded-sm" />
              </View>
              <Text className="text-[13px] text-[#00E68A] font-semibold font-mono">
                Good
              </Text>
            </View>
          </View>
          <View className="h-px bg-white/[0.03]" />
          <View className="flex-row justify-between items-center">
            <Text className="text-[13px] text-white/35">Resolution</Text>
            <Text className="text-[13px] text-white/70 font-semibold font-mono">
              1920 × 1080
            </Text>
          </View>
          <View className="h-px bg-white/[0.03]" />
          <View className="flex-row justify-between items-center">
            <Text className="text-[13px] text-white/35">Storage</Text>
            <Text className="text-[13px] text-white/70 font-semibold font-mono">
              48.2 / 128 GB
            </Text>
          </View>
        </View>
      </View>

      {/* Verify Connection Button */}
      <View className="mx-5">
        <TouchableOpacity
          onPress={handleVerify}
          activeOpacity={0.85}
          disabled={isVerifying}
          className="rounded-xl overflow-hidden"
        >
          <LinearGradient
            colors={isVerifying ? ["#1A2332", "#141C28"] : ["#00D4E6", "#00B4C6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 14, gap: 8 }}
          >
            <Ionicons
              name={isVerifying ? "sync" : "shield-checkmark-outline"}
              size={18}
              color={isVerifying ? "#00B4C6" : "#060A0F"}
            />
            <Text
              className="text-base font-bold"
              style={{ color: isVerifying ? "#00B4C6" : "#060A0F" }}
            >
              {isVerifying ? "Verifying..." : "Verify Connection"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
