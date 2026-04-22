// Detection thresholds — single source of truth for sensor monitoring & crash detection.
//
// Sources:
//   Paciorek, M. et al. (2021). Smartphone-based crash detection using MEMS sensors.
//   Liu, H. et al. (2022). Multi-sensor fusion for reliable accident detection.

export const DETECTION_THRESHOLDS = {
  // ── Primary impact signal ──────────────────────────────────────────────
  gForce: 2.5, // G — minimum impact magnitude to evaluate
  gForceSustainedMs: 30, // ms — must sustain above threshold (filters drops/bumps)
  minSamples: 3, // samples at 100Hz = 30ms

  // ── Rotational corroboration ───────────────────────────────────────────
  angularVelocity: 200, // deg/s — rollover / spin-out threshold

  // ── GPS corroboration ──────────────────────────────────────────────────
  speedDropKmh: 30, // km/h — sudden stop confirms crash
  minSpeedForGPS: 5, // km/h — below this, GPS deltaV is unreliable

  // ── Severity bands (for report generation) ─────────────────────────────
  severity: {
    LOW: { min: 2.5, max: 3.0 },
    MEDIUM: { min: 3.0, max: 5.0 },
    HIGH: { min: 5.0, max: 8.0 },
    CRITICAL: { min: 8.0, max: Infinity },
  },

  // ── Confidence scoring weights ─────────────────────────────────────────
  confidence: {
    gForceBase: 40, // primary signal present
    gForceStrong: 20, // significantly above threshold
    angularConfirmed: 25, // gyroscope corroborates
    gpsConfirmed: 15, // GPS speed drop corroborates
  },

  // ── System ─────────────────────────────────────────────────────────────
  samplingHz: 100, // target sampling rate
  uiUpdateHz: 4, // UI refresh rate
  uiUpdateIntervalMs: 250, // 1000 / 4Hz
  crashCooldownMs: 10_000, // prevent double-trigger during countdown
} as const;
