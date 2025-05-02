import React, { lazy, Suspense } from "react";
import { DiagnosticsTable } from "./DiagnosticTable";
import { useDiagnostics } from "./DiagnosticContext";
import { useModal } from "@/hooks/useModalContext";
import { Button } from "@/components/ui/button";
import { MODAL_TYPES } from "@/constants/modalTypes";

// Lazy load the chart component which uses recharts
const FusionTrendChart = lazy(() => import("./Graph"));

function App(): React.ReactElement {
  const { isLoading, error, handleSaveDiagnostic } = useDiagnostics();
  const { openModal } = useModal();

  if (isLoading) return <div>Loading...</div>;
  // Ensure error is treated as Error type for accessing message
  if (error)
    return (
      <div>
        Error loading data:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return (
    <div className="flex flex-col gap-8">
      <Suspense
        fallback={
          <div className="w-full h-[300px] border border-[#eee] p-2.5 box-border flex items-center justify-center">
            Loading chart...
          </div>
        }
      >
        <FusionTrendChart />
      </Suspense>
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
