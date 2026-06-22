import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.widget.tsx"),
      name: "RohithWizard",
      formats: ["iife"],
      fileName: () => "bundle.js",
    },
    rollupOptions: {
      external: [],
    },
    minify: true,
  },
  define: {
    "process.env": {},
  },
});