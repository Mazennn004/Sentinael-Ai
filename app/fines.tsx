import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mockFines, type TrafficFine } from "@/data/mockData";

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  unpaid: {
    label: "UNPAID",
    color: "#FF3B5C",
    bg: "rgba(255,59,92,0.08)",
  },
  paid: {
    label: "PAID",
    color: "#00E68A",
    bg: "rgba(0,230,138,0.06)",
  },
  appealed: {
    label: "APPEALED",
    color: "#FFB800",
    bg: "rgba(255,184,0,0.08)",
  },
};

function FineCard({ fine }: { fine: TrafficFine }) {
  const status = STATUS_CONFIG[fine.status];

  return (
    <View className="bg-[rgba(10,18,30,0.8)] rounded-2xl p-4 mb-3 border border-[rgba(0,180,200,0.08)]">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-3">
          <Text className="text-[15px] font-bold text-white/80 leading-[20px]">
            {fine.description}
          </Text>
          <View className="flex-row items-center gap-1.5 mt-1.5">
            <Ionicons
              name="location-outline"
              size={11}
              color="rgba(255,255,255,0.2)"
            />
            <Text className="text-[11px] text-white/20">{fine.location}</Text>
          </View>
        </View>
        <View
          className="px-2.5 py-1 rounded-lg"
          style={{ backgroundColor: status.bg }}
        >
          <Text
            className="text-[9px] font-bold tracking-[1.5px]"
            style={{ color: status.color }}
          >
            {status.label}
          </Text>
        </View>
      </View>

      <View className="h-px bg-white/[0.04] mb-3" />

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          <Ionicons
            name="calendar-outline"
            size={12}
            color="rgba(255,255,255,0.2)"
          />
          <Text className="text-[11px] text-white/25 font-mono">
            {fine.date}
          </Text>
        </View>

        {fine.linkedIncidentId && (
          <TouchableOpacity
            onPress={() =>
              router.push(`/report/${fine.linkedIncidentId}` as any)
            }
            activeOpacity={0.7}
            className="flex-row items-center gap-1"
          >
            <Ionicons name="link-outline" size={12} color="#00B4C6" />
            <Text className="text-[10px] text-[#00B4C6] font-semibold">
              View Report
            </Text>
          </TouchableOpacity>
        )}

        <Text className="text-[22px] font-black text-white/90 font-mono">
          {fine.amount.toLocaleString()}
          <Text className="text-[13px] text-white/30 font-semibold"> EGP</Text>
        </Text>
      </View>
    </View>
  );
}

export default function FinesScreen() {
  const insets = useSafeAreaInsets();

  const unpaidTotal = mockFines
    .filter((f) => f.status === "unpaid")
    .reduce((sum, f) => sum + f.amount, 0);

  const unpaidCount = mockFines.filter((f) => f.status === "unpaid").length;

  return (
    <View className="flex-1 bg-dark-950" style={{ paddingTop: insets.top }}>
      <LinearGradient
        colors={["#060A0F", "#0A0E17", "#0A1018"]}
        className="absolute inset-0"
      />

      {/* Header */}
      <View className="flex-row items-center px-5 pt-3 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl bg-white/[0.04] items-center justify-center mr-3"
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color="rgba(255,255,255,0.5)"
          />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-[10px] text-white/30 font-bold tracking-[2px] uppercase">
            Traffic
          </Text>
          <Text className="text-xl font-extrabold text-white">Fines</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Outstanding Balance Card */}
        {unpaidCount > 0 && (
          <View className="bg-[rgba(255,59,92,0.04)] rounded-2xl p-5 border border-[rgba(255,59,92,0.1)] mb-5">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="alert-circle" size={16} color="#FF3B5C" />
              <Text className="text-[10px] text-severity-critical font-bold tracking-[2px] uppercase">
                Outstanding Balance
              </Text>
            </View>
            <View className="flex-row items-baseline gap-1">
              <Text className="text-[36px] font-black text-white font-mono">
                {unpaidTotal.toLocaleString()}
              </Text>
              <Text className="text-[15px] text-white/30 font-semibold">
                EGP
              </Text>
            </View>
            <Text className="text-[11px] text-white/25 mt-1">
              {unpaidCount} unpaid {unpaidCount === 1 ? "fine" : "fines"}{" "}
              pending
            </Text>
          </View>
        )}

        {/* Fine cards */}
        {mockFines.length === 0 ? (
          <View className="items-center py-16 gap-2">
            <View className="w-16 h-16 rounded-2xl bg-[rgba(0,230,138,0.06)] items-center justify-center mb-2">
              <Ionicons name="checkmark-circle" size={32} color="#00E68A" />
            </View>
            <Text className="text-base font-semibold text-white/40">
              No fines
            </Text>
            <Text className="text-[13px] text-white/20 text-center px-10">
              You're in good standing. Keep driving safely!
            </Text>
          </View>
        ) : (
          mockFines.map((fine) => <FineCard key={fine.id} fine={fine} />)
        )}
      </ScrollView>
    </View>
  );
}
