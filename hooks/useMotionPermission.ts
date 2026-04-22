import { useState, useCallback } from "react";
import { DeviceMotion } from "expo-sensors";

export type PermissionStatus = "undetermined" | "granted" | "denied";

/**
 * Individual hook for DeviceMotion (accelerometer + gyroscope) permission.
 * Does NOT auto-request — call requestPermission() explicitly from UI.
 */
export function useMotionPermission() {
  const [status, setStatus] = useState<PermissionStatus>("undetermined");

  const checkPermission = useCallback(async () => {
    try {
      const result = await DeviceMotion.getPermissionsAsync();
      setStatus(result.granted ? "granted" : "denied");
      return result.granted;
    } catch {
      // Device doesn't require explicit motion permission
      setStatus("granted");
      return true;
    }
  }, []);

  const requestPermission = useCallback(async () => {
    try {
      const result = await DeviceMotion.requestPermissionsAsync();
      setStatus(result.granted ? "granted" : "denied");
      return result.granted;
    } catch {
      // Device doesn't require explicit motion permission
      setStatus("granted");
      return true;
    }
  }, []);

  return { status, checkPermission, requestPermission };
}
