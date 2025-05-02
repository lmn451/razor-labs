import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";
import { DiagnosticsProvider } from "./components/DiagnosticContext";
import { ModalProvider } from "./components/ModalContext";
import { ThemeProvider } from "./components/ThemeContext";

import "./index.css";

// Use lazy loading for the App component
const App = lazy(() => import("./components/App"));

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider>
        <Layout>
          <DiagnosticsProvider>
            <ModalProvider>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-screen">
                    Loading application...
                  </div>
                }
              >
                <App />
              </Suspense>
            </ModalProvider>
          </DiagnosticsProvider>
        </Layout>
      </ThemeProvider>
    </StrictMode>
  );
}
