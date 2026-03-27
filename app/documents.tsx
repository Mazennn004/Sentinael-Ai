import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert ,Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  mockDriverLicense,
  mockCarRegistration,
  mockCarPlate,
} from "@/data/mockData";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-1.5">
      <Text className="text-[11px] text-white/30 font-medium uppercase tracking-wider">
        {label}
      </Text>
      <Text className="text-[13px] text-white/80 font-semibold font-mono">
        {value}
      </Text>
    </View>
  );
}

export default function DocumentsScreen() {
  const insets = useSafeAreaInsets();

  const handleRenew = (type: string) => {
    Alert.alert(
      "Renewal Request",
      `Your ${type} renewal request has been submitted. You will receive a notification when it's approved.`,
      [{ text: "OK" }]
    );
  };

  const isExpiringSoon = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffMs = expiry.getTime() - now.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays < 90;
  };

  const driverExpiring = isExpiringSoon(mockDriverLicense.expiryDate);
  const carExpiring = isExpiringSoon(mockCarRegistration.expiryDate);

  return (
    <View className="flex-1 bg-dark-950" style={{ paddingTop: insets.top }}>
      <LinearGradient
        colors={["#060A0F", "#0A0E17", "#0A1018"]}
        className="absolute inset-0"
      />

      {/* Header */}
      <View className="flex-row items-center px-5 pt-3 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl bg-white/[0.04] items-center justify-center mr-3"
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-[10px] text-white/30 font-bold tracking-[2px] uppercase">
            My
          </Text>
          <Text className="text-xl font-extrabold text-white">Documents</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── DRIVER'S LICENSE CARD ─── */}
        <View className="mb-3">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="card-outline" size={14} color="#00B4C6" />
            <Text className="text-[10px] font-bold text-white/30 tracking-[2px] uppercase">
              Driver's License
            </Text>
          </View>

          <View className="rounded-2xl overflow-hidden border border-[rgba(0,180,200,0.12)]">
            {/* Card header stripe */}
            <LinearGradient
              colors={["#00546B", "#003847"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingHorizontal: 16, paddingVertical: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
            >
              <View className="flex-row items-center gap-2">
                <Text className="text-white text-[11px] font-bold tracking-[2px]">
                  جمهورية مصر العربية
                </Text>
              </View>
              <Text className="text-white/50 text-[9px] font-bold tracking-wider">
                ARAB REPUBLIC OF EGYPT
              </Text>
            </LinearGradient>

            {/* Card body */}
            <View className="bg-[rgba(8,16,28,0.95)] p-4">
              <View className="flex-row gap-3.5 mb-4">
                {/* Photo placeholder */}
                <View className="w-[72px] h-[90px] rounded-xl bg-[rgba(0,180,200,0.06)] items-center justify-center border border-[rgba(0,180,200,0.1)]">
                  <Ionicons name="person" size={32} color="rgba(0,180,200,0.3)" />
                </View>
                <View className="flex-1 gap-1">
                  <Text className="text-[17px] font-bold text-white">
                    {mockDriverLicense.name}
                  </Text>
                  <Text className="text-[15px] text-white/50 font-medium">
                    {mockDriverLicense.nameAr}
                  </Text>
                  <View className="flex-row items-center gap-1.5 mt-1">
                    <Text className="text-[10px] text-white/20 font-mono">NID</Text>
                    <Text className="text-[13px] text-white/60 font-mono font-semibold">
                      {mockDriverLicense.nationalId}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="h-px bg-white/[0.04] mb-2" />

              <InfoRow label="License No." value={mockDriverLicense.licenseNumber} />
              <InfoRow label="Class" value={mockDriverLicense.licenseClass} />
              <InfoRow label="Blood Type" value={mockDriverLicense.bloodType} />
              <InfoRow label="Governorate" value={mockDriverLicense.governorate} />
              <InfoRow label="Issue Date" value={mockDriverLicense.issueDate} />

              <View className="h-px bg-white/[0.04] my-2" />

              <View className="flex-row justify-between items-center">
                <Text className="text-[10px] text-white/25 uppercase tracking-wider font-bold">
                  Expires
                </Text>
                <View
                  className={`px-2.5 py-1 rounded-lg ${
                    driverExpiring
                      ? "bg-[rgba(255,184,0,0.1)]"
                      : "bg-[rgba(0,230,138,0.06)]"
                  }`}
                >
                  <Text
                    className={`text-[12px] font-bold font-mono ${
                      driverExpiring ? "text-severity-medium" : "text-[#00E68A]"
                    }`}
                  >
                    {mockDriverLicense.expiryDate}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Renew button */}
          <TouchableOpacity
            onPress={() => handleRenew("Driver's License")}
            activeOpacity={0.7}
            className="flex-row items-center justify-center py-3 mt-2.5 rounded-xl bg-[rgba(0,180,200,0.06)] border border-[rgba(0,180,200,0.1)] gap-2"
          >
            <Ionicons name="refresh-outline" size={16} color="#00B4C6" />
            <Text className="text-[#00B4C6] text-[13px] font-bold">
              Request License Renewal
            </Text>
          </TouchableOpacity>
        </View>

        {/* ─── CAR REGISTRATION CARD ─── */}
        <View className="mb-3 mt-4">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="car-outline" size={14} color="#00B4C6" />
            <Text className="text-[10px] font-bold text-white/30 tracking-[2px] uppercase">
              Vehicle Registration
            </Text>
          </View>

          <View className="rounded-2xl overflow-hidden border border-[rgba(0,180,200,0.12)]">
            <LinearGradient
              colors={["#3D1500", "#2A1000"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingHorizontal: 16, paddingVertical: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
            >
              <Text className="text-white/80 text-[11px] font-bold tracking-[2px]">
                رخصة تسيير مركبة
              </Text>
              <Text className="text-white/40 text-[9px] font-bold tracking-wider">
                VEHICLE LICENSE
              </Text>
            </LinearGradient>

            <View className="bg-[rgba(8,16,28,0.95)] p-4">
              <View className="flex-row justify-between items-center mb-3">
                <View>
                  <Text className="text-[16px] font-bold text-white">
                    {mockCarRegistration.make} {mockCarRegistration.model}
                  </Text>
                  <Text className="text-[13px] text-white/40 font-medium">
                    {mockCarRegistration.year} • {mockCarRegistration.color}
                  </Text>
                </View>
                <View className="w-12 h-12 rounded-xl bg-[rgba(0,180,200,0.06)] items-center justify-center border border-[rgba(0,180,200,0.08)]">
                  <Ionicons name="car-sport" size={22} color="rgba(0,180,200,0.4)" />
                </View>
              </View>

              <View className="h-px bg-white/[0.04] mb-2" />

              <InfoRow label="Owner" value={mockCarRegistration.ownerName} />
              <InfoRow label="Reg. No." value={mockCarRegistration.registrationNumber} />
              <InfoRow label="Engine" value={mockCarRegistration.engineNumber} />
              <InfoRow label="Chassis" value={mockCarRegistration.chassisNumber} />
              <InfoRow label="Issue Date" value={mockCarRegistration.issueDate} />

              <View className="h-px bg-white/[0.04] my-2" />

              <View className="flex-row justify-between items-center">
                <Text className="text-[10px] text-white/25 uppercase tracking-wider font-bold">
                  Expires
                </Text>
                <View
                  className={`px-2.5 py-1 rounded-lg ${
                    carExpiring
                      ? "bg-[rgba(255,59,92,0.1)]"
                      : "bg-[rgba(0,230,138,0.06)]"
                  }`}
                >
                  <Text
                    className={`text-[12px] font-bold font-mono ${
                      carExpiring ? "text-severity-critical" : "text-[#00E68A]"
                    }`}
                  >
                    {mockCarRegistration.expiryDate}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => handleRenew("Vehicle Registration")}
            activeOpacity={0.7}
            className="flex-row items-center justify-center py-3 mt-2.5 rounded-xl bg-[rgba(0,180,200,0.06)] border border-[rgba(0,180,200,0.1)] gap-2"
          >
            <Ionicons name="refresh-outline" size={16} color="#00B4C6" />
            <Text className="text-[#00B4C6] text-[13px] font-bold">
              Request Registration Renewal
            </Text>
          </TouchableOpacity>
        </View>

        {/* ─── EGYPTIAN LICENSE PLATE ─── */}
        <View className="mt-4 mb-2">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="apps-outline" size={14} color="#00B4C6" />
            <Text className="text-[10px] font-bold text-white/30 tracking-[2px] uppercase">
              License Plate
            </Text>
          </View>

          {/* Realistic Egyptian plate */}
          <View className="items-center justify-center w-full mt-2">
            <View className="w-[250px] h-[110px] relative justify-center">
              <Image 
                source={require("../assets/images/car plate.png")} 
                style={{ width: "100%", height: "100%", position: "absolute" }}
                resizeMode="contain"
              />
              {/* Text Overlay Container — Placed over the white area of the plate */}
              <View className="absolute inset-0 flex-row items-center justify-center pt-3 pl-12 pr-4 pb-2">
                {/* Numbers (Left) */}
                <View className="flex-1 items-center justify-center">
                  <Text className="text-[#1A1A1A] text-[26px] font-black tracking-[4px]">
                    {mockCarPlate.numbers}
                  </Text>
                </View>

                {/* Letters (Right) */}
                <View className="flex-1 items-center justify-center">
                  <Text className="text-[#1A1A1A] text-[24px] font-black tracking-[4px]">
                    {mockCarPlate.lettersAr}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Text className="text-[10px] text-white/15 text-center mt-2 tracking-wider">
            {mockCarPlate.governorate} GOVERNORATE
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
