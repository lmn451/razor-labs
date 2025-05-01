import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { DiagnosticsProvider } from "./DiagnosticContext";

// Create a simple wrapper component instead of using ModalProvider
// This avoids having to mock complex context behavior
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <DiagnosticsProvider>
      {children}
    </DiagnosticsProvider>
  );
};

// Mock the modals at a high level without using the context
vi.mock("@/hooks/useModalContext", () => ({
  useModal: () => ({
    modalState: {
      modalType: null,
      modalProps: {}
    },
    openModal: vi.fn(),
    closeModal: vi.fn()
  }),
  ModalContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
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

// Skip rendering the modal renderer component in tests
vi.mock("./ModalRenderer", () => ({
  __esModule: true,
  default: () => null
}));

describe("App Component Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders main components correctly", () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Check that the chart container is rendered
    expect(screen.getByTestId("mock-chart-container")).toBeInTheDocument();
    
    // Check that the diagnostics title is displayed
    expect(screen.getByText("Diagnostics")).toBeInTheDocument();
    
    // Check that the Add new button is present
    expect(screen.getByRole("button", { name: /add new/i })).toBeInTheDocument();
  });
});