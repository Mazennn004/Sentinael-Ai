import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [nationalId, setNationalId] = useState("");
  const [error, setError] = useState("");

  const isValid = nationalId.length === 14;

  const handleSendOTP = () => {
    if (!isValid) {
      setError("National ID must be 14 digits.");
      return;
    }
    setError("");
    router.push("/(auth)/otp" as any);
  };

  return (
    <View className="flex-1 bg-dark-950" style={{ paddingTop: insets.top }}>
      <LinearGradient
        colors={["#060A0F", "#0A0E17", "#0A1018"]}
        className="absolute inset-0"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 28,
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View className="items-center mb-12">
            <View className="w-16 h-16 rounded-2xl bg-[rgba(0,180,200,0.08)] items-center justify-center border border-[rgba(0,180,200,0.15)] mb-4">
             <Image source={require("../../assets/images/sentinel-transparent.png")} style={{ width: 64, height: 64 }} />
            </View>
            <Text className="text-[26px] font-extrabold text-white tracking-[3px]">
              SENTINEL AI
            </Text>
            <Text className="text-[12px] text-white/25 mt-1.5 tracking-[1.5px] uppercase">
              Smart Accident Response System
            </Text>
          </View>

          {/* Form */}
          <View className="gap-2 mb-2">
            <Text className="text-xl font-bold text-white/90 mb-1">Sign In</Text>
            <Text className="text-sm text-white/30 mb-5 leading-5">
              Enter your National ID number. An OTP will be sent to your registered phone number.
            </Text>

            {/* NID Input */}
            <View
              className={`flex-row items-center bg-[rgba(10,18,30,0.8)] rounded-[14px] px-4 border h-[56px] ${
                error ? "border-severity-critical/50" : "border-[rgba(0,180,200,0.1)]"
              }`}
            >
              <Ionicons
                name="card-outline"
                size={20}
                color={error ? "#FF3B5C" : "rgba(255,255,255,0.25)"}
                style={{ marginRight: 12 }}
              />
              <TextInput
                className="flex-1 text-white text-[17px] font-mono"
                placeholder="National ID (14 digits)"
                placeholderTextColor="rgba(255,255,255,0.15)"
                keyboardType="numeric"
                maxLength={14}
                value={nationalId}
                onChangeText={(v) => {
                  setNationalId(v);
                  if (error) setError("");
                }}
              />
              {nationalId.length > 0 && (
                <Text
                  className={`text-[12px] font-mono font-semibold ${
                    isValid ? "text-[#00E68A]" : "text-white/20"
                  }`}
                >
                  {nationalId.length}/14
                </Text>
              )}
            </View>

            {/* Error message */}
            {error ? (
              <View className="flex-row items-center gap-1.5 mt-1">
                <Ionicons name="alert-circle-outline" size={13} color="#FF3B5C" />
                <Text className="text-severity-critical text-[12px]">{error}</Text>
              </View>
            ) : null}

            {/* Send OTP Button */}
            <TouchableOpacity
              onPress={handleSendOTP}
              activeOpacity={0.85}
              className="rounded-[14px] overflow-hidden mt-4"
              style={{ opacity: isValid ? 1 : 0.5 }}
            >
              <LinearGradient
                colors={["#00D4E6", "#00B4C6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 16, paddingHorizontal: 24, gap: 8}}
              >
                <Text className="text-dark-950 text-base font-bold tracking-wide">
                  Send OTP
                </Text>
                <Ionicons name="arrow-forward" size={18} color="#060A0F" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Footer note */}
          <View className="items-center mt-10">
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="lock-closed-outline" size={13} color="rgba(255,255,255,0.15)" />
              <Text className="text-white/15 text-[12px]">
                Secured by National ID verification
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
