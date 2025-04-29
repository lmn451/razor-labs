import React from "react"; // Add React import
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDiagnostics, Diagnostic } from "./DiagnosticContext.tsx"; // Import Diagnostic type
import { SeverityMeta } from "./severity.ts";
import { formatDisplayDate } from "@/lib/utils/dateUtils.ts";

export function DiagnosticsTable(): React.ReactElement {
  const { data } = useDiagnostics();

  // Explicitly type sortedData
  const sortedData: Diagnostic[] = [...(data || [])].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const dateComparison = dateB.getTime() - dateA.getTime(); // Use getTime() for number comparison

    if (dateComparison === 0) {
      // Ensure status exists in SeverityMeta before accessing rank
      const rankA = SeverityMeta[a.status as keyof typeof SeverityMeta]?.rank ?? 0;
      const rankB = SeverityMeta[b.status as keyof typeof SeverityMeta]?.rank ?? 0;
      return rankB - rankA; // Sort by rank descending if dates are equal (higher rank first)
    }

    return dateComparison;
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Diagnostic date</TableHead>
              <TableHead>Fault type</TableHead>
              <TableHead className="w-[180px]">Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((diagnostic) => (
              <TableRow key={diagnostic.id}>
                <TableCell className="font-medium">
                  {formatDisplayDate(diagnostic.date)}
                </TableCell>
                <TableCell>{diagnostic.faultType}</TableCell>
                <TableCell>
                  <span
                    style={{
                      // Ensure status is a valid key for SeverityMeta
                      color:
                        SeverityMeta[diagnostic.status as keyof typeof SeverityMeta]
                          ?.color ?? "inherit", // Provide fallback color
                      fontWeight:
                        diagnostic.status === "critical" ? "bold" : "normal",
                    }}
                  >
                    {diagnostic.severity}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
