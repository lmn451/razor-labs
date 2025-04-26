import React from "react";
import FusionTrendChart from "./components/Graph";
import { DiagnosticsTable } from "./components/DiagnosticTable";
import { useDiagnostics } from "./components/DiagnosticContext";
import { useModal } from "@/hooks/useModalContext";
import { Button } from "./components/ui/button";
import { MODAL_TYPES } from "@/constants/modalTypes";

function App() {
  const { isLoading, error, handleSaveDiagnostic } = useDiagnostics();
  const { openModal } = useModal();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

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
