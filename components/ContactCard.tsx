import React from "react";
import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface ContactCardProps {
  contact: {
    id: string;
    name: string;
    phone: string;
    relationship: string;
  };
  onDelete?: (id: string) => void;
}

const getAvatarColor = (name: string) => {
  const colors = [
    "#00B4C6",
    "#A855F7",
    "#FF6B35",
    "#3B82F6",
    "#FF3B5C",
    "#FFB800",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default function ContactCard({ contact, onDelete }: ContactCardProps) {
  const avatarColor = getAvatarColor(contact.name);
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleCall = () => {
    Linking.openURL(`tel:${contact.phone}`);
  };

  const handleDelete = () => {
    Alert.alert(
      "Remove Contact",
      `Remove ${contact.name} from emergency contacts?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => onDelete?.(contact.id),
        },
      ]
    );
  };

  return (
    <View className="bg-[rgba(10,18,30,0.8)] rounded-2xl p-4 mb-3 border border-[rgba(0,180,200,0.08)]">
      <View className="flex-row items-center gap-3">
        <View
          className="w-[48px] h-[48px] rounded-[16px] items-center justify-center"
          style={{ backgroundColor: `${avatarColor}18` }}
        >
          <Text className="text-[16px] font-bold" style={{ color: avatarColor }}>
            {initials}
          </Text>
        </View>

        <View className="flex-1 gap-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-white text-[15px] font-semibold">
              {contact.name}
            </Text>
            <View className="bg-white/[0.06] px-2 py-0.5 rounded-md">
              <Text className="text-white/35 text-[10px] font-semibold">
                {contact.relationship}
              </Text>
            </View>
          </View>
          <Text className="text-white/30 text-[13px]">{contact.phone}</Text>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={handleCall}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-[10px] bg-[rgba(0,180,200,0.1)] items-center justify-center"
          >
            <Ionicons name="call" size={16} color="#00B4C6" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            activeOpacity={0.7}
            className="w-9 h-9 rounded-[10px] bg-[rgba(255,59,92,0.08)] items-center justify-center"
          >
            <Ionicons name="trash" size={16} color="#FF3B5C" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
