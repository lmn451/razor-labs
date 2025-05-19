/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

// Environment type definitions
type NodeEnv = "development" | "production" | "test";
declare const process: {
  env: {
    NODE_ENV: NodeEnv;
    [key: string]: string | undefined;
  };
  cwd: () => string;
};

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and parse the compiler config
const compilerConfig = JSON.parse(
  readFileSync(new URL("./compiler.config.json", import.meta.url), "utf-8")
);

import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load environment variables (prefixed with _ to indicate intentionally unused)
  const _env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ["babel-plugin-react-compiler", compilerConfig],
          ],
        },
      }),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,ttf}"],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "gstatic-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /\.[jt]sx?$/,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "js-cache",
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                },
              },
            },
            {
              urlPattern: /\.[a-z0-9]{8}\.(css|js)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "hashed-assets",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
              },
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "image-cache",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
              },
            },
          ],
        },
        manifest: {
          name: "Data Mind",
          short_name: "DataMind",
          description: "Data visualization application",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          start_url: "/razor-labs/",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any maskable",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
        devOptions: {
          enabled: process.env.NODE_ENV === "development",
          type: "module",
          navigateFallback: "index.html",
        },
      }),
    ],
    base: "/razor-labs/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Split React and ReactDOM into their own chunk
            "react-vendor": ["react", "react-dom"],
            // Split UI libraries into their own chunk
            "ui-vendor": [
              "@radix-ui/react-icons",
              "@radix-ui/react-popover",
              "@radix-ui/react-slot",
              "lucide-react",
              "class-variance-authority",
              "clsx",
              "tailwind-merge",
            ],
            // Split chart libraries into their own chunk
            "chart-vendor": ["recharts"],
            // Split date picker into its own chunk
            "date-vendor": ["react-day-picker"],
          },
        },
      },
      // Increase the warning limit if needed
      chunkSizeWarningLimit: 600,
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "production"
      ),
    },
  };
});
