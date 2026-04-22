import { useState, useCallback } from "react";
import * as Location from "expo-location";

export type PermissionStatus = "undetermined" | "granted" | "denied";

/**
 * Individual hook for foreground Location (GPS speed) permission.
 * Does NOT auto-request — call requestPermission() explicitly from UI.
 */
export function useLocationPermission() {
  const [status, setStatus] = useState<PermissionStatus>("undetermined");

  const checkPermission = useCallback(async () => {
    try {
      const result = await Location.getForegroundPermissionsAsync();
      setStatus(result.granted ? "granted" : "denied");
      return result.granted;
    } catch {
      setStatus("denied");
      return false;
    }
  }, []);

  const requestPermission = useCallback(async () => {
    try {
      const result = await Location.requestForegroundPermissionsAsync();
      setStatus(result.granted ? "granted" : "denied");
      return result.granted;
    } catch {
      setStatus("denied");
      return false;
    }
  }, []);

  return { status, checkPermission, requestPermission };
}
