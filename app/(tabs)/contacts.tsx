import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ContactCard from "@/components/ContactCard";
import { mockContacts, type EmergencyContact } from "@/data/mockData";

export default function ContactsScreen() {
  const insets = useSafeAreaInsets();
  const [contacts, setContacts] = useState<EmergencyContact[]>(mockContacts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRelationship, setNewRelationship] = useState("");

  const handleDelete = useCallback((id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleAdd = () => {
    if (!newName.trim() || !newPhone.trim()) {
      Alert.alert("Error", "Please fill in name and phone number");
      return;
    }
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: newName.trim(),
      phone: newPhone.trim(),
      relationship: newRelationship.trim() || "Other",
    };
    setContacts((prev) => [...prev, newContact]);
    setNewName("");
    setNewPhone("");
    setNewRelationship("");
    setShowAddModal(false);
  };

  return (
    <View className="flex-1 bg-dark-950" style={{ paddingTop: insets.top }}>
      <LinearGradient
        colors={["#060A0F", "#0A0E17", "#0A1018"]}
        className="absolute inset-0"
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between items-center pt-4 pb-5">
          <View>
            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons name="people-outline" size={16} color="#00B4C6" />
              <Text className="text-xs font-bold text-white/30 tracking-[2px] uppercase">
                Emergency
              </Text>
            </View>
            <Text className="text-2xl font-extrabold text-white">
              Contacts
            </Text>
          </View>
          <TouchableOpacity
            className="rounded-[14px] overflow-hidden"
            activeOpacity={0.7}
            onPress={() => setShowAddModal(true)}
          >
            <LinearGradient
              colors={["#00D4E6", "#00B4C6"]}
              className="w-11 h-11 items-center justify-center rounded-[14px]"
            >
              <Ionicons name="add" size={22} color="#060A0F" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Info banner */}
        <View className="flex-row bg-[rgba(0,180,200,0.04)] rounded-[14px] p-3.5 gap-2.5 border border-[rgba(0,180,200,0.1)] mb-5 items-start">
          <Ionicons name="information-circle-outline" size={16} color="#00B4C6" />
          <Text className="flex-1 text-[11px] text-white/35 leading-[17px]">
            These contacts will be notified automatically if an accident is
            detected and you don't respond within 10 seconds.
          </Text>
        </View>

        <View>
          {contacts.length === 0 ? (
            <View className="items-center py-[60px] gap-2">
              <Ionicons name="people-outline" size={48} color="rgba(255,255,255,0.08)" />
              <Text className="text-base font-semibold text-white/30">No contacts yet</Text>
              <Text className="text-[13px] text-white/15 text-center px-10">
                Add emergency contacts who'll be notified in case of an accident
              </Text>
            </View>
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} onDelete={handleDelete} />
            ))
          )}
        </View>

        <View className="h-[100px]" />
      </ScrollView>

      {/* Add Contact Modal */}
      <Modal visible={showAddModal} transparent animationType="slide" statusBarTranslucent>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-end"
        >
          <View className="flex-1 bg-black/70" onTouchEnd={() => setShowAddModal(false)} />
          <View
            className="bg-dark-800 rounded-t-[28px] p-6 gap-4"
            style={{ paddingBottom: (insets.bottom || 0) + 20 }}
          >
            <View className="w-9 h-1 rounded-full bg-white/10 self-center mb-2" />
            <Text className="text-xl font-bold text-white mb-1">
              Add Emergency Contact
            </Text>

            <View className="flex-row items-center bg-[rgba(10,18,30,0.8)] rounded-[14px] px-4 border border-[rgba(0,180,200,0.08)] h-[50px] gap-3">
              <Ionicons name="person-outline" size={16} color="rgba(255,255,255,0.25)" />
              <TextInput
                className="flex-1 text-white text-sm"
                placeholder="Full name"
                placeholderTextColor="rgba(255,255,255,0.15)"
                value={newName}
                onChangeText={setNewName}
              />
            </View>

            <View className="flex-row items-center bg-[rgba(10,18,30,0.8)] rounded-[14px] px-4 border border-[rgba(0,180,200,0.08)] h-[50px] gap-3">
              <Ionicons name="call-outline" size={16} color="rgba(255,255,255,0.25)" />
              <TextInput
                className="flex-1 text-white text-sm"
                placeholder="Phone number"
                placeholderTextColor="rgba(255,255,255,0.15)"
                keyboardType="phone-pad"
                value={newPhone}
                onChangeText={setNewPhone}
              />
            </View>

            <View className="flex-row items-center bg-[rgba(10,18,30,0.8)] rounded-[14px] px-4 border border-[rgba(0,180,200,0.08)] h-[50px] gap-3">
              <Ionicons name="heart-outline" size={16} color="rgba(255,255,255,0.25)" />
              <TextInput
                className="flex-1 text-white text-sm"
                placeholder="Relationship (e.g. Father, Doctor)"
                placeholderTextColor="rgba(255,255,255,0.15)"
                value={newRelationship}
                onChangeText={setNewRelationship}
              />
            </View>

            <View className="flex-row gap-3 mt-2">
              <TouchableOpacity
                className="flex-1 h-[50px] rounded-[14px] bg-white/[0.04] items-center justify-center border border-white/[0.04]"
                onPress={() => setShowAddModal(false)}
              >
                <Text className="text-white/40 text-[15px] font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 rounded-[14px] overflow-hidden"
                onPress={handleAdd}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={["#00D4E6", "#00B4C6"]}
               
                  style={{flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 16, paddingHorizontal: 24, gap: 8}}
                >
                  <Text className="text-dark-950 text-[15px] font-bold">Save Contact</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
