import { Diagnostic } from "@/components/DiagnosticContext";

interface GroupedData {
  [key: string]: Diagnostic[];
}

// Define GraphDataPoint type to use in Graph component
export interface GraphDataPoint extends Diagnostic {
  // It extends Diagnostic but can have additional fields if needed
}

export const processDataForGraph = (data: Diagnostic[]): GraphDataPoint[] => {
  if (!data || data.length === 0) {
    return [];
  }

  const groupedByDate: GroupedData = {};

  data.forEach((item) => {
    const dateKey = item.date.split("T")[0]; // Use just the date part as key
    if (!groupedByDate[dateKey]) {
      groupedByDate[dateKey] = [];
    }
    groupedByDate[dateKey].push(item);
  });

  // For each date, select the most severe diagnostic
  const result = Object.keys(groupedByDate).map((dateKey) => {
    // Sort by severity (critical is most severe)
    const sorted = groupedByDate[dateKey].sort((a, b) => a.value - b.value);

    // Return the most severe item
    return sorted[0] as GraphDataPoint;
  });

  // Sort by date (past to future)
  return result.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};