import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const OTP_LENGTH = 6;

export default function OTPScreen() {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(30);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const shakeX = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  // Resend cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const triggerShake = () => {
    shakeX.value = withSequence(
      withTiming(-8, { duration: 60 }),
      withTiming(8, { duration: 60 }),
      withTiming(-6, { duration: 60 }),
      withTiming(6, { duration: 60 }),
      withTiming(0, { duration: 60 })
    );
  };

  const handleDigitChange = (value: string, index: number) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError("");

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setError("Please enter the full 6-digit code.");
      triggerShake();
      return;
    }
    // Mock: any 6-digit code works
    router.replace("/(tabs)" as any);
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(30);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
  };

  const isFilled = otp.every((d) => d !== "");

  return (
    <View className="flex-1 bg-dark-950" style={{ paddingTop: insets.top }}>
      <LinearGradient
        colors={["#060A0F", "#0A0E17", "#0A1018"]}
        className="absolute inset-0"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 px-7"
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl bg-white/[0.04] items-center justify-center mt-4"
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>

        {/* Header */}
        <View className="mt-10 mb-10">
          <View className="w-14 h-14 rounded-2xl bg-[rgba(0,180,200,0.08)] items-center justify-center border border-[rgba(0,180,200,0.15)] mb-5">
            <Ionicons name="chatbubble-ellipses-outline" size={26} color="#00B4C6" />
          </View>
          <Text className="text-[26px] font-extrabold text-white mb-2">
            Verify Your Phone
          </Text>
          <Text className="text-[14px] text-white/30 leading-[22px]">
            Enter the 6-digit OTP sent to the phone number linked to your National ID.
          </Text>
        </View>

        {/* OTP Boxes */}
        <Animated.View style={shakeStyle} className="flex-row justify-between gap-2 mb-3">
          {Array.from({ length: OTP_LENGTH }).map((_, i) => {
            const isFocused = false;
            const hasValue = !!otp[i];
            return (
              <View
                key={i}
                className={`flex-1 h-[56px] rounded-[14px] items-center justify-center border ${
                  error
                    ? "border-severity-critical/50 bg-[rgba(255,59,92,0.04)]"
                    : hasValue
                    ? "border-teal-500 bg-[rgba(0,180,200,0.06)]"
                    : "border-[rgba(0,180,200,0.08)] bg-[rgba(10,18,30,0.8)]"
                }`}
              >
                <TextInput
                  ref={(el) => { inputRefs.current[i] = el; }}
                  className="text-white text-[22px] font-black text-center w-full h-full"
                  keyboardType="numeric"
                  maxLength={1}
                  value={otp[i]}
                  onChangeText={(v) => handleDigitChange(v, i)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
                  autoFocus={i === 0}
                  selectTextOnFocus
                />
              </View>
            );
          })}
        </Animated.View>

        {/* Error */}
        {error ? (
          <View className="flex-row items-center gap-1.5 mb-4">
            <Ionicons name="alert-circle-outline" size={13} color="#FF3B5C" />
            <Text className="text-severity-critical text-[12px]">{error}</Text>
          </View>
        ) : (
          <View className="h-6 mb-4" />
        )}

        {/* Verify Button */}
        <TouchableOpacity
          onPress={handleVerify}
          activeOpacity={0.85}
          className="rounded-[14px] overflow-hidden"
          style={{ opacity: isFilled ? 1 : 0.5 }}
        >
          <LinearGradient
            colors={["#00D4E6", "#00B4C6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
           
          style={{flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 16, paddingHorizontal: 24, gap: 8}}
          >
            <Ionicons name="checkmark-circle" size={20} color="#060A0F" />
            <Text className="text-dark-950 text-base font-bold tracking-wide">
              Verify OTP
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Resend */}
        <View className="flex-row justify-center items-center mt-5 gap-1.5">
          <Text className="text-white/25 text-[13px]">Didn't receive the code?</Text>
          <TouchableOpacity
            onPress={handleResend}
            disabled={resendCooldown > 0}
            activeOpacity={0.7}
          >
            <Text
              className={`text-[13px] font-semibold ${
                resendCooldown > 0 ? "text-white/20" : "text-[#00B4C6]"
              }`}
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
