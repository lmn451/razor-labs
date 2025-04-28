import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDiagnostics } from "./DiagnosticContext.tsx";
import { SeverityMeta } from "./severity.ts";
import { formatDisplayDate } from "@/lib/utils/dateUtils.ts";

export function DiagnosticsTable() {
  const { data } = useDiagnostics();

  const sortedData = [...(data || [])].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const dateComparison = dateB - dateA;

    if (dateComparison === 0) {
      return SeverityMeta[a.status]?.rank - SeverityMeta[b.status]?.rank;
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
                      color: SeverityMeta[diagnostic.status]?.color,
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
