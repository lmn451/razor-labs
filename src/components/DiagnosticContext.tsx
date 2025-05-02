import React, { createContext, useContext, useState, ReactNode } from "react";
import { Severity, SeverityMeta } from "./severity.ts";

// Define types for our diagnostic data
export interface Diagnostic {
  id: number;
  date: string;
  faultType: string;
  severity: string;
  status: string;
  value: number;
}

// Define the context type
interface DiagnosticsContextType {
  data: Diagnostic[];
  isLoading: boolean;
  error: Error | null;
  handleSaveDiagnostic: (newDiagnostic: Omit<Diagnostic, "id">) => void;
}

// Define props for the provider component
interface DiagnosticsProviderProps {
  children: ReactNode;
}

const initialData: Diagnostic[] = [
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

// Create the context with a default value
const DiagnosticsContext = createContext<DiagnosticsContextType | undefined>(
  undefined,
);

export function DiagnosticsProvider({ children }: DiagnosticsProviderProps) {
  const [rawData, setRawData] = useState<Diagnostic[]>(initialData);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<Error | null>(null);

  const handleSaveDiagnostic = (newDiagnostic: Omit<Diagnostic, "id">) => {
    const newId = rawData.length + 1;

    const diagnosticWithId: Diagnostic = {
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

export const useDiagnostics = (): DiagnosticsContextType => {
  const context = useContext(DiagnosticsContext);
  if (context === undefined) {
    throw new Error("useDiagnostics must be used within a DiagnosticsProvider");
  }
  return context;
};
