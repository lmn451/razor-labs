export const Severity = Object.freeze({
  CRITICAL: "critical",
  WARNING: "warning",
  GOOD: "good",
});

export const SeverityMeta = {
  [Severity.CRITICAL]: { label: "Critical", color: "#ff4d4d", rank: 1 },
  [Severity.WARNING]: { label: "Warning", color: "#ffa500", rank: 2 },
  [Severity.GOOD]: { label: "Normal", color: "#33cc33", rank: 3 },
};
