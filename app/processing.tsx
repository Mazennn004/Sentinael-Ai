import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProcessingStep from "@/components/ProcessingStep";
import { processingSteps } from "@/data/mockData";

export default function ProcessingScreen() {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(0);

  // Simulate processing steps
  useEffect(() => {
    if (currentStep >= processingSteps.length) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 2500); // Each step takes 2.5 seconds

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
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <LinearGradient
        colors={["#05080F", "#0A1023", "#0F1A35"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons
            name={isComplete ? "checkmark-circle" : "sync"}
            size={24}
            color={isComplete ? "#00E68A" : "#00D4E6"}
          />
        </View>
        <Text style={styles.title}>
          {isComplete ? "Report Ready" : "Processing Incident"}
        </Text>
        <Text style={styles.subtitle}>
          {isComplete
            ? "Your incident report has been generated successfully"
            : "Please wait while we analyze the incident data..."}
        </Text>
      </View>

      {/* Progress Steps */}
      <View style={styles.stepsContainer}>
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
        <View style={styles.actionsSection}>
          <TouchableOpacity
            onPress={handleViewReport}
            activeOpacity={0.85}
            style={styles.viewBtnWrapper}
          >
            <LinearGradient
              colors={["#00D4E6", "#00A8B8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.viewBtn}
            >
              <Ionicons name="document-text" size={20} color="#fff" />
              <Text style={styles.viewBtnText}>View Report</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/(tabs)" as any)}
            style={styles.homeBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.homeBtnText}>Return to Home</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* SOS Status */}
      <View
        style={[styles.sosBar, { paddingBottom: insets.bottom + 12 }]}
      >
        <View style={styles.sosIndicator}>
          <View style={styles.sosDot} />
          <Text style={styles.sosText}>
            Emergency contacts have been notified
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05080F",
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 8,
    marginBottom: 40,
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(0, 212, 230, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.4)",
    textAlign: "center",
    lineHeight: 20,
  },
  stepsContainer: {
    paddingHorizontal: 28,
    flex: 1,
  },
  actionsSection: {
    paddingHorizontal: 28,
    gap: 12,
    marginBottom: 20,
  },
  viewBtnWrapper: {
    borderRadius: 16,
    overflow: "hidden",
  },
  viewBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 10,
  },
  viewBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  homeBtn: {
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  homeBtnText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 15,
    fontWeight: "600",
  },
  sosBar: {
    paddingHorizontal: 28,
    paddingTop: 12,
  },
  sosIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(255, 59, 92, 0.08)",
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 59, 92, 0.15)",
  },
  sosDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3B5C",
  },
  sosText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "500",
  },
});
