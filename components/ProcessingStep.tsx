import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

interface ProcessingStepProps {
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  status: "pending" | "active" | "complete";
  index: number;
}

export default function ProcessingStep({
  label,
  description,
  icon,
  status,
  index,
}: ProcessingStepProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    // Entrance animation
    opacity.value = withDelay(
      index * 150,
      withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) })
    );
    translateY.value = withDelay(
      index * 150,
      withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) })
    );
  }, []);

  useEffect(() => {
    if (status === "active") {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: 600 }),
          withTiming(1, { duration: 600 })
        ),
        -1,
        true
      );
    } else {
      pulseScale.value = withTiming(1, { duration: 200 });
    }
  }, [status]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const getStatusColor = () => {
    switch (status) {
      case "complete":
        return "#00E68A";
      case "active":
        return "#00D4E6";
      case "pending":
        return "rgba(255, 255, 255, 0.2)";
    }
  };

  const getIcon = (): keyof typeof Ionicons.glyphMap => {
    if (status === "complete") return "checkmark-circle";
    return icon;
  };

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {/* Connector line */}
      {index > 0 && (
        <View
          style={[
            styles.connectorLine,
            {
              backgroundColor:
                status !== "pending"
                  ? "rgba(0, 212, 230, 0.3)"
                  : "rgba(255, 255, 255, 0.08)",
            },
          ]}
        />
      )}

      {/* Icon */}
      <Animated.View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              status === "pending"
                ? "rgba(255, 255, 255, 0.06)"
                : `${getStatusColor()}15`,
            borderColor:
              status === "pending"
                ? "rgba(255, 255, 255, 0.08)"
                : `${getStatusColor()}30`,
          },
          status === "active" && pulseStyle,
        ]}
      >
        <Ionicons name={getIcon()} size={22} color={getStatusColor()} />
      </Animated.View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.label,
            {
              color:
                status === "pending"
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(255,255,255,0.9)",
            },
          ]}
        >
          {label}
        </Text>
        <Text
          style={[
            styles.description,
            {
              color:
                status === "pending"
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(255,255,255,0.45)",
            },
          ]}
        >
          {description}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 16,
    position: "relative",
  },
  connectorLine: {
    position: "absolute",
    left: 23,
    top: -12,
    width: 2,
    height: 24,
    borderRadius: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
  },
  description: {
    fontSize: 12,
    fontWeight: "400",
  },
});
