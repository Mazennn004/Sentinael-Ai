import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProcessingStep from "@/components/ProcessingStep";
import { processingSteps } from "@/data/mockData";

export default function ProcessingScreen() {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= processingSteps.length) return;
    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 2500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const isComplete = currentStep >= processingSteps.length;

  const getStepStatus = (index: number): "pending" | "active" | "complete" => {
    if (index < currentStep) return "complete";
    if (index === currentStep) return "active";
    return "pending";
  };

  const handleViewReport = () => {
    router.replace("/report/inc-001" as any);
  };

  return (
    <View
      className="flex-1 bg-dark-950"
      style={{ paddingTop: insets.top + 20 }}
    >
      <LinearGradient
        colors={["#060A0F", "#0A0E17", "#0A1018"]}
        className="absolute inset-0"
      />

      {/* Header */}
      <View className="items-center px-8 gap-2 mb-10">
        <View
          className="w-14 h-14 rounded-2xl items-center justify-center mb-2 border border-[rgba(0,180,200,0.1)]"
          style={{
            backgroundColor: isComplete
              ? "rgba(200,230,54,0.08)"
              : "rgba(0,180,200,0.06)",
          }}
        >
          <Ionicons
            name={isComplete ? "checkmark-circle" : "sync"}
            size={24}
            color={isComplete ? "#00E68A" : "#00B4C6"}
          />
        </View>
        <Text className="text-[22px] font-extrabold text-white text-center">
          {isComplete ? "Report Ready" : "Processing Incident"}
        </Text>
        <Text className="text-sm text-white/30 text-center leading-5">
          {isComplete
            ? "Your incident report has been generated successfully"
            : "Please wait while we analyze the incident data..."}
        </Text>
      </View>

      {/* Progress Steps */}
      <View className="px-7 flex-1">
        {processingSteps.map((step, index) => (
          <ProcessingStep
            key={step.id}
            label={step.label}
            description={step.description}
            icon={step.icon}
            status={getStepStatus(index)}
            index={index}
          />
        ))}
      </View>

      {/* Completion Actions */}
      {isComplete && (
        <View className="px-7 gap-3 mb-5">
          <TouchableOpacity
            onPress={handleViewReport}
            activeOpacity={0.85}
            className="rounded-2xl overflow-hidden"
          >
            <LinearGradient
              colors={["#00D4E6", "#00B4C6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 16,
                paddingHorizontal: 24,
                gap: 8,
              }}
            >
              <Ionicons name="document-text" size={20} color="#060A0F" />
              <Text className="text-dark-950 text-base font-bold">
                View Report
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/(tabs)" as any)}
            className="items-center py-3.5 rounded-2xl bg-[rgba(10,18,30,0.8)] border border-white/[0.04]"
            activeOpacity={0.7}
          >
            <Text className="text-white/35 text-[15px] font-semibold">
              Return to Home
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* SOS Status */}
      <View className="px-7 pt-3" style={{ paddingBottom: insets.bottom + 12 }}>
        <View className="flex-row items-center justify-center gap-2 bg-[rgba(255,59,92,0.04)] rounded-xl py-3 border border-[rgba(255,59,92,0.08)]">
          <View className="w-2 h-2 rounded-full bg-severity-critical" />
          <Text className="text-xs text-white/35 font-medium">
            Emergency contacts have been notified
          </Text>
        </View>
      </View>
    </View>
  );
}
