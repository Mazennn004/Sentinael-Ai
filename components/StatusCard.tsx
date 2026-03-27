import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StatusCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  accentColor?: string;
}

export default function StatusCard({
  icon,
  label,
  value,
  accentColor = "#00B4C6",
}: StatusCardProps) {
  return (
    <View className="flex-1 bg-[rgba(10,18,30,0.8)] rounded-2xl p-4 border border-[rgba(0,180,200,0.06)]">
      <View
        className="w-9 h-9 rounded-[10px] items-center justify-center mb-3"
        style={{ backgroundColor: `${accentColor}14` }}
      >
        <Ionicons name={icon} size={18} color={accentColor} />
      </View>
      <Text className="text-white text-xl font-extrabold mb-0.5">{value}</Text>
      <Text className="text-white/30 text-[11px] font-medium">{label}</Text>
    </View>
  );
}
