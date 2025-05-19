import React, { StrictMode, lazy, Suspense, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/ThemeContext";
import { DiagnosticsProvider } from "./components/DiagnosticContext";
import { ModalProvider } from "./components/ModalContext";
import { useServiceWorker } from "./hooks/useServiceWorker";
import Layout from "./components/Layout";
import "./index.css";

// Use lazy loading for the App component
const App = lazy(() => import("./components/App"));

// Root component that wraps the app with providers
function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <DiagnosticsProvider>
        <ModalProvider>
          <Layout>
            <Suspense 
              fallback={
                <div className="flex items-center justify-center h-screen">
                  Loading application...
                </div>
              }
            >
              {children}
            </Suspense>
          </Layout>
        </ModalProvider>
      </DiagnosticsProvider>
    </ThemeProvider>
  );
}

// Main App component
export function Root() {
  // Register service worker in production
  useServiceWorker();
  
  return (
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>
  );
}

// Render the app
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<Root />);
}
