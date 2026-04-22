import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Polyline } from "react-native-svg";
import EventTimeline from "@/components/EventTimeline";
import { mockIncidents } from "@/data/mockData";

const SEVERITY_COLORS: Record<string, string> = {
  critical: "#FF3B5C",
  high: "#FF6B35",
  medium: "#FFB800",
  low: "#00E68A",
};

const SEVERITY_LABELS: Record<string, string> = {
  critical: "Critical Impact",
  high: "High Impact",
  medium: "Moderate Impact",
  low: "Minor Impact",
};

const IMPACT_TYPES: Record<string, string> = {
  critical: "Rear-End\nCollision",
  high: "Side Impact\nCollision",
  medium: "Fender\nBender",
  low: "Minor\nContact",
};

export default function ReportDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const incident = mockIncidents.find((i) => i.id === id) || mockIncidents[0];
  const severityColor = SEVERITY_COLORS[incident.severity] || "#FFB800";

  const timelineEvents = [
    {
      label: "Sensor Anomaly Detected",
      time: `${incident.time}`,
      color: "rgba(255,255,255,0.25)",
    },
    {
      label: "AI Verification Complete",
      time: `${incident.time}`,
      detail: "Accident Confirmed",
      color: "#00B4C6",
    },
    {
      label: "Authorities Alerted (SOS)",
      time: `${incident.time}`,
      detail: "Emergency services dispatched to location.",
      color: "#FF3B5C",
      icon: "shield-checkmark" as keyof typeof Ionicons.glyphMap,
      highlight: true,
    },
  ];

  return (
    <View className="flex-1 bg-dark-950" style={{ paddingTop: insets.top }}>
      <LinearGradient
        colors={["#060A0F", "#0A0E17", "#0A1018"]}
        className="absolute inset-0"
      />

      {/* Header Bar */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(tabs)/history" as any);
            }
          }}
          className="w-10 h-10 rounded-xl bg-white/[0.04] items-center justify-center"
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color="rgba(255,255,255,0.6)"
          />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-[17px] font-bold text-white">
            Incident Report
          </Text>
          <Text className="text-[11px] text-white/25 font-mono mt-0.5">
            ID: AI-{incident.id.toUpperCase().slice(0, 4)}-RX
          </Text>
        </View>
        <TouchableOpacity
          className="w-10 h-10 rounded-xl bg-white/[0.04] items-center justify-center"
          activeOpacity={0.7}
        >
          <Ionicons name="share-social-outline" size={20} color="#00B4C6" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* DASHCAM EVIDENCE */}
        <View className="mt-2 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xs font-bold text-white/40 tracking-[2px] uppercase">
              Dashcam Evidence
            </Text>
            <View className="flex-row items-center gap-1.5">
              <Ionicons
                name="calendar-outline"
                size={12}
                color="rgba(255,255,255,0.3)"
              />
              <Text className="text-[11px] text-white/30 font-medium">
                {incident.date}, {incident.time}
              </Text>
            </View>
          </View>

          {/* Video Player Placeholder */}
          <View className="rounded-2xl overflow-hidden border border-white/[0.06]">
            <View className="h-[200px] bg-[rgba(10,15,25,0.9)] items-center justify-center relative">
              {/* -10s CLIP badge */}
              <View className="absolute top-3 left-3 flex-row items-center bg-[rgba(255,59,92,0.15)] px-2.5 py-1 rounded-lg gap-1.5">
                <View className="w-1.5 h-1.5 rounded-full bg-severity-critical" />
                <Text className="text-[10px] text-white/70 font-bold font-mono tracking-wider">
                  -10s CLIP
                </Text>
              </View>

              {/* Play button */}
              <View className="w-14 h-14 rounded-full bg-white/10 items-center justify-center border border-white/[0.15]">
                <Ionicons name="play" size={28} color="rgba(255,255,255,0.8)" />
              </View>

              {/* CAM label */}
              <View className="absolute bottom-3 right-3 bg-[rgba(0,0,0,0.5)] px-2.5 py-1 rounded">
                <Text className="text-[9px] text-white/50 font-bold font-mono tracking-wider">
                  CAM: FRONT_MAIN
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* AI TELEMETRY ANALYSIS header */}
        <View className="flex-row items-center gap-2 mb-4">
          <Ionicons name="grid-outline" size={16} color="#00B4C6" />
          <Text className="text-xs font-bold text-white/50 tracking-[2px] uppercase">
            AI Telemetry Analysis
          </Text>
        </View>

        {/* Severity card */}
        <View className="bg-[rgba(255,59,92,0.04)] rounded-2xl p-4 border border-[rgba(255,59,92,0.1)] mb-3 flex-row items-center">
          <View className="w-12 h-12 rounded-xl bg-[rgba(255,59,92,0.1)] items-center justify-center mr-3">
            <Ionicons name="warning" size={24} color={severityColor} />
          </View>
          <View className="flex-1">
            <Text className="text-[10px] text-white/35 font-bold tracking-[1.5px] uppercase">
              Assessed Severity
            </Text>
            <Text
              className="text-lg font-bold mt-0.5"
              style={{ color: severityColor }}
            >
              {SEVERITY_LABELS[incident.severity]}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-[10px] text-white/30 font-medium">
              Confidence
            </Text>
            <Text className="text-lg font-bold text-[#00B4C6] font-mono">
              98.4%
            </Text>
          </View>
        </View>

        {/* Impact Type + G-Force cards */}
        <View className="flex-row gap-3 mb-6">
          {/* Impact Type */}
          <View className="flex-1 bg-[rgba(10,18,30,0.8)] rounded-2xl p-4 border border-[rgba(0,180,200,0.08)]">
            <View className="flex-row items-center gap-1.5 mb-2.5">
              <Ionicons
                name="car-outline"
                size={14}
                color="rgba(255,255,255,0.35)"
              />
              <Text className="text-[10px] text-white/30 font-bold tracking-[1.5px] uppercase">
                Impact Type
              </Text>
            </View>
            <Text className="text-[17px] font-bold text-white leading-[22px]">
              {IMPACT_TYPES[incident.severity]}
            </Text>
          </View>

          {/* Max G-Force */}
          <View className="flex-1 bg-[rgba(10,18,30,0.8)] rounded-2xl p-4 border border-[rgba(0,180,200,0.08)]">
            <View className="flex-row items-center gap-1.5 mb-2.5">
              <Ionicons name="pulse-outline" size={14} color="#FF6B35" />
              <Text className="text-[10px] text-white/30 font-bold tracking-[1.5px] uppercase">
                Max G-Force
              </Text>
            </View>
            <View className="flex-row items-baseline gap-1">
              <Text className="text-[28px] font-black text-white leading-[32px]">
                {incident.gForce}
              </Text>
              <Text className="text-sm text-white/30 font-semibold">G</Text>
            </View>
            {/* Mini chart */}
            <View className="h-[20px] mt-1">
              <Svg
                width="100%"
                height={20}
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <Polyline
                  points="0,16 15,14 25,12 35,10 45,6 55,2 65,4 75,8 85,14 100,16"
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.6}
                />
              </Svg>
            </View>
          </View>
        </View>

        {/* EVENT TIMELINE */}
        <View className="mb-6">
          <Text className="text-xs font-bold text-white/40 tracking-[2px] uppercase mb-4">
            Event Timeline
          </Text>
          <EventTimeline events={timelineEvents} />
        </View>

        {/* Download Report */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="rounded-2xl overflow-hidden mb-4"
        >
          <View className="bg-[rgba(15,22,35,0.9)] flex-row items-center justify-center py-4 gap-2.5 border border-white/[0.06] rounded-2xl">
            <Ionicons name="download-outline" size={20} color="#00B4C6" />
            <Text className="text-[#00B4C6] text-base font-bold">
              Download Full Report
            </Text>
          </View>
        </TouchableOpacity>

        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
