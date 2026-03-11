import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Incident } from "@/data/mockData";

const SEVERITY_COLORS: Record<Incident["severity"], string> = {
  critical: "#FF3B5C",
  high: "#FF6B35",
  medium: "#FFB800",
  low: "#00E68A",
};

interface IncidentCardProps {
  incident: Incident;
  onPress: () => void;
}

export default function IncidentCard({ incident, onPress }: IncidentCardProps) {
  const severityColor = SEVERITY_COLORS[incident.severity];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.card}
    >
      {/* Severity strip */}
      <View style={[styles.severityStrip, { backgroundColor: severityColor }]} />

      <View style={styles.content}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View
            style={[
              styles.severityBadge,
              { backgroundColor: `${severityColor}20` },
            ]}
          >
            <View
              style={[styles.severityDot, { backgroundColor: severityColor }]}
            />
            <Text style={[styles.severityText, { color: severityColor }]}>
              {incident.severity.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.time}>{incident.time}</Text>
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons
            name="location-sharp"
            size={14}
            color="rgba(255,255,255,0.5)"
          />
          <Text style={styles.location} numberOfLines={1}>
            {incident.location}
          </Text>
        </View>

        {/* Bottom row */}
        <View style={styles.bottomRow}>
          <Text style={styles.date}>{formatDate(incident.date)}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Ionicons
                name="speedometer"
                size={12}
                color="rgba(255,255,255,0.4)"
              />
              <Text style={styles.statText}>{incident.speed} km/h</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons
                name="pulse"
                size={12}
                color="rgba(255,255,255,0.4)"
              />
              <Text style={styles.statText}>{incident.gForce}G</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Chevron */}
      <View style={styles.chevron}>
        <Ionicons
          name="chevron-forward"
          size={18}
          color="rgba(255,255,255,0.3)"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 12,
  },
  severityStrip: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  severityBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  severityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  severityText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  time: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "500",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    fontWeight: "600",
    flex: 1,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.35)",
    fontWeight: "400",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  statText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "500",
  },
  chevron: {
    justifyContent: "center",
    paddingRight: 12,
  },
});
