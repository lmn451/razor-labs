import React, { useState, useEffect, FormEvent, ChangeEvent } from "react"; // Import React and event types
import { Button } from "./ui/button";
import { SeverityMeta } from "./severity.ts"; // Keep SeverityMeta, Severity enum not strictly needed here yet
import { formatFullDate } from "@/lib/utils/dateUtils.ts";
import { Calendar } from "./ui/calendar";
import { Diagnostic } from "./DiagnosticContext.tsx"; // Import Diagnostic type
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";

export const faultTypes = [
  "NDE bearing inner race deterioration",
  "NDE bearing mechanical looseness",
  "Normal operation",
];

// Define props interface
interface AddDiagnosticModalProps {
  onClose: () => void;
  onSave: (newDiagnostic: Omit<Diagnostic, "id">) => void;
}

const AddDiagnosticModal: React.FC<AddDiagnosticModalProps> = ({
  onClose,
  onSave,
}) => {
  // Add types for state variables
  const [date, setDate] = useState<Date | undefined>(new Date()); // Allow undefined for calendar selection
  const [faultType, setFaultType] = useState<string>("");
  const [severity, setSeverity] = useState<string>(""); // Store the label (string)
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setDate(new Date());
    setFaultType("");
    setSeverity("");
    setError("");
    // The dependency array for useEffect should be empty if it only runs on mount
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if date is defined
    if (!date || !faultType || !severity) {
      setError("All fields are required.");
      return;
    }

    // Find the status key corresponding to the selected severity label
    const statusEntry = Object.entries(SeverityMeta).find(
      ([, meta]) => meta.label === severity
    );
    const status = statusEntry ? statusEntry[0] : undefined;

    if (!status || !(status in SeverityMeta)) {
      setError("Invalid severity selected.");
      return;
    }

    // Ensure status is a valid key before accessing rank
    const value = SeverityMeta[status as keyof typeof SeverityMeta]?.rank;

    // Ensure value is defined (it should be if status is valid)
    if (value === undefined) {
      setError("Could not determine severity rank.");
      return;
    }

    // Create a new Date object to avoid modifying the state directly if needed elsewhere
    const localDate = new Date(date);
    // Create a UTC date string based on the local date's year, month, day
    // This assumes the user intends to select a date, not a specific time
    const utcDateString = new Date(
      Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate())
    ).toISOString();


    const newDiagnostic: Omit<Diagnostic, "id"> = {
      date: utcDateString,
      faultType,
      severity,
      status,
      value,
    };

    onSave(newDiagnostic);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-[rgba(1,21,43,0.8)] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Diagnostic</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? formatFullDate(date) : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="mb-4">
            <label htmlFor="faultType" className="block text-sm font-medium mb-1">
              Fault Type
            </label>
            <select
              id="faultType" // Add id for label association
              value={faultType}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFaultType(e.target.value)
              }
              className="w-full p-2 border rounded"
              required // Add basic HTML validation
            >
              <option value="" disabled>
                Select fault type
              </option>
              {faultTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="severity" className="block text-sm font-medium mb-1">
              Severity
            </label>
            <select
              id="severity" // Add id for label association
              value={severity}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSeverity(e.target.value)
              }
              className="w-full p-2 border rounded"
              required // Add basic HTML validation
            >
              <option value="" disabled>
                Select severity
              </option>
              {Object.values(SeverityMeta).map((meta) => (
                <option key={meta.label} value={meta.label}>
                  {meta.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDiagnosticModal;
