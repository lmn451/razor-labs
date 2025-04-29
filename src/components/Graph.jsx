import React from "react";
import { useDiagnostics, Diagnostic } from "./DiagnosticContext.tsx"; // Import Diagnostic type
import { processDataForGraph, GraphDataPoint } from "@/lib/utils/dataProcessing.ts"; // Import GraphDataPoint type

import { SeverityMeta } from "./severity.ts";
import { formatDisplayDate, formatSimpleDate } from "@/lib/utils/dateUtils.ts";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  DotProps, // Import DotProps for typing
} from "recharts";

// Define props for CustomizedDot, extending DotProps and adding payload type
interface CustomizedDotProps extends DotProps {
  payload?: GraphDataPoint; // Use the specific payload type from dataProcessing
}

const CustomizedDot: React.FC<CustomizedDotProps> = (props) => {
  const { cx, cy, stroke, payload } = props;

  // Type guard for payload and essential coordinates
  if (!payload || typeof cx !== 'number' || typeof cy !== 'number') {
    // Return null or a default element if essential props are missing
    return null;
  }

  // Ensure payload.status is a valid key for SeverityMeta
  const color =
    SeverityMeta[payload.status as keyof typeof SeverityMeta]?.color ?? stroke;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={5}
        stroke={color}
        strokeWidth={2}
        fill="#fff"
      />
      <circle cx={cx} cy={cy} r={3} fill={color} />
    </g>
  );
};

const FusionTrendChart: React.FC = () => {
  const { data }: { data: Diagnostic[] } = useDiagnostics(); // Type the destructured data
  const chartData: GraphDataPoint[] = processDataForGraph(data); // Type the chartData

  const firstDate = chartData.length > 0 ? chartData[0].date : null;
  const formattedStartDate = firstDate ? formatSimpleDate(firstDate) : "N/A";

  return (
    <div className="w-full h-[300px] border border-[#eee] p-2.5 box-border">
      <div className="flex justify-between items-center mb-4 pb-2.5 border-b border-[#eee]">
        <h3 className="m-0 font-medium">
          <span className="mr-2 inline-block align-middle">📈</span> Fusion
          trend
        </h3>
        <div className="text-sm text-[#555]">📅 From {formattedStartDate}</div>
      </div>

      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#666" }}
            dy={10}
            tickFormatter={(dateStr) => formatDisplayDate(dateStr)}
          />
          <YAxis hide={true} domain={[0, 4]} type="number" />
          <Tooltip
            contentStyle={{ fontSize: "12px", padding: "5px 8px" }}
            // Explicitly type the props argument based on recharts Tooltip formatter signature
            formatter={(value: number, name: string, props: { payload: GraphDataPoint }) => {
              // Type the formatter arguments
              const { faultType, severity } = props.payload;
              return [`Severity: ${severity}`, `Fault: ${faultType}`];
            }}
            labelFormatter={(label: string) => `Date: ${formatDisplayDate(label)}`} // Type the label
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#cccccc"
            strokeWidth={2}
            dot={<CustomizedDot />}
            activeDot={{ r: 6, strokeWidth: 0, fill: "#555" }}
            isAnimationActive={false}
            legendType="none"
            strokeDasharray={null}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FusionTrendChart;
