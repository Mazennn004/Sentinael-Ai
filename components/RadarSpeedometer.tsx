import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Svg, {
  Circle,
  Line,
  Path,
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";

const AnimatedLine = Animated.createAnimatedComponent(Line);

interface RadarSpeedometerProps {
  speed: number;
  maxSpeed?: number;
  disabled?: boolean;
}

const SIZE = 280;
const CENTER = SIZE / 2;
const OUTER_R = 120;
const RINGS = [120, 95, 70, 45];

export default function RadarSpeedometer({
  speed,
  maxSpeed = 200,
  disabled = false,
}: RadarSpeedometerProps) {
  const sweepAngle = useSharedValue(0);
  const glowOpacity = useSharedValue(0.4);

  useEffect(() => {
    if (disabled) {
      // Freeze animations — no permission, no radar
      sweepAngle.value = 0;
      glowOpacity.value = 0.15;
      return;
    }
    // Radar sweep rotation
    sweepAngle.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1,
      false,
    );
    // Glow pulse
    glowOpacity.value = withRepeat(
      withTiming(0.8, { duration: 1500, easing: Easing.inOut(Easing.cubic) }),
      -1,
      true,
    );
  }, [disabled]);

  const sweepStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sweepAngle.value}deg` }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  // 12 tick marks around the circle
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180 - Math.PI / 2;
    const innerR = OUTER_R - 8;
    const outerR = OUTER_R;
    return {
      x1: CENTER + innerR * Math.cos(angle),
      y1: CENTER + innerR * Math.sin(angle),
      x2: CENTER + outerR * Math.cos(angle),
      y2: CENTER + outerR * Math.sin(angle),
      major: i % 3 === 0,
    };
  });

  // Dashed ring circles
  const dashArray = "4 6";

  return (
    <View
      className="items-center justify-center"
      style={{ width: SIZE, height: SIZE }}
    >
      {/* Radar glow background */}
      <Animated.View
        style={glowStyle}
        className="absolute w-[240px] h-[240px] rounded-full"
      >
        <View className="flex-1 rounded-full bg-[rgba(0,180,200,0.06)]" />
      </Animated.View>

      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <RadialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#00D4E6" stopOpacity="0.08" />
            <Stop offset="70%" stopColor="#00D4E6" stopOpacity="0.03" />
            <Stop offset="100%" stopColor="#00D4E6" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Background fill */}
        <Circle cx={CENTER} cy={CENTER} r={OUTER_R} fill="url(#radarGrad)" />

        {/* Concentric dashed rings */}
        {RINGS.map((r, i) => (
          <Circle
            key={i}
            cx={CENTER}
            cy={CENTER}
            r={r}
            stroke="rgba(0, 200, 220, 0.12)"
            strokeWidth={1}
            fill="none"
            strokeDasharray={i === 0 ? undefined : dashArray}
          />
        ))}

        {/* Tick marks */}
        {ticks.map((tick, i) => (
          <Line
            key={i}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={
              tick.major ? "rgba(0, 200, 220, 0.5)" : "rgba(0, 200, 220, 0.2)"
            }
            strokeWidth={tick.major ? 2 : 1}
          />
        ))}

        {/* Cross-hair lines (top, bottom, left, right) */}
        <Line
          x1={CENTER}
          y1={CENTER - OUTER_R - 12}
          x2={CENTER}
          y2={CENTER - OUTER_R + 5}
          stroke="#00B4C6"
          strokeWidth={2}
        />
        <Line
          x1={CENTER}
          y1={CENTER + OUTER_R - 5}
          x2={CENTER}
          y2={CENTER + OUTER_R + 12}
          stroke="#00B4C6"
          strokeWidth={2}
        />
        <Line
          x1={CENTER - OUTER_R - 12}
          y1={CENTER}
          x2={CENTER - OUTER_R + 5}
          y2={CENTER}
          stroke="#00B4C6"
          strokeWidth={2}
        />
        <Line
          x1={CENTER + OUTER_R - 5}
          y1={CENTER}
          x2={CENTER + OUTER_R + 12}
          y2={CENTER}
          stroke="#00B4C6"
          strokeWidth={2}
        />
      </Svg>

      {/* Sweep line (animated rotation) */}
      <Animated.View
        style={[
          sweepStyle,
          {
            position: "absolute",
            width: SIZE,
            height: SIZE,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Svg width={SIZE} height={SIZE}>
          <Defs>
            <LinearGradient id="sweepGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#00D4E6" stopOpacity="0.8" />
              <Stop offset="40%" stopColor="#00B4C6" stopOpacity="0.2" />
              <Stop offset="100%" stopColor="#00B4C6" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Path
            d={`M ${CENTER} ${CENTER} L ${CENTER} ${CENTER - OUTER_R} A ${OUTER_R} ${OUTER_R} 0 0 0 ${CENTER - OUTER_R} ${CENTER} Z`}
            fill="url(#sweepGrad)"
          />
          <Line
            x1={CENTER}
            y1={CENTER}
            x2={CENTER}
            y2={CENTER - OUTER_R}
            stroke="#00D4E6"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </Svg>
      </Animated.View>

      {/* Center content */}
      <View className="absolute items-center justify-center">
        <Ionicons
          name="car-sport-outline"
          size={22}
          color="rgba(0, 200, 220, 0.5)"
        />
        <Text className="text-[52px] font-black text-white leading-[56px] mt-1">
          {disabled ? "--" : speed}
        </Text>
        <Text className="text-[13px] font-bold text-white/30 tracking-[4px] -mt-1">
          KM/H
        </Text>
      </View>
    </View>
  );
}
