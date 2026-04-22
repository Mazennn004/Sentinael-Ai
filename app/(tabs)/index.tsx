import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import RadarSpeedometer from "@/components/RadarSpeedometer";
import SensorCard from "@/components/SensorCard";
import { mockFines } from "@/data/mockData";
import { useSensorPermissions } from "@/hooks/useSensorPermissions";
import { useDeviceMotion } from "@/hooks/useDeviceMotion";
import { useRealtimeSpeed } from "@/hooks/useRealtimeSpeed";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { status, checkPermissions } = useSensorPermissions();

  const isGranted = status === "granted";
  const isLoading = status === "loading";

  // Mount sensor hooks — they internally check permission before subscribing
  const { displayData } = useDeviceMotion();
  const { displaySpeed } = useRealtimeSpeed();

  const unpaidCount = mockFines.filter((f) => f.status === "unpaid").length;
  const unpaidTotal = mockFines
    .filter((f) => f.status === "unpaid")
    .reduce((sum, f) => sum + f.amount, 0);

  return (
    <View className="flex-1 bg-dark-950" style={{ paddingTop: insets.top }}>
      <LinearGradient
        colors={["#060A0F", "#0A0E17", "#0A1018"]}
        className="absolute inset-0"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center px-5 pt-3 pb-1">
          <View className="flex-row items-center gap-2.5">
            <View className="w-9 h-9 rounded-[10px] bg-[rgba(0,180,200,0.08)] items-center justify-center border border-[rgba(0,180,200,0.15)]">
              <Image
                source={require("../../assets/images/sentinel-transparent.png")}
                style={{ width: 32, height: 32 }}
              />
            </View>
            <Text className="text-lg font-extrabold text-white tracking-[2px]">
              SENTINEL AI
            </Text>
          </View>
          {/* CONNECTED pill → navigates to dashcam */}
          <TouchableOpacity
            onPress={() => router.push("/dashcam" as any)}
            activeOpacity={0.7}
            className="flex-row items-center bg-[rgba(0,200,130,0.08)] px-3.5 py-2 rounded-full gap-2 border border-[rgba(0,200,130,0.2)]"
          >
            <View className="w-1.5 h-1.5 rounded-full bg-[#00E68A]" />
            <Ionicons name="car-sport-outline" size={14} color="#00E68A" />
            <Text className="text-[11px] text-[#00E68A] font-bold tracking-[1.5px]">
              CONNECTED
            </Text>
          </TouchableOpacity>
        </View>

        {/* Radar Speedometer — real GPS speed when granted */}
        <View className="items-center mt-2">
          <RadarSpeedometer
            speed={isGranted ? displaySpeed : 0}
            disabled={!isGranted}
          />
        </View>

        {/* Status text — conditional based on permission */}
        <View className="items-center mt-1 gap-1.5">
          {isLoading ? (
            <Text className="text-xl font-bold text-white/40">
              Checking Permissions...
            </Text>
          ) : isGranted ? (
            <>
              <Text className="text-xl font-bold text-white">
                Active Monitoring
              </Text>
              <View className="flex-row items-center gap-2">
                <View className="flex-row items-center gap-1">
                  <Ionicons
                    name="time-outline"
                    size={13}
                    color="rgba(255,255,255,0.35)"
                  />
                  <Text className="text-[13px] text-white/35 font-medium">
                    14m 22s
                  </Text>
                </View>
                <Text className="text-white/15 text-xs">•</Text>
                <View className="flex-row items-center gap-1">
                  <Ionicons
                    name="navigate-outline"
                    size={13}
                    color="rgba(255,255,255,0.35)"
                  />
                  <Text className="text-[13px] text-white/35 font-medium">
                    6.2 miles
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View className="flex-row items-center gap-2">
                <Ionicons name="shield-outline" size={20} color="#FF3B5C" />
                <Text className="text-xl font-bold text-[#FF3B5C]">
                  Permission Not Enabled
                </Text>
              </View>
              <Text className="text-[13px] text-white/30 text-center px-10">
                Sentinel AI needs sensor and location access to monitor for
                accidents. Allow these permissions from phone settings to enable full Sentinel AI
                functionality.
              </Text>
              {/* Grant Permission button — navigates to onboarding flow */}
              <TouchableOpacity
                onPress={() => router.push("/(onboarding)/motion-permission" as any)}
                activeOpacity={0.8}
                className="mt-2 rounded-[14px] overflow-hidden"
              >
                <LinearGradient
                  colors={["#00D4E6", "#00B4C6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    gap: 8,
                  }}
                >
                  <Ionicons name="lock-open-outline" size={16} color="#060A0F" />
                  <Text className="text-dark-950 text-sm font-bold tracking-wide">
                    Grant Permission
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Sensor Cards — live data from useDeviceMotion */}
        <View className="flex-row gap-3 px-5 mt-6">
          <SensorCard
            label="G-FORCE"
            value={isGranted ? displayData.gForce.toFixed(2) : "-"}
            unit="G"
            icon="pulse-outline"
            iconColor={isGranted ? "#00B4C6" : "rgba(255,255,255,0.2)"}
            variant="wave"
            badgeText={isGranted ? "SAFE" : undefined}
            badgeColor="rgba(255,255,255,0.08)"
            disabled={!isGranted}
          />
          <SensorCard
            label="GYRO"
            value={isGranted ? displayData.angularVelocity.toFixed(1) : "-"}
            unit="°/s"
            icon="compass-outline"
            iconColor={isGranted ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)"}
            variant="bar"
            barColor={isGranted ? "#00E68A" : "rgba(255,255,255,0.1)"}
            barPercent={40}
            disabled={!isGranted}
          />
        </View>

        {/* Shortcut Cards */}
        <View className="flex-row gap-3 px-5 mt-4">
          {/* Documents Card */}
          <TouchableOpacity
            onPress={() => router.push("/documents" as any)}
            activeOpacity={0.7}
            className="flex-1 bg-[rgba(10,18,30,0.8)] rounded-2xl p-4 border border-[rgba(0,180,200,0.08)]"
          >
            <View className="w-9 h-9 rounded-[10px] bg-[rgba(0,180,200,0.06)] items-center justify-center mb-3 border border-[rgba(0,180,200,0.08)]">
              <Ionicons name="card-outline" size={18} color="#00B4C6" />
            </View>
            <Text className="text-[14px] font-bold text-white/80 mb-0.5">
              My Documents
            </Text>
            <Text className="text-[10px] text-white/25">
              License • Plate • Car Reg
            </Text>
          </TouchableOpacity>

          {/* Fines Card */}
          <TouchableOpacity
            onPress={() => router.push("/fines" as any)}
            activeOpacity={0.7}
            className="flex-1 bg-[rgba(10,18,30,0.8)] rounded-2xl p-4 border border-[rgba(0,180,200,0.08)]"
          >
            <View className="flex-row items-center justify-between mb-3">
              <View className="w-9 h-9 rounded-[10px] bg-[rgba(255,59,92,0.06)] items-center justify-center border border-[rgba(255,59,92,0.08)]">
                <Ionicons name="receipt-outline" size={18} color="#FF3B5C" />
              </View>
              {unpaidCount > 0 && (
                <View className="bg-[rgba(255,59,92,0.12)] px-2 py-0.5 rounded-full">
                  <Text className="text-severity-critical text-[10px] font-bold">
                    {unpaidCount}
                  </Text>
                </View>
              )}
            </View>
            <Text className="text-[14px] font-bold text-white/80 mb-0.5">
              Fines
            </Text>
            {unpaidCount > 0 ? (
              <Text className="text-[10px] text-severity-critical/70">
                {unpaidTotal.toLocaleString()} EGP unpaid
              </Text>
            ) : (
              <Text className="text-[10px] text-[#00E68A]/60">All clear</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* DEBUG: Simulate Crash Button */}
        <View className="px-5 mt-5">
          <TouchableOpacity
            onPress={() => router.push("/crash-countdown" as any)}
            activeOpacity={0.8}
            className="rounded-[14px] overflow-hidden"
          >
            <LinearGradient
              colors={["#FF3B5C", "#FF6B35"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 16,
                paddingHorizontal: 24,
                gap: 8,
              }}
            >
              <Text className="text-white text-sm text-center font-bold tracking-wide">
                Simulate Crash
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
