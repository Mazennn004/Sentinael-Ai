import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "radio-outline",
  history: "time-outline",
  contacts: "people-outline",
  settings: "settings-outline",
};

const TAB_LABELS: Record<string, string> = {
  index: "Monitor",
  history: "History",
  contacts: "Contacts",
  settings: "Settings",
};

export default function LiquidGlassTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute bottom-0 left-0 right-0 px-4"
      style={{ paddingBottom: insets.bottom || 8 }}
    >
      <BlurView
        intensity={40}
        tint="dark"
        className="rounded-[28px] overflow-hidden border border-white/[0.08]"
      >
        <View className="flex-row bg-[rgba(10,14,23,0.7)] py-2.5 px-2">
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const routeName = route.name;
            const icon = TAB_ICONS[routeName] || "ellipse";
            const label = TAB_LABELS[routeName] || routeName;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                activeOpacity={0.7}
                className="flex-1 items-center justify-center relative py-1"
              >
                {isFocused && (
                  <View className="absolute top-[-2px] w-10 h-10 rounded-full bg-teal-400/[0.1]" />
                )}
                <View
                  className={`w-9 h-9 rounded-full items-center justify-center ${
                    isFocused ? "bg-teal-400/[0.08]" : ""
                  }`}
                >
                  <Ionicons
                    name={icon}
                    size={22}
                    color={isFocused ? "#00B4C6" : "rgba(255,255,255,0.4)"}
                  />
                </View>
                <Text
                  className={`text-[10px] font-semibold mt-0.5 tracking-wide ${
                    isFocused ? "text-teal-500" : "text-white/35"
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}
