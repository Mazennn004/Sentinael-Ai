import React from "react";
import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import IncidentCard from "@/components/IncidentCard";
import { mockIncidents } from "@/data/mockData";

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();

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
        {/* Header */}
        <View className="pt-4 pb-1">
          <View className="flex-row items-center gap-2 mb-1">
            <Ionicons name="document-text-outline" size={18} color="#00B4C6" />
            <Text className="text-xs font-bold text-white/30 tracking-[2px] uppercase">
              Incident Reports
            </Text>
          </View>
          <Text className="text-2xl font-extrabold text-white">
            History
          </Text>
        </View>

        {/* Summary Bar */}
        <View className="flex-row bg-[rgba(10,18,30,0.8)] rounded-2xl p-4 border border-[rgba(0,180,200,0.08)] my-5">
          <View className="flex-1 items-center gap-1">
            <View className="w-2 h-2 rounded-full bg-severity-critical" />
            <Text className="text-xl font-extrabold text-white">
              {mockIncidents.filter((i) => i.severity === "critical").length}
            </Text>
            <Text className="text-[9px] text-white/25 font-bold uppercase tracking-wider">
              Critical
            </Text>
          </View>
          <View className="w-px bg-white/[0.04]" />
          <View className="flex-1 items-center gap-1">
            <View className="w-2 h-2 rounded-full bg-severity-high" />
            <Text className="text-xl font-extrabold text-white">
              {mockIncidents.filter((i) => i.severity === "high").length}
            </Text>
            <Text className="text-[9px] text-white/25 font-bold uppercase tracking-wider">
              High
            </Text>
          </View>
          <View className="w-px bg-white/[0.04]" />
          <View className="flex-1 items-center gap-1">
            <View className="w-2 h-2 rounded-full bg-severity-medium" />
            <Text className="text-xl font-extrabold text-white">
              {mockIncidents.filter((i) => i.severity === "medium").length}
            </Text>
            <Text className="text-[9px] text-white/25 font-bold uppercase tracking-wider">
              Medium
            </Text>
          </View>
          <View className="w-px bg-white/[0.04]" />
          <View className="flex-1 items-center gap-1">
            <View className="w-2 h-2 rounded-full bg-severity-low" />
            <Text className="text-xl font-extrabold text-white">
              {mockIncidents.filter((i) => i.severity === "low").length}
            </Text>
            <Text className="text-[9px] text-white/25 font-bold uppercase tracking-wider">
              Low
            </Text>
          </View>
        </View>

        {/* Incident List */}
        <View>
          {mockIncidents.length === 0 ? (
            <View className="items-center py-[60px] gap-2">
              <Ionicons name="document-text-outline" size={48} color="rgba(255,255,255,0.08)" />
              <Text className="text-base font-semibold text-white/30">No incidents yet</Text>
              <Text className="text-[13px] text-white/15">Your drive history will appear here</Text>
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

        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
}
