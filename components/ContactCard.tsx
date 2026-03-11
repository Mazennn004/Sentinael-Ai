import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { EmergencyContact } from "@/data/mockData";

interface ContactCardProps {
  contact: EmergencyContact;
  onDelete?: (id: string) => void;
}

const AVATAR_COLORS = ["#00D4E6", "#FF6B35", "#A855F7", "#00E68A", "#FF3B5C"];

export default function ContactCard({ contact, onDelete }: ContactCardProps) {
  const avatarColor =
    AVATAR_COLORS[
      contact.name.charCodeAt(0) % AVATAR_COLORS.length
    ];
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

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
    <View style={styles.card}>
      {/* Avatar */}
      <View style={[styles.avatar, { backgroundColor: `${avatarColor}20` }]}>
        <Text style={[styles.initials, { color: avatarColor }]}>
          {initials}
        </Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{contact.name}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.relationship}>{contact.relationship}</Text>
          <View style={styles.dot} />
          <Text style={styles.phone}>{contact.phone}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.6}>
          <Ionicons name="call" size={18} color="#00D4E6" />
        </TouchableOpacity>
        {onDelete && (
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.6}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={18} color="#FF3B5C" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginBottom: 10,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  relationship: {
    fontSize: 12,
    color: "#00D4E6",
    fontWeight: "500",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  phone: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "400",
  },
  actions: {
    flexDirection: "row",
    gap: 6,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
});
