import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import Layout from "./components/Layout";
import { DiagnosticsProvider } from "./components/DiagnosticContext";
import { ModalProvider } from "./components/ModalContext";
import { ThemeProvider } from "./components/ThemeContext";

import "./index.css";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider>
        <Layout>
          <DiagnosticsProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </DiagnosticsProvider>
        </Layout>
      </ThemeProvider>
    </StrictMode>
  );
}