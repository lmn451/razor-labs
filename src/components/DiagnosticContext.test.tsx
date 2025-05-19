import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DiagnosticsProvider, useDiagnostics } from "./DiagnosticContext";
import { SeverityMeta, Severity } from "./severity";

const TestComponent = () => {
  const { data, handleSaveDiagnostic } = useDiagnostics();

  return (
    <div>
      <div data-testid="diagnostic-count">{data.length}</div>
      <button
        data-testid="add-diagnostic"
        onClick={() =>
          handleSaveDiagnostic({
            date: "2024-06-01T00:00:00Z",
            faultType: "Test Fault",
            severity: "Critical",
            status: "critical",
            value: SeverityMeta[Severity.CRITICAL].rank,
          })
        }
      >
        Add Diagnostic
      </button>
      {data.map((diagnostic) => (
        <div key={diagnostic.id} data-testid={`diagnostic-${diagnostic.id}`}>
          {diagnostic.faultType}
        </div>
      ))}
    </div>
  );
};

describe("DiagnosticsContext", () => {
  beforeEach(() => {
    // Clear any mocks between tests
    vi.resetAllMocks();
  });

  it("provides access to diagnostic data", () => {
    render(
      <DiagnosticsProvider>
        <TestComponent />
      </DiagnosticsProvider>
    );

    // Check that the initial data is available
    const countElement = screen.getByTestId("diagnostic-count");
    expect(countElement.textContent).toBe("16"); // Assuming there are 16 items in the initial data
  });

  it("allows adding a new diagnostic", async () => {
    const user = userEvent.setup();

    render(
      <DiagnosticsProvider>
        <TestComponent />
      </DiagnosticsProvider>
    );

    // Get initial count
    const initialCount = Number(
      screen.getByTestId("diagnostic-count").textContent
    );

    // Click the add button
    await user.click(screen.getByTestId("add-diagnostic"));

    // Check that the count has increased
    await waitFor(() => {
      const countElement = screen.getByTestId("diagnostic-count");
      expect(Number(countElement.textContent)).toBe(initialCount + 1);
    });

    // Check that the new diagnostic is in the list
    const newDiagnostic = screen.getByTestId(`diagnostic-${initialCount + 1}`);
    expect(newDiagnostic.textContent).toBe("Test Fault");
  });
});
