import React from "react";
import FusionTrendChart from "./components/Graph.tsx"; // Updated import path
import { DiagnosticsTable } from "./components/DiagnosticTable.tsx"; // Updated import path
import { useDiagnostics } from "./components/DiagnosticContext.tsx";
import { useModal } from "@/hooks/useModalContext.ts";
import { Button } from "./components/ui/button";
import { MODAL_TYPES } from "@/constants/modalTypes.ts";

function App(): React.ReactElement {
  const { isLoading, error, handleSaveDiagnostic } = useDiagnostics();
  const { openModal } = useModal();

  if (isLoading) return <div>Loading...</div>;
  // Ensure error is treated as Error type for accessing message
  if (error) return <div>Error loading data: {(error as Error).message}</div>;

  return (
    <div className="flex flex-col gap-8">
      <FusionTrendChart />
      <div className="py-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Diagnostics</h2>
          <Button
            onClick={() =>
              openModal(MODAL_TYPES.ADD_DIAGNOSTIC, {
                onSave: handleSaveDiagnostic,
              })
            }
            className="flex items-center gap-1"
          >
            Add new
          </Button>
        </div>
        <DiagnosticsTable />
      </div>
    </div>
  );
}

export default App;
