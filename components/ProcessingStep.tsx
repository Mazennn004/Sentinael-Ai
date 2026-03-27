import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";

interface ProcessingStepProps {
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  status: "pending" | "active" | "complete";
  index: number;
}

const STATUS_COLORS = {
  pending: { bg: "rgba(255,255,255,0.04)", icon: "rgba(255,255,255,0.15)" },
  active: { bg: "rgba(0, 180, 200, 0.1)", icon: "#00B4C6" },
  complete: { bg: "rgba(0, 180, 200, 0.06)", icon: "#00B4C6" },
};

export default function ProcessingStep({
  label,
  description,
  icon,
  status,
  index,
}: ProcessingStepProps) {
  const translateY = useSharedValue(20);
  const opacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 300;
    setTimeout(() => {
      translateY.value = withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, { duration: 400 });
    }, delay);
  }, []);

  useEffect(() => {
    if (status === "active") {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        true
      );
    } else {
      pulseScale.value = withTiming(1, { duration: 200 });
    }
  }, [status]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const iconContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const colors = STATUS_COLORS[status];

  return (
    <Animated.View style={containerStyle} className="flex-row items-start gap-3 mb-5">
      <View className="items-center">
        <Animated.View
          style={[iconContainerStyle, { backgroundColor: colors.bg }]}
          className="w-11 h-11 rounded-xl items-center justify-center border border-white/[0.06]"
        >
          <Ionicons
            name={status === "complete" ? "checkmark-circle" : icon}
            size={20}
            color={colors.icon}
          />
        </Animated.View>
        {index < 3 && (
          <View
            className="w-[2px] h-6 mt-1.5 rounded-full"
            style={{
              backgroundColor:
                status === "complete"
                  ? "rgba(0, 180, 200, 0.2)"
                  : "rgba(255,255,255,0.04)",
            }}
          />
        )}
      </View>

      <View className="flex-1 pt-2.5">
        <Text
          className="text-[14px] font-semibold mb-0.5"
          style={{
            color:
              status === "pending"
                ? "rgba(255,255,255,0.25)"
                : "#00B4C6",
          }}
        >
          {label}
        </Text>
        <Text className="text-white/20 text-[12px] leading-[18px]">
          {description}
        </Text>
      </View>
    </Animated.View>
  );
}
