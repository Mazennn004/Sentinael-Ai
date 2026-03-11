import React from "react";
import { Redirect } from "expo-router";

// Entry point — redirect to auth or tabs based on auth state
// For now, always redirect to auth (login screen)
export default function Index() {
  return <Redirect href="/(auth)/login" />;
}
