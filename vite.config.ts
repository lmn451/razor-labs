/// <reference types="vitest" />
import { defineConfig } from "vitest/config"; // Updated import
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/razor-labs/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true, // Use Vitest global APIs
    environment: "jsdom", // Simulate browser environment
    setupFiles: "./src/setupTests.js", // Setup file for test environment
    // Optional: include css processing if needed for component tests
    // css: true,
  },
});