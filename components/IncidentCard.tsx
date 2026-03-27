import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Incident {
  id: string;
  date: string;
  time: string;
  location: string;
  severity: "critical" | "high" | "medium" | "low";
  status: string;
  speed: number;
  gForce: number;
}

interface IncidentCardProps {
  incident: Incident;
  onPress?: () => void;
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: "#FF3B5C",
  high: "#FF6B35",
  medium: "#FFB800",
  low: "#00E68A",
};

const SEVERITY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  critical: "alert-circle",
  high: "warning",
  medium: "alert",
  low: "information-circle",
};

export default function IncidentCard({ incident, onPress }: IncidentCardProps) {
  const color = SEVERITY_COLORS[incident.severity] || "#FFB800";
  const icon = SEVERITY_ICONS[incident.severity] || "alert";

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
      className="bg-white/[0.04] rounded-2xl mb-3 border border-white/[0.06] overflow-hidden"
    >
      <View className="flex-row">
        {/* Severity strip */}
        <View className="w-[3px]" style={{ backgroundColor: color }} />

        <View className="flex-1 p-4 gap-3">
          {/* Top row */}
          <View className="flex-row items-center justify-between">
            <View
              className="flex-row items-center px-2.5 py-1 rounded-lg gap-1.5"
              style={{ backgroundColor: `${color}18` }}
            >
              <Ionicons name={icon} size={12} color={color} />
              <Text
                className="text-[10px] font-extrabold uppercase tracking-wider"
                style={{ color }}
              >
                {incident.severity}
              </Text>
            </View>
            <Text className="text-white/25 text-[11px] font-medium">
              {incident.time}
            </Text>
          </View>

          {/* Location */}
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="location-sharp" size={14} color="rgba(255,255,255,0.35)" />
            <Text className="text-white/75 text-[14px] font-semibold flex-1" numberOfLines={1}>
              {incident.location}
            </Text>
          </View>

          {/* Bottom row */}
          <View className="flex-row items-center justify-between">
            <Text className="text-white/20 text-[11px] font-medium">
              {formatDate(incident.date)}
            </Text>
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center gap-1">
                <Ionicons name="speedometer" size={11} color="rgba(255,255,255,0.25)" />
                <Text className="text-white/35 text-[11px] font-semibold">
                  {incident.speed} km/h
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Ionicons name="pulse" size={11} color="rgba(255,255,255,0.25)" />
                <Text className="text-white/35 text-[11px] font-semibold">
                  {incident.gForce}G
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={14} color="rgba(255,255,255,0.15)" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
