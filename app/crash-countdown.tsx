import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const TIMER_SIZE = 120;
const TIMER_RADIUS = 48;
const TIMER_STROKE = 4;
const TIMER_CIRCUMFERENCE = 2 * Math.PI * TIMER_RADIUS;

export default function CrashCountdownScreen() {
  const insets = useSafeAreaInsets();
  const [countdown, setCountdown] = useState(10);
  const [isCancelled, setIsCancelled] = useState(false);

  // Animations
  const ring1Scale = useSharedValue(0.6);
  const ring2Scale = useSharedValue(0.5);
  const ring3Scale = useSharedValue(0.4);
  const ring1Opacity = useSharedValue(0.3);
  const ring2Opacity = useSharedValue(0.2);
  const ring3Opacity = useSharedValue(0.15);
  const warningPulse = useSharedValue(1);
  const timerProgress = useSharedValue(0);

  useEffect(() => {
    // Expanding red pulse rings
    ring1Scale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 2000, easing: Easing.out(Easing.cubic) }),
        withTiming(0.6, { duration: 0 })
      ),
      -1, false
    );
    ring1Opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 2000 }),
        withTiming(0.3, { duration: 0 })
      ),
      -1, false
    );

    ring2Scale.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 600 }),
        withTiming(1.3, { duration: 2000, easing: Easing.out(Easing.cubic) }),
        withTiming(0.5, { duration: 0 })
      ),
      -1, false
    );
    ring2Opacity.value = withRepeat(
      withSequence(
        withTiming(0.2, { duration: 600 }),
        withTiming(0, { duration: 2000 }),
        withTiming(0.2, { duration: 0 })
      ),
      -1, false
    );

    ring3Scale.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 1200 }),
        withTiming(1.3, { duration: 2000, easing: Easing.out(Easing.cubic) }),
        withTiming(0.4, { duration: 0 })
      ),
      -1, false
    );
    ring3Opacity.value = withRepeat(
      withSequence(
        withTiming(0.15, { duration: 1200 }),
        withTiming(0, { duration: 2000 }),
        withTiming(0.15, { duration: 0 })
      ),
      -1, false
    );

    // Warning icon pulse
    warningPulse.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1, true
    );

    // Circular timer progress (10 seconds)
    timerProgress.value = withTiming(1, {
      duration: 10000,
      easing: Easing.linear,
    });
  }, []);

  useEffect(() => {
    if (isCancelled) return;
    if (countdown <= 0) {
      router.replace("/processing" as any);
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, isCancelled]);

  const handleDismiss = useCallback(() => {
    setIsCancelled(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    cancelAnimation(ring1Scale);
    cancelAnimation(ring2Scale);
    cancelAnimation(ring3Scale);
    cancelAnimation(warningPulse);
    cancelAnimation(timerProgress);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)" as any);
    }
  }, []);

  const handleSOS = useCallback(() => {
    setIsCancelled(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    router.replace("/processing" as any);
  }, []);

  const ring1Style = useAnimatedStyle(() => ({
    transform: [{ scale: ring1Scale.value }],
    opacity: ring1Opacity.value,
  }));
  const ring2Style = useAnimatedStyle(() => ({
    transform: [{ scale: ring2Scale.value }],
    opacity: ring2Opacity.value,
  }));
  const ring3Style = useAnimatedStyle(() => ({
    transform: [{ scale: ring3Scale.value }],
    opacity: ring3Opacity.value,
  }));
  const warningStyle = useAnimatedStyle(() => ({
    transform: [{ scale: warningPulse.value }],
  }));

  const timerProps = useAnimatedProps(() => ({
    strokeDashoffset: TIMER_CIRCUMFERENCE * (1 - timerProgress.value),
  }));

  return (
    <View className="flex-1 bg-[#060A0F]" style={{ paddingTop: insets.top }}>
      <LinearGradient
        colors={["#060A0F", "#120808", "#060A0F"]}
        className="absolute inset-0"
      />

      {/* Subtle grid overlay */}
      <View className="absolute inset-0 opacity-[0.03]">
        {Array.from({ length: 30 }).map((_, i) => (
          <View key={i} className="h-px bg-white" style={{ marginTop: 30 }} />
        ))}
      </View>

      {/* Top badge */}
      <View className="items-center mt-6">
        <View className="flex-row items-center bg-[rgba(255,59,92,0.08)] px-5 py-2.5 rounded-full gap-2 border border-[rgba(255,59,92,0.15)]">
          <View className="w-2 h-2 rounded-full bg-severity-critical" />
          <Text className="text-[11px] text-severity-critical font-bold tracking-[2px]">
            CRITICAL SEVERITY IMPACT
          </Text>
        </View>
      </View>

      {/* Center: Warning icon with red pulse rings */}
      <View className="items-center justify-center mt-8">
        <View className="items-center justify-center w-[260px] h-[260px]">
          {/* Expanding pulse rings */}
          <Animated.View style={ring3Style} className="absolute w-[260px] h-[260px] rounded-full border border-severity-critical/20" />
          <Animated.View style={ring2Style} className="absolute w-[220px] h-[220px] rounded-full border border-severity-critical/25" />
          <Animated.View style={ring1Style} className="absolute w-[180px] h-[180px] rounded-full border-2 border-severity-critical/30" />

          {/* Warning triangle */}
          <Animated.View style={warningStyle}>
            <View className="w-[90px] h-[90px] items-center justify-center">
              <Ionicons name="warning-outline" size={72} color="#FF3B5C" />
            </View>
          </Animated.View>
        </View>
      </View>

      {/* Title */}
      <View className="items-center mt-2 px-10">
        <Text className="text-[32px] font-black text-white text-center leading-[38px]">
          Accident{"\n"}Detected!
        </Text>
        <Text className="text-[15px] text-white/40 text-center mt-3 leading-[22px]">
          We detected a severe collision. Authorities will be notified automatically in:
        </Text>
      </View>

      {/* Circular countdown timer */}
      <View className="items-center mt-6">
        <View style={{ width: TIMER_SIZE, height: TIMER_SIZE }}>
          <Svg width={TIMER_SIZE} height={TIMER_SIZE}>
            {/* Background ring */}
            <Circle
              cx={TIMER_SIZE / 2}
              cy={TIMER_SIZE / 2}
              r={TIMER_RADIUS}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={TIMER_STROKE}
              fill="rgba(10,14,23,0.6)"
            />
            {/* Progress ring (red, depleting) */}
            <AnimatedCircle
              cx={TIMER_SIZE / 2}
              cy={TIMER_SIZE / 2}
              r={TIMER_RADIUS}
              stroke="#FF3B5C"
              strokeWidth={TIMER_STROKE}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={TIMER_CIRCUMFERENCE}
              animatedProps={timerProps}
              rotation={-90}
              origin={`${TIMER_SIZE / 2}, ${TIMER_SIZE / 2}`}
            />
          </Svg>
          {/* Timer text */}
          <View className="absolute inset-0 items-center justify-center">
            <Text className="text-[36px] font-black text-white leading-[40px]">
              {countdown}
            </Text>
            <Text className="text-[11px] font-bold text-severity-critical tracking-[2px] -mt-0.5">
              SEC
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom buttons */}
      <View className="flex-1" />
      <View className="px-5 gap-3" style={{ paddingBottom: (insets.bottom || 16) + 12 }}>
        {/* SOS Button */}
        {/* <TouchableOpacity
          onPress={handleSOS}
          activeOpacity={0.85}
          className="rounded-2xl overflow-hidden"
        >
          <LinearGradient
            colors={["#FF3B5C", "#E0334F"]}
            
            className="flex-row items-center justify-center py-4.5 gap-2.5"
          >
            <Ionicons name="call" size={20} color="#fff" />
            <Text className="text-white text-[16px] font-bold">
              Report to Authorities (SOS)
            </Text>
          </LinearGradient>
        </TouchableOpacity> */}

        {/* Dismiss Button */}
        <TouchableOpacity
          onPress={handleDismiss}
          activeOpacity={0.7}
          className="flex-row  items-center justify-center py-4 rounded-2xl bg-red-600 border border-white/[0.06] gap-2"
        >
          <Ionicons name="close" size={18} color="rgba(255,255,255,0.5)" />
          <Text className="text-white text-[25px] font-semibold">
           I'M OKAY
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
