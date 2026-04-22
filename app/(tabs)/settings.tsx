import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { mockUser } from "@/data/mockData";

interface SettingRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle?: string;
  iconColor?: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (val: boolean) => void;
  onPress?: () => void;
}

function SettingRow({
  icon,
  label,
  subtitle,
  iconColor = "#00B4C6",
  hasToggle,
  toggleValue,
  onToggle,
  onPress,
}: SettingRowProps) {
  const content = (
    <View className="flex-row items-center py-3.5 px-1 gap-3.5">
      <View
        className="w-9 h-9 rounded-[10px] items-center justify-center"
        style={{ backgroundColor: `${iconColor}10` }}
      >
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View className="flex-1 gap-0.5">
        <Text className="text-[15px] text-white/75 font-medium">{label}</Text>
        {subtitle && (
          <Text className="text-[11px] text-white/25">{subtitle}</Text>
        )}
      </View>
      {hasToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{
            false: "rgba(255,255,255,0.06)",
            true: "rgba(0, 180, 200, 0.35)",
          }}
          thumbColor={toggleValue ? "#00B4C6" : "rgba(255,255,255,0.3)"}
        />
      ) : (
        <Ionicons
          name="chevron-forward"
          size={18}
          color="rgba(255,255,255,0.12)"
        />
      )}
    </View>
  );

  if (hasToggle) return content;

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [backgroundMonitoring, setBackgroundMonitoring] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [autoSOS, setAutoSOS] = useState(true);

  const handleLogout = () => {
    router.replace("/(auth)/login" as any);
  };

  return (
    <View className="flex-1 bg-dark-950" style={{ paddingTop: insets.top }}>
      <LinearGradient
        colors={["#060A0F", "#0A0E17", "#0A1018"]}
        className="absolute inset-0"
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-4 pb-5">
          <View className="flex-row items-center gap-2 mb-1">
            <Ionicons name="settings-outline" size={16} color="#00B4C6" />
            <Text className="text-xs font-bold text-white/30 tracking-[2px] uppercase">
              Configuration
            </Text>
          </View>
          <Text className="text-2xl font-extrabold text-white">Settings</Text>
        </View>

        {/* Profile Card */}
        <TouchableOpacity
          className="flex-row items-center bg-[rgba(10,18,30,0.8)] rounded-[18px] p-4 border border-[rgba(0,180,200,0.08)] gap-3.5 mb-2.5"
          activeOpacity={0.7}
        >
          <View className="rounded-[18px] overflow-hidden">
            <LinearGradient
              colors={["#00D4E6", "#00B4C6"]}
              className="w-[52px] h-[52px] items-center justify-center"
            >
              <Text className="text-lg font-bold text-dark-950">
                {mockUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </LinearGradient>
          </View>
          <View className="flex-1 gap-0.5">
            <Text className="text-base font-bold text-white">
              {mockUser.name}
            </Text>
            <Text className="text-[13px] text-white/30">{mockUser.email}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color="rgba(255,255,255,0.15)"
          />
        </TouchableOpacity>

        {/* Vehicle Info */}
        <View className="flex-row items-center bg-[rgba(0,180,200,0.04)] rounded-[14px] p-3.5 gap-2.5 border border-[rgba(0,180,200,0.08)] mb-6">
          <Ionicons name="car-sport-outline" size={18} color="#00B4C6" />
          <Text className="text-[13px] text-white/40 font-medium">
            {mockUser.vehicleInfo}
          </Text>
        </View>

        {/* Detection Settings */}
        <View className="mb-6">
          <Text className="text-[11px] font-bold text-white/25 uppercase tracking-[2px] mb-2.5 pl-1">
            Detection
          </Text>
          <View className="bg-[rgba(10,18,30,0.8)] rounded-2xl px-3 border border-[rgba(0,180,200,0.06)]">
            <SettingRow
              icon="speedometer-outline"
              label="Detection Sensitivity"
              subtitle="Adjust G-force threshold"
              iconColor="#FFB800"
            />
            <View className="h-px bg-white/[0.03] ml-[54px]" />
            <SettingRow
              icon="moon-outline"
              label="Background Monitoring"
              subtitle="Monitor while app is in background"
              iconColor="#A855F7"
              hasToggle
              toggleValue={backgroundMonitoring}
              onToggle={setBackgroundMonitoring}
            />
            <View className="h-px bg-white/[0.03] ml-[54px]" />
            <SettingRow
              icon="alert-circle-outline"
              label="Auto SOS Alert"
              subtitle="Send SOS if no response in 10 seconds"
              iconColor="#FF3B5C"
              hasToggle
              toggleValue={autoSOS}
              onToggle={setAutoSOS}
            />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-[11px] font-bold text-white/25 uppercase tracking-[2px] mb-2.5 pl-1">
            Preferences
          </Text>
          <View className="bg-[rgba(10,18,30,0.8)] rounded-2xl px-3 border border-[rgba(0,180,200,0.06)]">
            <SettingRow
              icon="notifications-outline"
              label="Push Notifications"
              iconColor="#00B4C6"
              hasToggle
              toggleValue={notifications}
              onToggle={setNotifications}
            />
            <View className="h-px bg-white/[0.03] ml-[54px]" />
            <SettingRow
              icon="phone-portrait-outline"
              label="Haptic Feedback"
              iconColor="#FF6B35"
              hasToggle
              toggleValue={hapticFeedback}
              onToggle={setHapticFeedback}
            />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-[11px] font-bold text-white/25 uppercase tracking-[2px] mb-2.5 pl-1">
            About
          </Text>
          <View className="bg-[rgba(10,18,30,0.8)] rounded-2xl px-3 border border-[rgba(0,180,200,0.06)]">
            <SettingRow
              icon="information-circle-outline"
              label="About Sentinel AI"
              subtitle="v1.0.0 — FUE Graduation Project"
              iconColor="#00B4C6"
            />
            <View className="h-px bg-white/[0.03] ml-[54px]" />
            <SettingRow
              icon="document-text-outline"
              label="Privacy Policy"
              iconColor="rgba(255,255,255,0.35)"
            />
            <View className="h-px bg-white/[0.03] ml-[54px]" />
            <SettingRow
              icon="shield-outline"
              label="Terms of Service"
              iconColor="rgba(255,255,255,0.35)"
            />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          className="flex-row items-center justify-center bg-[rgba(255,59,92,0.04)] rounded-[14px] p-4 gap-2 border border-[rgba(255,59,92,0.08)] mb-4"
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#FF3B5C" />
          <Text className="text-[15px] font-semibold text-severity-critical">
            Sign Out
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-[10px] text-white/[0.08] mb-2 font-mono">
          Sentinel AI — FUE Graduation Thesis 2026
        </Text>

        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
}
