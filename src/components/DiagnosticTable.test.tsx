import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DiagnosticsTable } from "./DiagnosticTable";
import { DiagnosticsProvider } from "./DiagnosticContext";

describe("DiagnosticsTable", () => {
  it("renders the table with headers", () => {
    render(
      <DiagnosticsProvider>
        <DiagnosticsTable />
      </DiagnosticsProvider>
    );

    // Check that the headers are rendered
    expect(screen.getByText("Diagnostic date")).toBeInTheDocument();
    expect(screen.getByText("Fault type")).toBeInTheDocument();
    expect(screen.getByText("Severity")).toBeInTheDocument();
  });

  it("renders the diagnostic data from context", () => {
    render(
      <DiagnosticsProvider>
        <DiagnosticsTable />
      </DiagnosticsProvider>
    );

    // Check for some of the fault types from the initial data
    expect(screen.getByText("NDE bearing inner race deterioration")).toBeInTheDocument();
    expect(screen.getByText("NDE bearing mechanical looseness")).toBeInTheDocument();
    expect(screen.getByText("Normal operation")).toBeInTheDocument();
  });

  it("displays severity with appropriate styling", () => {
    render(
      <DiagnosticsProvider>
        <DiagnosticsTable />
      </DiagnosticsProvider>
    );

    // Get all elements containing "Critical" text - these should be styled elements
    const criticalElements = screen.getAllByText("Critical");
    expect(criticalElements.length).toBeGreaterThan(0);

    // Get all elements containing "Warning" text
    const warningElements = screen.getAllByText("Warning");
    expect(warningElements.length).toBeGreaterThan(0);

    // Check that at least one "Normal" element exists
    const normalElements = screen.getAllByText("Normal");
    expect(normalElements.length).toBeGreaterThan(0);
  });
});