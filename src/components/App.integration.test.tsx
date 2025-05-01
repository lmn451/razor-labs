import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { DiagnosticsProvider } from "./DiagnosticContext";
import { ModalProvider } from "./ModalContext";

// Create a hoisted mock for useModal before vi.mock
const useModalMock = () => ({
  modalState: {
    modalType: 'ADD_DIAGNOSTIC',
    modalProps: {
      onSave: vi.fn()
    }
  },
  closeModal: vi.fn()
});

// Mock the modal component to simulate its behavior
vi.mock("./ModalRenderer", () => ({
  __esModule: true,
  default: () => {
    // Use the mock function
    const { modalState, closeModal } = useModalMock();
    
    if (!modalState.modalType) return null;
    
    // Simplified AddDiagnosticModal for integration testing
    return modalState.modalType === "ADD_DIAGNOSTIC" ? (
      <div data-testid="mock-add-diagnostic-modal">
        <h2>Add New Diagnostic</h2>
        <button
          data-testid="mock-save-diagnostic"
          onClick={() => {
            modalState.modalProps.onSave({
              date: "2024-06-01T00:00:00Z",
              faultType: "Test Integration Fault",
              severity: "Critical",
              status: "critical",
              value: 1
            });
            closeModal();
          }}
        >
          Save
        </button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    ) : null;
  }
}));

// Mock the recharts components to simplify testing
vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: any) => (
    <div data-testid="mock-chart-container">{children}</div>
  ),
  LineChart: ({ children }: any) => (
    <div data-testid="mock-line-chart">{children}</div>
  ),
  Line: () => <div data-testid="mock-line">Line</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  CartesianGrid: () => <div>Grid</div>,
  Tooltip: () => <div>Tooltip</div>,
}));

describe("Diagnostic Flow Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows viewing diagnostics and adding a new one", async () => {
    const user = userEvent.setup();
    
    render(
      <DiagnosticsProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </DiagnosticsProvider>
    );

    // Check that the chart and table are rendered
    expect(screen.getByTestId("mock-chart-container")).toBeInTheDocument();
    expect(screen.getByText("Diagnostics")).toBeInTheDocument();
    
    // Check initial table content
    const initialItems = screen.getAllByRole("row");
    const initialCount = initialItems.length - 1; // Subtract header row
    
    // Click Add new button
    await user.click(screen.getByText("Add new"));
    
    // Check modal appears
    await waitFor(() => {
      expect(screen.getByTestId("mock-add-diagnostic-modal")).toBeInTheDocument();
    });
    
    // Click save in the mock modal
    await user.click(screen.getByTestId("mock-save-diagnostic"));
    
    // Check that modal is closed and new item is added
    await waitFor(() => {
      expect(screen.queryByTestId("mock-add-diagnostic-modal")).not.toBeInTheDocument();
    });
    
    // Check that table has one more row
    const updatedItems = screen.getAllByRole("row");
    expect(updatedItems.length).toBe(initialCount + 2); // +1 for new row, +1 for header
    
    // Check for the new fault type in the table
    expect(screen.getByText("Test Integration Fault")).toBeInTheDocument();
  });
});