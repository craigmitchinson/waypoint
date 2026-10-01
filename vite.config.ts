/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5183, strictPort: true, open: true },
  test: { environment: "node", include: ["src/**/*.test.ts", "src/**/*.test.tsx"] },
});
