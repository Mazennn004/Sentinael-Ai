import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={["#05080F", "#0A1023", "#0F1A35"]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Emergency Contacts</Text>
            <Text style={styles.subtitle}>
              {contacts.length} contact{contacts.length !== 1 ? "s" : ""} saved
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.7}
            onPress={() => setShowAddModal(true)}
          >
            <LinearGradient
              colors={["#00D4E6", "#00A8B8"]}
              style={styles.addBtnGradient}
            >
              <Ionicons name="add" size={22} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Info banner */}
        <View style={styles.infoBanner}>
          <Ionicons
            name="information-circle"
            size={18}
            color="#00D4E6"
          />
          <Text style={styles.infoText}>
            These contacts will be notified automatically if an accident is
            detected and you don't respond within 10 seconds.
          </Text>
        </View>

        {/* Contacts List */}
        <View style={styles.listSection}>
          {contacts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="people-outline"
                size={48}
                color="rgba(255,255,255,0.15)"
              />
              <Text style={styles.emptyTitle}>No contacts yet</Text>
              <Text style={styles.emptyText}>
                Add emergency contacts who'll be notified in case of an accident
              </Text>
            </View>
          ) : (
            contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onDelete={handleDelete}
              />
            ))
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Add Contact Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}
          >
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Add Emergency Contact</Text>

            <View style={styles.modalInput}>
              <Ionicons
                name="person-outline"
                size={18}
                color="rgba(255,255,255,0.35)"
              />
              <TextInput
                style={styles.modalInputText}
                placeholder="Full name"
                placeholderTextColor="rgba(255,255,255,0.25)"
                value={newName}
                onChangeText={setNewName}
              />
            </View>

            <View style={styles.modalInput}>
              <Ionicons
                name="call-outline"
                size={18}
                color="rgba(255,255,255,0.35)"
              />
              <TextInput
                style={styles.modalInputText}
                placeholder="Phone number"
                placeholderTextColor="rgba(255,255,255,0.25)"
                keyboardType="phone-pad"
                value={newPhone}
                onChangeText={setNewPhone}
              />
            </View>

            <View style={styles.modalInput}>
              <Ionicons
                name="heart-outline"
                size={18}
                color="rgba(255,255,255,0.35)"
              />
              <TextInput
                style={styles.modalInputText}
                placeholder="Relationship (e.g. Father, Doctor)"
                placeholderTextColor="rgba(255,255,255,0.25)"
                value={newRelationship}
                onChangeText={setNewRelationship}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtnWrapper}
                onPress={handleAdd}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={["#00D4E6", "#00A8B8"]}
                  style={styles.saveBtn}
                >
                  <Text style={styles.saveBtnText}>Save Contact</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05080F",
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: 4,
  },
  addBtn: {
    borderRadius: 14,
    overflow: "hidden",
  },
  addBtnGradient: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  infoBanner: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 212, 230, 0.08)",
    borderRadius: 14,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 230, 0.15)",
    marginBottom: 20,
    alignItems: "flex-start",
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    lineHeight: 18,
  },
  listSection: {},
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.4)",
  },
  emptyText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.25)",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#0F1A35",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    gap: 16,
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignSelf: "center",
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  modalInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    height: 50,
    gap: 12,
  },
  modalInputText: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    height: "100%",
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  cancelBtnText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 15,
    fontWeight: "600",
  },
  saveBtnWrapper: {
    flex: 1,
    borderRadius: 14,
    overflow: "hidden",
  },
  saveBtn: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
