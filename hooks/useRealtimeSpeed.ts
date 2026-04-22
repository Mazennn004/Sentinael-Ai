import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

/**
 * GPS speed hook running at ~4Hz via watchPositionAsync.
 *
 * Architecture:
 * - State: displaySpeed (km/h) → RadarSpeedometer, heading → optional compass
 * - Refs: speedRef, deltaVRef → Phase 3 crash fusion reads these
 *
 * Does NOT re-request permission — only checks existing grant from onboarding.
 */
export function useRealtimeSpeed() {
  // ── Refs — for crash fusion algorithm, zero re-renders ─────────────────
  const speedRef = useRef(0); // current speed in km/h
  const deltaVRef = useRef(0); // speed drop since last GPS tick
  const prevSpeedRef = useRef(0);

  // ── State — for UI ─────────────────────────────────────────────────────
  const [displaySpeed, setDisplaySpeed] = useState(0);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    async function initialize() {
      // Check existing permission (already granted in onboarding)
      const { granted } = await Location.getForegroundPermissionsAsync();
      if (!granted) {
        console.warn("[Sentinel] Location permission not granted");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 250, // 4Hz — matches GPS hardware limit
          distanceInterval: 0, // fire even when stationary
        },
        (location) => {
          const rawSpeed = location.coords.speed ?? 0;
          const speedKmh = Math.max(0, rawSpeed * 3.6); // m/s → km/h, clamp negative GPS artifact

          // Update crash fusion refs
          deltaVRef.current = prevSpeedRef.current - speedKmh;
          prevSpeedRef.current = speedKmh;
          speedRef.current = speedKmh;

          // Update UI state
          setDisplaySpeed(Math.round(speedKmh));
          setHeading(location.coords.heading ?? 0);
        }
      );
    }

    initialize();

    return () => {
      subscription?.remove();
    };
  }, []);

  return {
    displaySpeed, // → RadarSpeedometer speed prop
    heading, // → optional compass display
    speedRef, // → Phase 3: crash fusion (read-only)
    deltaVRef, // → Phase 3: deltaV > 30 km/h = sudden stop
  };
}
