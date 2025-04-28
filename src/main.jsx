import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Layout from "./Layout.jsx"; // Use alias path
import { DiagnosticsProvider } from "./components/DiagnosticContext.tsx";
import { ModalProvider } from "./components/ModalContext.tsx";

import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Layout>
      <DiagnosticsProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </DiagnosticsProvider>
    </Layout>
  </StrictMode>
);
