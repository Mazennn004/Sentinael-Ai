import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import IncidentCard from "@/components/IncidentCard";
import { mockIncidents } from "@/data/mockData";

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();

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
          <Text style={styles.title}>Incident History</Text>
          <Text style={styles.subtitle}>
            {mockIncidents.length} incidents recorded
          </Text>
        </View>

        {/* Summary Bar */}
        <View style={styles.summaryBar}>
          <View style={styles.summaryItem}>
            <View
              style={[
                styles.summaryDot,
                { backgroundColor: "#FF3B5C" },
              ]}
            />
            <Text style={styles.summaryCount}>
              {mockIncidents.filter((i) => i.severity === "critical").length}
            </Text>
            <Text style={styles.summaryLabel}>Critical</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <View
              style={[
                styles.summaryDot,
                { backgroundColor: "#FF6B35" },
              ]}
            />
            <Text style={styles.summaryCount}>
              {mockIncidents.filter((i) => i.severity === "high").length}
            </Text>
            <Text style={styles.summaryLabel}>High</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <View
              style={[
                styles.summaryDot,
                { backgroundColor: "#FFB800" },
              ]}
            />
            <Text style={styles.summaryCount}>
              {mockIncidents.filter((i) => i.severity === "medium").length}
            </Text>
            <Text style={styles.summaryLabel}>Medium</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <View
              style={[
                styles.summaryDot,
                { backgroundColor: "#00E68A" },
              ]}
            />
            <Text style={styles.summaryCount}>
              {mockIncidents.filter((i) => i.severity === "low").length}
            </Text>
            <Text style={styles.summaryLabel}>Low</Text>
          </View>
        </View>

        {/* Incident List */}
        <View style={styles.listSection}>
          {mockIncidents.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="shield-checkmark"
                size={48}
                color="rgba(255,255,255,0.15)"
              />
              <Text style={styles.emptyTitle}>No incidents yet</Text>
              <Text style={styles.emptyText}>
                Your drive history will appear here
              </Text>
            </View>
          ) : (
            mockIncidents.map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                onPress={() => router.push(`/report/${incident.id}` as any)}
              />
            ))
          )}
        </View>

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
  subtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: 4,
  },
  summaryBar: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 24,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  summaryCount: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  summaryLabel: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.35)",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  listSection: {
    gap: 0,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.4)",
  },
  emptyText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.25)",
  },
});
