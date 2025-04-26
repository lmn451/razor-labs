import { createContext, useContext, useState } from "react";
import { Severity, SeverityMeta } from "./severity";
const initialData = [
  {
    id: 1,
    date: "2024-05-14T00:00:00Z",
    faultType: "NDE bearing inner race deterioration",
    severity: "Critical",
    status: "critical",
    value: SeverityMeta[Severity.CRITICAL].rank,
  },
  {
    id: 2,
    date: "2024-05-14T00:00:00Z",
    faultType: "NDE bearing mechanical looseness",
    severity: "Warning",
    status: "warning",
    value: SeverityMeta[Severity.WARNING].rank,
  },
  {
    id: 3,
    date: "2024-05-15T00:00:00Z",
    faultType: "NDE bearing mechanical looseness",
    severity: "Warning",
    status: "warning",
    value: SeverityMeta[Severity.WARNING].rank,
  },
  {
    id: 4,
    date: "2024-05-16T00:00:00Z",
    faultType: "NDE bearing mechanical looseness",
    severity: "Warning",
    status: "warning",
    value: SeverityMeta[Severity.WARNING].rank,
  },
  {
    id: 5,
    date: "2024-05-16T00:00:00Z",
    faultType: "NDE bearing inner race deterioration",
    severity: "Critical",
    status: "critical",
    value: SeverityMeta[Severity.CRITICAL].rank,
  },
  {
    id: 6,
    date: "2024-05-17T00:00:00Z",
    faultType: "NDE bearing mechanical looseness",
    severity: "Warning",
    status: "warning",
    value: SeverityMeta[Severity.WARNING].rank,
  },
  {
    id: 7,
    date: "2024-05-18T00:00:00Z",
    faultType: "Normal operation",
    severity: "Normal",
    status: "good",
    value: SeverityMeta[Severity.GOOD].rank,
  },
  {
    id: 8,
    date: "2024-05-19T00:00:00Z",
    faultType: "NDE bearing inner race deterioration",
    severity: "Critical",
    status: "critical",
    value: SeverityMeta[Severity.CRITICAL].rank,
  },
  {
    id: 9,
    date: "2024-05-20T00:00:00Z",
    faultType: "NDE bearing inner race deterioration",
    severity: "Critical",
    status: "critical",
    value: SeverityMeta[Severity.CRITICAL].rank,
  },
  {
    id: 10,
    date: "2024-05-21T00:00:00Z",
    faultType: "NDE bearing inner race deterioration",
    severity: "Critical",
    status: "critical",
    value: SeverityMeta[Severity.CRITICAL].rank,
  },
  {
    id: 11,
    date: "2024-05-22T00:00:00Z",
    faultType: "NDE bearing mechanical looseness",
    severity: "Warning",
    status: "warning",
    value: SeverityMeta[Severity.WARNING].rank,
  },
  {
    id: 12,
    date: "2024-05-23T00:00:00Z",
    faultType: "NDE bearing inner race deterioration",
    severity: "Critical",
    status: "critical",
    value: SeverityMeta[Severity.CRITICAL].rank,
  },
  {
    id: 13,
    date: "2024-05-24T00:00:00Z",
    faultType: "NDE bearing mechanical looseness",
    severity: "Warning",
    status: "warning",
    value: SeverityMeta[Severity.WARNING].rank,
  },
  {
    id: 14,
    date: "2024-05-25T00:00:00Z",
    faultType: "NDE bearing inner race deterioration",
    severity: "Critical",
    status: "critical",
    value: SeverityMeta[Severity.CRITICAL].rank,
  },
  {
    id: 15,
    date: "2024-05-26T00:00:00Z",
    faultType: "NDE bearing mechanical looseness",
    severity: "Warning",
    status: "warning",
    value: SeverityMeta[Severity.WARNING].rank,
  },
  {
    id: 16,
    date: "2024-05-27T00:00:00Z",
    faultType: "NDE bearing inner race deterioration",
    severity: "Critical",
    status: "critical",
    value: SeverityMeta[Severity.CRITICAL].rank,
  },
];

const DiagnosticsContext = createContext();

export function DiagnosticsProvider({ children }) {
  const [rawData, setRawData] = useState(initialData);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveDiagnostic = (newDiagnostic) => {
    const newId = rawData.length + 1;

    const diagnosticWithId = {
      id: newId,
      ...newDiagnostic,
    };

    setRawData([...rawData, diagnosticWithId]);
  };

  return (
    <DiagnosticsContext.Provider
      value={{
        data: rawData,
        isLoading,
        error,
        handleSaveDiagnostic,
      }}
    >
      {children}
    </DiagnosticsContext.Provider>
  );
}

export const useDiagnostics = () => useContext(DiagnosticsContext);
