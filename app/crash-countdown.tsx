import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function CrashCountdownScreen() {
  const [countdown, setCountdown] = useState(10);
  const [isCancelled, setIsCancelled] = useState(false);

  // Animations
  const ringPulse = useSharedValue(1);
  const urgencyOpacity = useSharedValue(0.3);
  const buttonScale = useSharedValue(1);

  useEffect(() => {
    // Pulse animation for the countdown ring
    ringPulse.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 500, easing: Easing.inOut(Easing.cubic) }),
        withTiming(1, { duration: 500, easing: Easing.inOut(Easing.cubic) })
      ),
      -1,
      true
    );

    // Background urgency pulse
    urgencyOpacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 600 }),
        withTiming(0.3, { duration: 600 })
      ),
      -1,
      true
    );

    // Button breathe
    buttonScale.value = withRepeat(
      withSequence(
        withTiming(1.03, { duration: 700 }),
        withTiming(1, { duration: 700 })
      ),
      -1,
      true
    );
  }, []);

  // Countdown timer
  useEffect(() => {
    if (isCancelled) return;
    if (countdown <= 0) {
      // Time's up — navigate to processing
      router.replace("/processing" as any);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
      // Haptic feedback on each tick
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isCancelled]);

  const handleCancel = useCallback(() => {
    setIsCancelled(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    cancelAnimation(ringPulse);
    cancelAnimation(urgencyOpacity);
    cancelAnimation(buttonScale);
    // Go back to home
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)" as any);
    }
  }, []);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringPulse.value }],
  }));

  const urgencyStyle = useAnimatedStyle(() => ({
    opacity: urgencyOpacity.value,
  }));

  const btnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  // Color gets more urgent as countdown decreases
  const urgencyColor =
    countdown > 6 ? "#FFB800" : countdown > 3 ? "#FF6B35" : "#FF3B5C";

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0A0A0A", "#1A0A0A", "#0A0A0A"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Urgency background glow */}
      <Animated.View style={[styles.urgencyGlow, urgencyStyle]}>
        <LinearGradient
          colors={[`${urgencyColor}25`, "transparent"]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Header */}
      <View style={styles.headerSection}>
        <View style={styles.alertBadge}>
          <Ionicons name="warning" size={16} color={urgencyColor} />
          <Text style={[styles.alertText, { color: urgencyColor }]}>
            CRASH DETECTED
          </Text>
        </View>
        <Text style={styles.headerSub}>
          Emergency alert will be sent automatically
        </Text>
      </View>

      {/* Countdown Circle */}
      <View style={styles.countdownSection}>
        <Animated.View style={[styles.countdownRing, ringStyle]}>
          <View
            style={[styles.countdownInner, { borderColor: urgencyColor }]}
          >
            <Text style={[styles.countdownNumber, { color: urgencyColor }]}>
              {countdown}
            </Text>
            <Text style={styles.countdownLabel}>seconds</Text>
          </View>
        </Animated.View>
      </View>

      {/* I'm OK Button */}
      <View style={styles.actionSection}>
        <Animated.View style={btnStyle}>
          <TouchableOpacity
            onPress={handleCancel}
            activeOpacity={0.8}
            style={styles.okBtnWrapper}
          >
            <LinearGradient
              colors={["#00E68A", "#00B86E"]}
              style={styles.okBtn}
            >
              <Ionicons name="checkmark-circle" size={28} color="#fff" />
              <Text style={styles.okBtnText}>I'M OK</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.okSubtext}>
          Tap to cancel emergency alert
        </Text>
      </View>

      {/* Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Ionicons
            name="videocam"
            size={14}
            color="rgba(255,255,255,0.3)"
          />
          <Text style={styles.infoText}>
            Recording crash footage...
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons
            name="location"
            size={14}
            color="rgba(255,255,255,0.3)"
          />
          <Text style={styles.infoText}>
            GPS location captured
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    justifyContent: "space-between",
    paddingVertical: 60,
  },
  urgencyGlow: {
    ...StyleSheet.absoluteFillObject,
  },
  headerSection: {
    alignItems: "center",
    gap: 8,
    paddingTop: 20,
  },
  alertBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 59, 92, 0.12)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 59, 92, 0.2)",
  },
  alertText: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 2,
  },
  headerSub: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.4)",
    textAlign: "center",
  },
  countdownSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  countdownRing: {
    alignItems: "center",
    justifyContent: "center",
  },
  countdownInner: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  countdownNumber: {
    fontSize: 72,
    fontWeight: "900",
    lineHeight: 80,
  },
  countdownLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "500",
    marginTop: -4,
  },
  actionSection: {
    alignItems: "center",
    paddingHorizontal: 40,
    gap: 12,
  },
  okBtnWrapper: {
    width: SCREEN_WIDTH - 80,
    borderRadius: 20,
    overflow: "hidden",
  },
  okBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 12,
  },
  okBtnText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 2,
  },
  okSubtext: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.3)",
  },
  infoSection: {
    paddingHorizontal: 40,
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.3)",
  },
});
