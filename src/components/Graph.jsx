import React from "react";
import { useDiagnostics } from "./DiagnosticContext";
import { processDataForGraph } from "@/lib/utils/dataProcessing";

import { SeverityMeta } from "./severity";
import { formatDisplayDate, formatSimpleDate } from "@/lib/utils/dateUtils";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload } = props;

  if (!payload) {
    return null;
  }

  const color = SeverityMeta[payload.status]?.color || stroke;

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

const FusionTrendChart = () => {
  const { data } = useDiagnostics();
  const chartData = processDataForGraph(data);

  const firstDate =
    chartData && chartData.length > 0 ? chartData[0].date : null;
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
            formatter={(value, name, props) => {
              const { faultType, severity } = props.payload;
              return [`Severity: ${severity}`, `Fault: ${faultType}`];
            }}
            labelFormatter={(dateStr) => `Date: ${formatDisplayDate(dateStr)}`}
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
