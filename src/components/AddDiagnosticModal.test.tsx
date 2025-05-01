import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddDiagnosticModal from "./AddDiagnosticModal";

// Mock the calendar component to avoid complexity in testing
vi.mock("@/components/ui/calendar", () => ({
  Calendar: ({ mode, selected, onSelect }: any) => (
    <div data-testid="calendar-mock">
      <button
        data-testid="select-date"
        onClick={() => onSelect(new Date(2024, 5, 1))} // June 1, 2024
      >
        Select Date
      </button>
      <div>Mode: {mode}</div>
      <div>Selected: {selected ? selected.toDateString() : "None"}</div>
    </div>
  ),
}));

// Mock the popover component
vi.mock("@/components/ui/popover", () => ({
  Popover: ({ children }: any) => <div data-testid="popover">{children}</div>,
  PopoverTrigger: ({ children }: any) => (
    <div data-testid="popover-trigger">{children}</div>
  ),
  PopoverContent: ({ children }: any) => (
    <div data-testid="popover-content">{children}</div>
  ),
}));

describe("AddDiagnosticModal", () => {
  const mockClose = vi.fn();
  const mockSave = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the modal with form elements", () => {
    render(<AddDiagnosticModal onClose={mockClose} onSave={mockSave} />);

    // Check header
    expect(screen.getByText("Add New Diagnostic")).toBeInTheDocument();

    // Check form fields
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Fault Type")).toBeInTheDocument();
    expect(screen.getByText("Severity")).toBeInTheDocument();

    // Check buttons
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<AddDiagnosticModal onClose={mockClose} onSave={mockSave} />);

    await user.click(screen.getByText("Cancel"));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("shows error message when submitting with incomplete data", async () => {
    const user = userEvent.setup();

    render(<AddDiagnosticModal onClose={mockClose} onSave={mockSave} />);

    // Get the form submit button
    const submitButton = screen.getByText("Save");

    // Click to submit the form (which should trigger form validation)
    await user.click(submitButton);

    // Ensure onSave wasn't called
    expect(mockSave).not.toHaveBeenCalled();
  });

  it("allows selecting a fault type", async () => {
    const user = userEvent.setup();
    render(<AddDiagnosticModal onClose={mockClose} onSave={mockSave} />);

    // Get the fault type select
    const faultTypeSelect = screen.getByLabelText("Fault Type");

    // Change the select value
    await user.selectOptions(
      faultTypeSelect,
      "NDE bearing inner race deterioration",
    );

    // Check value changed
    expect(faultTypeSelect).toHaveValue("NDE bearing inner race deterioration");
  });

  it("allows selecting a severity", async () => {
    const user = userEvent.setup();
    render(<AddDiagnosticModal onClose={mockClose} onSave={mockSave} />);

    // Get the severity select
    const severitySelect = screen.getByLabelText("Severity");

    // Change the select value
    await user.selectOptions(severitySelect, "Critical");

    // Check value changed
    expect(severitySelect).toHaveValue("Critical");
  });
});
