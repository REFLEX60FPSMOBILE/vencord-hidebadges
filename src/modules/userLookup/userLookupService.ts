import type { UserLookupResult, ThreatLevel } from "../../types/osint";

export const THREAT_THRESHOLDS = {
  SAFE: 20,
  LOW: 40,
  MEDIUM: 60,
  HIGH: 80,
  CRITICAL: 100,
} as const;

export function getThreatLevel(score: number): ThreatLevel {
  if (score <= THREAT_THRESHOLDS.SAFE) return "SAFE";
  if (score <= THREAT_THRESHOLDS.LOW) return "LOW";
  if (score <= THREAT_THRESHOLDS.MEDIUM) return "MEDIUM";
  if (score <= THREAT_THRESHOLDS.HIGH) return "HIGH";
  return "CRITICAL";
}

export function getThreatColor(level: ThreatLevel): string {
  switch (level) {
    case "SAFE": return "#43B581";
    case "LOW": return "#FAA61A";
    case "MEDIUM": return "#F47FFF";
    case "HIGH": return "#ED4245";
    case "CRITICAL": return "#7C0A02";
  }
}

export function buildUserLookupResult(userId: string): UserLookupResult {
  const now = Date.now();
  return {
    userId,
    username: "unknown",
    displayName: "unknown",
    avatarUrl: null,
    createdAt: now,
    accountAgeDays: 0,
    threatScore: 0,
    threatLevel: "SAFE",
    associatedAccounts: [],
    usernameHistory: [],
    mutualGuilds: [],
    flags: [],
    analyzedAt: now,
  };
}
