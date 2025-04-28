import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { SeverityMeta } from "./severity.ts";
import { formatFullDate } from "@/lib/utils/dateUtils.ts";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";

export const faultTypes = [
  "NDE bearing inner race deterioration",
  "NDE bearing mechanical looseness",
  "Normal operation",
];

const AddDiagnosticModal = ({ onClose, onSave }) => {
  const [date, setDate] = useState(new Date());
  const [faultType, setFaultType] = useState("");
  const [severity, setSeverity] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setDate(new Date());
    setFaultType("");
    setSeverity("");
    setError("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !faultType || !severity) {
      setError("All fields are required.");
      return;
    }

    const status = Object.entries(SeverityMeta).find(
      ([key, meta]) => meta.label === severity
    )?.[0];

    if (!status) {
      setError("Invalid severity selected.");
      return;
    }

    const value = SeverityMeta[status]?.rank;

    const utcDate = new Date(date);
    utcDate.setMinutes(utcDate.getMinutes() - utcDate.getTimezoneOffset());

    const newDiagnostic = {
      date: utcDate.toISOString(),
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
            <label className="block text-sm font-medium mb-1">Fault Type</label>
            <select
              value={faultType}
              onChange={(e) => setFaultType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select fault type</option>
              {faultTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select severity</option>
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
