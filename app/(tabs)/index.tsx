import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import StatusCard from "@/components/StatusCard";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [isMonitoring, setIsMonitoring] = useState(true);

  // Pulse animation for the shield
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.3);

  useEffect(() => {
    if (isMonitoring) {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.4, { duration: 1500, easing: Easing.out(Easing.cubic) }),
          withTiming(1, { duration: 1500, easing: Easing.in(Easing.cubic) })
        ),
        -1,
        true
      );
      pulseOpacity.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 1500 }),
          withTiming(0.3, { duration: 1500 })
        ),
        -1,
        true
      );
    }
  }, [isMonitoring]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={["#05080F", "#0A1023", "#0F1A35"]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Sentinel AI</Text>
            <Text style={styles.subtitle}>Protecting your journey</Text>
          </View>
          <View style={styles.statusBadge}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: isMonitoring ? "#00E68A" : "#FF3B5C",
                },
              ]}
            />
            <Text style={styles.statusText}>
              {isMonitoring ? "Active" : "Idle"}
            </Text>
          </View>
        </View>

        {/* Shield Monitor Section */}
        <View style={styles.monitorSection}>
          {/* Pulse rings */}
          <Animated.View style={[styles.pulseRing, styles.pulseRing1, pulseStyle]} />
          <Animated.View
            style={[styles.pulseRing, styles.pulseRing2, pulseStyle]}
          />

          {/* Shield icon */}
          <View style={styles.shieldContainer}>
            <LinearGradient
              colors={
                isMonitoring
                  ? ["rgba(0, 212, 230, 0.2)", "rgba(0, 168, 184, 0.08)"]
                  : ["rgba(255, 59, 92, 0.2)", "rgba(255, 59, 92, 0.08)"]
              }
              style={styles.shieldGlow}
            >
              <Ionicons
                name="shield-checkmark"
                size={56}
                color={isMonitoring ? "#00D4E6" : "#FF3B5C"}
              />
            </LinearGradient>
          </View>

          <Text style={styles.monitorStatus}>
            {isMonitoring ? "Monitoring Active" : "Monitoring Paused"}
          </Text>
          <Text style={styles.monitorSub}>
            {isMonitoring
              ? "Sensors are running. Drive safely."
              : "Tap to resume crash detection"}
          </Text>
        </View>

        {/* DEBUG: Simulate Crash Button */}
        <TouchableOpacity
          onPress={() => router.push("/crash-countdown" as any)}
          activeOpacity={0.8}
          style={styles.debugBtn}
        >
          <LinearGradient
            colors={["#FF3B5C", "#FF6B35"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.debugBtnGradient}
          >
            <Ionicons name="warning" size={18} color="#fff" />
            <Text style={styles.debugBtnText}> Simulate Crash</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Live Sensor Readings */}
        <View style={styles.sensorSection}>
          <Text style={styles.sectionTitle}>Live Sensors</Text>
          <View style={styles.sensorGrid}>
            <View style={styles.sensorItem}>
              <View style={styles.sensorIconBg}>
                <Ionicons name="speedometer" size={18} color="#00D4E6" />
              </View>
              <Text style={styles.sensorValue}>0</Text>
              <Text style={styles.sensorUnit}>km/h</Text>
              <Text style={styles.sensorLabel}>Speed</Text>
            </View>
            <View style={styles.sensorDivider} />
            <View style={styles.sensorItem}>
              <View
                style={[
                  styles.sensorIconBg,
                  { backgroundColor: "rgba(255, 184, 0, 0.12)" },
                ]}
              >
                <Ionicons name="pulse" size={18} color="#FFB800" />
              </View>
              <Text style={styles.sensorValue}>1.0</Text>
              <Text style={styles.sensorUnit}>G</Text>
              <Text style={styles.sensorLabel}>G-Force</Text>
            </View>
            <View style={styles.sensorDivider} />
            <View style={styles.sensorItem}>
              <View
                style={[
                  styles.sensorIconBg,
                  { backgroundColor: "rgba(168, 85, 247, 0.12)" },
                ]}
              >
                <Ionicons name="compass" size={18} color="#A855F7" />
              </View>
              <Text style={styles.sensorValue}>0.0</Text>
              <Text style={styles.sensorUnit}>°/s</Text>
              <Text style={styles.sensorLabel}>Gyroscope</Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <StatusCard
              icon="car"
              label="Total Trips"
              value="142"
              accentColor="#00D4E6"
            />
            <StatusCard
              icon="warning"
              label="Incidents"
              value="3"
              accentColor="#FF6B35"
            />
          </View>
          <View style={[styles.statsGrid, { marginTop: 10 }]}>
            <StatusCard
              icon="navigate"
              label="Distance"
              value="2,847"
              accentColor="#00E68A"
            />
            <StatusCard
              icon="time"
              label="Drive Time"
              value="186h"
              accentColor="#A855F7"
            />
          </View>
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05080F",
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "600",
  },
  monitorSection: {
    alignItems: "center",
    paddingVertical: 40,
    position: "relative",
  },
  pulseRing: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 230, 0.15)",
  },
  pulseRing1: {
    width: 180,
    height: 180,
    top: 20,
  },
  pulseRing2: {
    width: 240,
    height: 240,
    top: -10,
  },
  shieldContainer: {
    marginBottom: 20,
  },
  shieldGlow: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 212, 230, 0.2)",
  },
  monitorStatus: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 4,
  },
  monitorSub: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.4)",
  },
  sensorSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  sensorGrid: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  sensorItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  sensorIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(0, 212, 230, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  sensorValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },
  sensorUnit: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.35)",
    fontWeight: "600",
    marginTop: -2,
  },
  sensorLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.3)",
    fontWeight: "500",
  },
  sensorDivider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    marginVertical: 4,
  },
  statsSection: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
  },
  debugBtn: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 24,
  },
  debugBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 8,
  },
  debugBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
