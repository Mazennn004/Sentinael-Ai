import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "shield-checkmark",
  history: "time",
  contacts: "people",
  settings: "settings-sharp",
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
    <View style={[styles.container, { paddingBottom: insets.bottom || 8 }]}>
      <BlurView intensity={40} tint="dark" style={styles.blurContainer}>
        <View style={styles.glassOverlay}>
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
                style={styles.tab}
              >
                {isFocused && <View style={styles.activeGlow} />}
                <View
                  style={[
                    styles.iconContainer,
                    isFocused && styles.iconContainerActive,
                  ]}
                >
                  <Ionicons
                    name={icon}
                    size={22}
                    color={isFocused ? "#00D4E6" : "rgba(255,255,255,0.45)"}
                  />
                </View>
                <Text
                  style={[
                    styles.label,
                    isFocused ? styles.labelActive : styles.labelInactive,
                  ]}
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

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  blurContainer: {
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  glassOverlay: {
    flexDirection: "row",
    backgroundColor: "rgba(10, 16, 35, 0.65)",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingVertical: 4,
  },
  activeGlow: {
    position: "absolute",
    top: -2,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 212, 230, 0.12)",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainerActive: {
    backgroundColor: "rgba(0, 212, 230, 0.1)",
  },
  label: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
    letterSpacing: 0.3,
  },
  labelActive: {
    color: "#00D4E6",
  },
  labelInactive: {
    color: "rgba(255, 255, 255, 0.4)",
  },
});
