import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";

const AnimatedPolyline = Animated.createAnimatedComponent(Polyline);

interface SensorCardProps {
  label: string;
  value: string;
  unit: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  variant?: "wave" | "bar";
  badgeText?: string;
  badgeColor?: string;
  barColor?: string;
  barPercent?: number;
}

export default function SensorCard({
  label,
  value,
  unit,
  icon,
  iconColor = "#00B4C6",
  variant = "wave",
  badgeText,
  badgeColor = "rgba(255,255,255,0.08)",
  barColor = "#00E68A",
  barPercent = 40,
}: SensorCardProps) {
  const dotPulse = useSharedValue(0.6);
  const wavePhase = useSharedValue(0);
  const barSlide = useSharedValue(0);

  useEffect(() => {
    // Pulsing status dot
    dotPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.cubic) }),
        withTiming(0.6, { duration: 1200, easing: Easing.inOut(Easing.cubic) })
      ),
      -1,
      true
    );

    // Animate wave phase (translates the wave horizontally)
    wavePhase.value = withRepeat(
      withTiming(1, { duration: 2500, easing: Easing.linear }),
      -1,
      false
    );

    // Animate bar sliding back and forth
    barSlide.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.cubic) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.cubic) })
      ),
      -1,
      true
    );
  }, []);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: dotPulse.value,
  }));

  // Animate the wave by shifting it left via translateX
  const waveContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(wavePhase.value, [0, 1], [0, -40]),
      },
    ],
  }));

  // Animate the bar width
  const barStyle = useAnimatedStyle(() => {
    const width = interpolate(barSlide.value, [0, 1], [barPercent - 10, barPercent + 15]);
    return {
      width: `${width}%`,
    };
  });

  // Extended wave points to allow seamless scrolling
  const wavePoints = "0,22 12,18 24,24 36,16 48,20 60,12 72,20 84,14 96,22 108,16 120,20 132,14 144,22 156,18 168,24 180,16 192,20 204,14";

  return (
    <View className="flex-1 bg-[rgba(10,18,30,0.8)] rounded-2xl p-4 border border-[rgba(0,180,200,0.1)]">
      {/* Header row */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-1.5">
          <Ionicons name={icon} size={16} color={iconColor} />
          <Text className="text-[11px] font-bold text-white/40 tracking-[1.5px] uppercase">
            {label}
          </Text>
        </View>
        {badgeText ? (
          <View
            className="px-2 py-0.5 rounded"
            style={{ backgroundColor: badgeColor }}
          >
            <Text className="text-[9px] font-bold text-white/70 tracking-wider">
              {badgeText}
            </Text>
          </View>
        ) : (
          <Animated.View
            style={dotStyle}
            className="w-2 h-2 rounded-full"
          >
            <View className="flex-1 rounded-full" style={{ backgroundColor: barColor }} />
          </Animated.View>
        )}
      </View>

      {/* Value */}
      <View className="flex-row items-baseline gap-1 mb-3">
        <Text className="text-[32px] font-black text-white leading-[36px]">
          {value}
        </Text>
        <Text className="text-sm text-white/30 font-semibold">{unit}</Text>
      </View>

      {/* Chart / Bar */}
      {variant === "wave" ? (
        <View className="h-[28px] overflow-hidden rounded-md">
          <Animated.View style={[waveContainerStyle, { width: 220 }]}>
            <Svg width={220} height={28} viewBox="0 0 220 28">
              <Polyline
                points={wavePoints}
                fill="none"
                stroke={iconColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Animated.View>
        </View>
      ) : (
        <View className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <Animated.View
            style={[barStyle, { backgroundColor: barColor }]}
            className="h-full rounded-full"
          />
        </View>
      )}
    </View>
  );
}
