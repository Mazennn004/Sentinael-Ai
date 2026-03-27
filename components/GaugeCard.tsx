import React from "react";
import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

interface GaugeCardProps {
  value: number;
  maxValue: number;
  unit: string;
  label: string;
  accentColor?: string;
}

export default function GaugeCard({
  value,
  maxValue,
  unit,
  label,
  accentColor = "#00B4C6",
}: GaugeCardProps) {
  const radius = 70;
  const strokeWidth = 8;
  const center = radius + strokeWidth;
  const svgSize = (radius + strokeWidth) * 2;

  // Arc from 180° (left) to 0° (right) — bottom half-circle
  const startAngle = 180;
  const endAngle = 0;
  const totalArc = 180; // degrees

  const clampedValue = Math.min(value, maxValue);
  const filledAngle = (clampedValue / maxValue) * totalArc;

  // Convert angle to radians for SVG arc
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // Background arc (full half-circle)
  const bgStartX = center + radius * Math.cos(toRad(startAngle));
  const bgStartY = center - radius * Math.sin(toRad(startAngle));
  const bgEndX = center + radius * Math.cos(toRad(endAngle));
  const bgEndY = center - radius * Math.sin(toRad(endAngle));
  const bgPath = `M ${bgStartX} ${bgStartY} A ${radius} ${radius} 0 0 1 ${bgEndX} ${bgEndY}`;

  // Filled arc
  const fillEndAngle = startAngle - filledAngle;
  const fillEndX = center + radius * Math.cos(toRad(fillEndAngle));
  const fillEndY = center - radius * Math.sin(toRad(fillEndAngle));
  const largeArc = filledAngle > 180 ? 1 : 0;
  const fillPath =
    filledAngle > 0
      ? `M ${bgStartX} ${bgStartY} A ${radius} ${radius} 0 ${largeArc} 1 ${fillEndX} ${fillEndY}`
      : "";

  return (
    <View className="flex-1 bg-white/[0.04] rounded-2xl p-4 border border-white/[0.06] items-center">
      <Text className="text-[11px] text-white/35 font-semibold uppercase tracking-widest mb-2">
        {label}
      </Text>
      <View style={{ width: svgSize, height: center + 8 }}>
        <Svg width={svgSize} height={center + 8}>
          {/* Background track */}
          <Path
            d={bgPath}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
          {/* Filled track */}
          {fillPath ? (
            <Path
              d={fillPath}
              stroke={accentColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          ) : null}
        </Svg>
        {/* Center value */}
        <View className="absolute inset-0 items-center justify-center" style={{ top: 14 }}>
          <Text className="text-[32px] font-black text-white leading-[36px]">
            {value}
          </Text>
          <Text className="text-[11px] font-semibold -mt-0.5" style={{ color: accentColor }}>
            {unit}
          </Text>
        </View>
      </View>
    </View>
  );
}
