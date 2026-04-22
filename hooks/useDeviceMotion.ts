import { useEffect, useRef, useState, useCallback } from "react";
import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";
import { DETECTION_THRESHOLDS } from "@/constants/detectionThresholds";

const GRAVITY = 9.80665;

export interface DeviceMotionDisplayData {
  gForce: number;
  angularVelocity: number;
  peakG: number;
  isAvailable: boolean;
}

/**
 * Owns the DeviceMotion subscription at 100Hz.
 *
 * Architecture:
 * - Refs updated every tick (100Hz) → zero re-renders, used by Phase 3 crash detection
 * - State updated at 4Hz max → drives SensorCard UI
 *
 * Preprocessing:
 * - Primary: data.acceleration (gravity already removed by OS)
 * - Fallback: accelerationIncludingGravity with manual high-pass filter (α=0.8)
 */
export function useDeviceMotion() {
  // ── Detection refs — updated at 100Hz, zero re-renders ─────────────────
  const gForceRef = useRef(0);
  const angularVelocityRef = useRef(0);
  const samplesAboveRef = useRef(0); // consecutive samples above threshold
  const peakGForceRef = useRef(0); // peak G within current event window
  const gravityRef = useRef({ x: 0, y: 0, z: 0 }); // manual high-pass filter
  const lastUIUpdateRef = useRef(0); // timestamp of last setState
  const isAvailableRef = useRef(false);

  // ── UI state — updated at 4Hz maximum ──────────────────────────────────
  const [displayData, setDisplayData] = useState<DeviceMotionDisplayData>({
    gForce: 0,
    angularVelocity: 0,
    peakG: 0,
    isAvailable: false,
  });

  const handleMeasurement = useCallback(
    (data: DeviceMotionMeasurement) => {
      // ── 1. Preprocessing — null safety & gravity removal ─────────────
      const accel = data.acceleration
        ? data.acceleration
        : (() => {
            const raw = data.accelerationIncludingGravity;
            if (!raw) return { x: 0, y: 0, z: 0 };
            const ALPHA = 0.8;
            gravityRef.current = {
              x: ALPHA * gravityRef.current.x + (1 - ALPHA) * (raw.x ?? 0),
              y: ALPHA * gravityRef.current.y + (1 - ALPHA) * (raw.y ?? 0),
              z: ALPHA * gravityRef.current.z + (1 - ALPHA) * (raw.z ?? 0),
            };
            return {
              x: (raw.x ?? 0) - gravityRef.current.x,
              y: (raw.y ?? 0) - gravityRef.current.y,
              z: (raw.z ?? 0) - gravityRef.current.z,
            };
          })();

      // ── 2. Feature extraction ────────────────────────────────────────
      const gForce =
        Math.sqrt(
          (accel.x ?? 0) ** 2 + (accel.y ?? 0) ** 2 + (accel.z ?? 0) ** 2
        ) / GRAVITY;

      const angularVelocity = data.rotationRate
        ? Math.sqrt(
            (data.rotationRate.alpha ?? 0) ** 2 +
              (data.rotationRate.beta ?? 0) ** 2 +
              (data.rotationRate.gamma ?? 0) ** 2
          )
        : 0;

      // ── 3. Write to refs (zero re-renders) ───────────────────────────
      gForceRef.current = gForce;
      angularVelocityRef.current = angularVelocity;

      // ── 4. Crash detection prep (Phase 3 will read these refs) ───────
      if (gForce > DETECTION_THRESHOLDS.gForce) {
        samplesAboveRef.current++;
        peakGForceRef.current = Math.max(peakGForceRef.current, gForce);
      } else {
        samplesAboveRef.current = 0;
        peakGForceRef.current = 0;
      }

      // ── 5. UI update throttled to 4Hz ────────────────────────────────
      const now = Date.now();
      if (
        now - lastUIUpdateRef.current >=
        DETECTION_THRESHOLDS.uiUpdateIntervalMs
      ) {
        lastUIUpdateRef.current = now;
        setDisplayData({
          gForce: gForceRef.current,
          angularVelocity: angularVelocityRef.current,
          peakG: peakGForceRef.current,
          isAvailable: isAvailableRef.current,
        });
      }
    },
    []
  );

  useEffect(() => {
    let subscription: ReturnType<typeof DeviceMotion.addListener> | null = null;

    async function initialize() {
      // Availability check
      const available = await DeviceMotion.isAvailableAsync();
      isAvailableRef.current = available;

      if (!available) {
        console.warn("[Sentinel] DeviceMotion unavailable on this device");
        setDisplayData((prev) => ({ ...prev, isAvailable: false }));
        return;
      }

      // Permission check (already granted in onboarding — just verify)
      const existing = await DeviceMotion.getPermissionsAsync().catch(
        () => ({ granted: true } as any)
      );
      if (!existing.granted) {
        console.warn("[Sentinel] Motion permission not granted");
        return;
      }

      // Set rate BEFORE subscribing — 10ms = 100Hz
      DeviceMotion.setUpdateInterval(
        1000 / DETECTION_THRESHOLDS.samplingHz
      );

      subscription = DeviceMotion.addListener(handleMeasurement);
    }

    initialize();

    return () => {
      subscription?.remove();
    };
  }, [handleMeasurement]);

  return {
    displayData, // → UI (SensorCards)
    gForceRef, // → Phase 3: crash detection
    angularVelocityRef, // → Phase 3: crash detection
    peakGForceRef, // → Phase 3: crash detection
    samplesAboveRef, // → Phase 3: crash detection
  };
}
