import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mockIncidents } from "@/data/mockData";

const SEVERITY_COLORS: Record<string, string> = {
  critical: "#FF3B5C",
  high: "#FF6B35",
  medium: "#FFB800",
  low: "#00E68A",
};

export default function ReportDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const incident = mockIncidents.find((i) => i.id === id) || mockIncidents[0];
  const severityColor = SEVERITY_COLORS[incident.severity] || "#FFB800";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={["#05080F", "#0A1023", "#0F1A35"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(tabs)/history" as any);
            }
          }}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="rgba(255,255,255,0.7)"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Incident Report</Text>
        <TouchableOpacity style={styles.shareBtn} activeOpacity={0.7}>
          <Ionicons
            name="share-outline"
            size={20}
            color="rgba(255,255,255,0.7)"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Severity Banner */}
        <View
          style={[
            styles.severityBanner,
            { backgroundColor: `${severityColor}12` },
          ]}
        >
          <View
            style={[
              styles.severityIconBg,
              { backgroundColor: `${severityColor}20` },
            ]}
          >
            <Ionicons name="warning" size={22} color={severityColor} />
          </View>
          <View style={styles.severityInfo}>
            <Text
              style={[
                styles.severityLabel,
                { color: severityColor },
              ]}
            >
              {incident.severity.toUpperCase()} SEVERITY
            </Text>
            <Text style={styles.severityDate}>
              {formatDate(incident.date)} at {incident.time}
            </Text>
          </View>
        </View>

        {/* Video Footage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crash Footage</Text>
          <View style={styles.sectionCard}>
            <View style={styles.videoHeader}>
              <View style={styles.videoHeaderLeft}>
                <Ionicons name="videocam" size={16} color="#00D4E6" />
                <Text style={styles.videoLabel}>Stitched Video</Text>
              </View>
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>00:30</Text>
              </View>
            </View>
            {/* Video placeholder */}
            <View style={styles.videoPlaceholder}>
              <View style={styles.playButton}>
                <Ionicons name="play" size={32} color="#fff" />
              </View>
              <Text style={styles.videoPlaceholderText}>
                Tap to play crash footage
              </Text>
            </View>
            <View style={styles.videoMeta}>
              <View style={styles.videoMetaItem}>
                <Ionicons name="time-outline" size={12} color="rgba(255,255,255,0.35)" />
                <Text style={styles.videoMetaText}>15s pre-impact</Text>
              </View>
              <View style={styles.videoMetaDot} />
              <View style={styles.videoMetaItem}>
                <Ionicons name="time-outline" size={12} color="rgba(255,255,255,0.35)" />
                <Text style={styles.videoMetaText}>15s post-impact</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Telemetry */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Telemetry Data</Text>
          <View style={styles.telemetryGrid}>
            <View style={styles.telemetryItem}>
              <Ionicons name="speedometer" size={20} color="#00D4E6" />
              <Text style={styles.telemetryValue}>{incident.speed}</Text>
              <Text style={styles.telemetryUnit}>km/h</Text>
              <Text style={styles.telemetryLabel}>Impact Speed</Text>
            </View>
            <View style={styles.telemetryDivider} />
            <View style={styles.telemetryItem}>
              <Ionicons name="pulse" size={20} color="#FF6B35" />
              <Text style={styles.telemetryValue}>{incident.gForce}</Text>
              <Text style={styles.telemetryUnit}>G</Text>
              <Text style={styles.telemetryLabel}>Peak G-Force</Text>
            </View>
          </View>
        </View>

        {/* Detected Vehicles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detected Vehicles</Text>
          <View style={styles.sectionCard}>
            {incident.vehiclesDetected.map((vehicle, idx) => (
              <View key={idx} style={styles.vehicleRow}>
                <View style={styles.vehicleIcon}>
                  <Ionicons name="car" size={16} color="#00D4E6" />
                </View>
                <Text style={styles.vehicleText}>{vehicle}</Text>
                <View style={styles.detectedBadge}>
                  <Text style={styles.detectedText}>YOLO v11</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Damage Assessment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Damage Assessment</Text>
          <View style={styles.sectionCard}>
            <View style={styles.assessmentHeader}>
              <Ionicons name="analytics" size={18} color="#A855F7" />
              <Text style={styles.assessmentLabel}>LLM Analysis</Text>
            </View>
            <Text style={styles.assessmentText}>
              {incident.damageAssessment}
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryBtnWrapper}
          >
            <LinearGradient
              colors={["#00D4E6", "#00A8B8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryBtn}
            >
              <Ionicons name="download-outline" size={20} color="#fff" />
              <Text style={styles.primaryBtnText}>Download PDF Report</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.secondaryRow}>
            <TouchableOpacity
              style={styles.secondaryBtn}
              activeOpacity={0.7}
            >
              <Ionicons name="business" size={18} color="#00D4E6" />
              <Text style={styles.secondaryBtnText}>Send to Insurance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              activeOpacity={0.7}
            >
              <Ionicons name="shield" size={18} color="#FFB800" />
              <Text style={styles.secondaryBtnText}>Traffic Authority</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05080F",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  severityBanner: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    gap: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  severityIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  severityInfo: {
    flex: 1,
    gap: 4,
  },
  severityLabel: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  severityDate: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.4)",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  sectionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  videoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  videoHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  videoLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
  },
  durationBadge: {
    backgroundColor: "rgba(0, 212, 230, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  durationText: {
    fontSize: 12,
    color: "#00D4E6",
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  videoPlaceholder: {
    height: 180,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    gap: 10,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0, 212, 230, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 212, 230, 0.4)",
  },
  videoPlaceholderText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.3)",
    fontWeight: "500",
  },
  videoMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    gap: 12,
  },
  videoMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  videoMetaText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.35)",
    fontWeight: "500",
  },
  videoMetaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  telemetryGrid: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  telemetryItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  telemetryValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginTop: 4,
  },
  telemetryUnit: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.35)",
    fontWeight: "600",
    marginTop: -2,
  },
  telemetryLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.3)",
    fontWeight: "500",
  },
  telemetryDivider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    marginVertical: 4,
  },
  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.04)",
  },
  vehicleIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(0, 212, 230, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  vehicleText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    flex: 1,
  },
  detectedBadge: {
    backgroundColor: "rgba(0, 212, 230, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  detectedText: {
    fontSize: 9,
    color: "#00D4E6",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  assessmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  assessmentLabel: {
    fontSize: 12,
    color: "#A855F7",
    fontWeight: "600",
  },
  assessmentText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.65)",
    lineHeight: 22,
  },
  actionsSection: {
    marginTop: 8,
    gap: 12,
  },
  primaryBtnWrapper: {
    borderRadius: 16,
    overflow: "hidden",
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 10,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryRow: {
    flexDirection: "row",
    gap: 10,
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    gap: 6,
  },
  secondaryBtnText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    fontWeight: "600",
  },
});
