import { useEffect, useState, useCallback } from "react";
import { DeviceMotion } from "expo-sensors";
import * as Location from "expo-location";

export type SensorPermissionStatus = "loading" | "granted" | "denied";

/**
 * Composite hook that checks BOTH DeviceMotion and Location permissions.
 * Used on the Home screen to determine overall sensor readiness.
 * Does NOT request — only checks. Individual requests happen on the onboarding screens.
 */
export function useSensorPermissions() {
  const [status, setStatus] = useState<SensorPermissionStatus>("loading");

  const checkPermissions = useCallback(async () => {
    setStatus("loading");
    try {
      const [motion, location] = await Promise.all([
        DeviceMotion.getPermissionsAsync().catch(() => ({ granted: true })),
        Location.getForegroundPermissionsAsync(),
      ]);

      if (motion.granted && location.granted) {
        setStatus("granted");
      } else {
        setStatus("denied");
      }
    } catch {
      setStatus("denied");
    }
  }, []);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  return { status, checkPermissions };
}
