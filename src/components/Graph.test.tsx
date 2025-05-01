import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FusionTrendChart from "./Graph";
import { DiagnosticsProvider } from "./DiagnosticContext";

// Mock the recharts library
vi.mock("recharts", () => {
  return {
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="recharts-responsive-container">{children}</div>
    ),
    LineChart: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="recharts-line-chart">{children}</div>
    ),
    Line: (props: any) => <div data-testid="recharts-line" />,
    XAxis: (props: any) => <div data-testid="recharts-xaxis" />,
    YAxis: (props: any) => <div data-testid="recharts-yaxis" />,
    CartesianGrid: (props: any) => <div data-testid="recharts-cartesian-grid" />,
    Tooltip: (props: any) => <div data-testid="recharts-tooltip" />,
  };
});

describe("FusionTrendChart", () => {
  it("renders the chart with data from context", () => {
    render(
      <DiagnosticsProvider>
        <FusionTrendChart />
      </DiagnosticsProvider>
    );

    // Check that the chart components are rendered
    expect(screen.getByTestId("recharts-responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("recharts-line-chart")).toBeInTheDocument();
    expect(screen.getByTestId("recharts-line")).toBeInTheDocument();
    expect(screen.getByTestId("recharts-xaxis")).toBeInTheDocument();
    expect(screen.getByTestId("recharts-yaxis")).toBeInTheDocument();
    expect(screen.getByTestId("recharts-cartesian-grid")).toBeInTheDocument();
    expect(screen.getByTestId("recharts-tooltip")).toBeInTheDocument();
    
    // Check chart title
    expect(screen.getByText(/Fusion trend/i)).toBeInTheDocument();
  });

  it("shows 'From' date based on first data point", () => {
    render(
      <DiagnosticsProvider>
        <FusionTrendChart />
      </DiagnosticsProvider>
    );

    // Check 'From' date is displayed
    // This regex will match 'From' followed by any text (which would be the date)
    const fromDateRegex = /From .+/i;
    expect(screen.getByText(fromDateRegex)).toBeInTheDocument();
  });
});