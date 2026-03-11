import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
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
  iconColor = "#00D4E6",
  hasToggle,
  toggleValue,
  onToggle,
  onPress,
}: SettingRowProps) {
  const content = (
    <View style={settingStyles.row}>
      <View
        style={[
          settingStyles.iconBg,
          { backgroundColor: `${iconColor}15` },
        ]}
      >
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={settingStyles.textContainer}>
        <Text style={settingStyles.label}>{label}</Text>
        {subtitle && <Text style={settingStyles.subtitle}>{subtitle}</Text>}
      </View>
      {hasToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{
            false: "rgba(255,255,255,0.1)",
            true: "rgba(0, 212, 230, 0.5)",
          }}
          thumbColor={toggleValue ? "#00D4E6" : "rgba(255,255,255,0.4)"}
        />
      ) : (
        <Ionicons
          name="chevron-forward"
          size={18}
          color="rgba(255,255,255,0.2)"
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

const settingStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
    gap: 14,
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.85)",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.35)",
  },
});

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
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Profile Card */}
        <TouchableOpacity style={styles.profileCard} activeOpacity={0.7}>
          <View style={styles.profileAvatar}>
            <LinearGradient
              colors={["#00D4E6", "#007C8A"]}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarInitials}>
                {mockUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </LinearGradient>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{mockUser.name}</Text>
            <Text style={styles.profileEmail}>{mockUser.email}</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color="rgba(255,255,255,0.3)"
          />
        </TouchableOpacity>

        {/* Vehicle Info */}
        <View style={styles.vehicleCard}>
          <Ionicons name="car-sport" size={20} color="#00D4E6" />
          <Text style={styles.vehicleText}>{mockUser.vehicleInfo}</Text>
        </View>

        {/* Detection Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detection</Text>
          <View style={styles.sectionCard}>
            <SettingRow
              icon="speedometer"
              label="Detection Sensitivity"
              subtitle="Adjust G-force threshold"
              iconColor="#FFB800"
            />
            <View style={styles.separator} />
            <SettingRow
              icon="moon"
              label="Background Monitoring"
              subtitle="Monitor while app is in background"
              iconColor="#A855F7"
              hasToggle
              toggleValue={backgroundMonitoring}
              onToggle={setBackgroundMonitoring}
            />
            <View style={styles.separator} />
            <SettingRow
              icon="alert-circle"
              label="Auto SOS Alert"
              subtitle="Send SOS if no response in 10 seconds"
              iconColor="#FF3B5C"
              hasToggle
              toggleValue={autoSOS}
              onToggle={setAutoSOS}
            />
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionCard}>
            <SettingRow
              icon="notifications"
              label="Push Notifications"
              iconColor="#00E68A"
              hasToggle
              toggleValue={notifications}
              onToggle={setNotifications}
            />
            <View style={styles.separator} />
            <SettingRow
              icon="phone-portrait"
              label="Haptic Feedback"
              iconColor="#FF6B35"
              hasToggle
              toggleValue={hapticFeedback}
              onToggle={setHapticFeedback}
            />
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.sectionCard}>
            <SettingRow
              icon="information-circle"
              label="About Sentinel AI"
              subtitle="v1.0.0 — FUE Graduation Project"
              iconColor="#00D4E6"
            />
            <View style={styles.separator} />
            <SettingRow
              icon="document-text"
              label="Privacy Policy"
              iconColor="rgba(255,255,255,0.5)"
            />
            <View style={styles.separator} />
            <SettingRow
              icon="shield"
              label="Terms of Service"
              iconColor="rgba(255,255,255,0.5)"
            />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#FF3B5C" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Sentinel AI — FUE Graduation Thesis 2026
        </Text>

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
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    gap: 14,
    marginBottom: 10,
  },
  profileAvatar: {
    borderRadius: 22,
    overflow: "hidden",
  },
  avatarGradient: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  profileEmail: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.4)",
  },
  vehicleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 212, 230, 0.06)",
    borderRadius: 14,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 230, 0.1)",
    marginBottom: 24,
  },
  vehicleText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.35)",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    paddingLeft: 4,
  },
  sectionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginLeft: 54,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 59, 92, 0.08)",
    borderRadius: 14,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 59, 92, 0.15)",
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FF3B5C",
  },
  footerText: {
    textAlign: "center",
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.15)",
    marginBottom: 8,
  },
});
