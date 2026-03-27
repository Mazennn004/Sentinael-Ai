import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TimelineEvent {
  label: string;
  time: string;
  detail?: string;
  color?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  highlight?: boolean;
}

interface EventTimelineProps {
  events: TimelineEvent[];
}

export default function EventTimeline({ events }: EventTimelineProps) {
  return (
    <View>
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        const dotColor = event.color || "rgba(255,255,255,0.2)";
        const isHighlight = event.highlight;

        return (
          <View key={index} className="flex-row min-h-[60px]">
            {/* Timeline rail */}
            <View className="items-center w-5 mr-4">
              <View
                className="w-2.5 h-2.5 rounded-full mt-1.5 z-10"
                style={{ backgroundColor: dotColor }}
              />
              {!isLast && (
                <View className="w-px flex-1 bg-white/[0.06] mt-1" />
              )}
            </View>

            {/* Content */}
            <View className="flex-1 pb-5">
              {isHighlight ? (
                <View
                  className="bg-[rgba(255,59,92,0.06)] rounded-xl p-3 border border-[rgba(255,59,92,0.12)]"
                >
                  <View className="flex-row items-center gap-1.5 mb-1">
                    {event.icon && (
                      <Ionicons name={event.icon} size={14} color={dotColor} />
                    )}
                    <Text className="text-sm font-bold" style={{ color: dotColor }}>
                      {event.label}
                    </Text>
                  </View>
                  <Text className="text-[11px] text-white/30 font-mono">
                    {event.time}
                    {event.detail ? ` • ${event.detail}` : ""}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text className="text-sm font-semibold text-white/75">
                    {event.label}
                  </Text>
                  <Text className="text-[11px] text-white/25 font-mono mt-0.5">
                    {event.time}
                    {event.detail ? ` • ${event.detail}` : ""}
                  </Text>
                </View>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}
