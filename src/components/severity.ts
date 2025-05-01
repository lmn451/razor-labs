export const Severity = {
  CRITICAL: "critical",
  WARNING: "warning",
  GOOD: "good",
} as const;

export type SeverityType = (typeof Severity)[keyof typeof Severity];

export interface SeverityMetaType {
  label: string;
  color: string;
  rank: number;
}

export const SeverityMeta: Record<SeverityType, SeverityMetaType> = {
  [Severity.CRITICAL]: { label: "Critical", color: "#ff4d4d", rank: 1 },
  [Severity.WARNING]: { label: "Warning", color: "#ffa500", rank: 2 },
  [Severity.GOOD]: { label: "Normal", color: "#33cc33", rank: 3 },
};
