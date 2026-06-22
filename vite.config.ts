import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const isWidget = mode === "widget";

  return {
    plugins: [react()],

    build: 
       {
          lib: {
            entry: path.resolve(__dirname, "src/index.widget.tsx"),
            name: "RohithWizard",
            formats: ["iife"],
            fileName: () => "bundle.js",
          },
          outDir: "dist",
          emptyOutDir: true,
          minify: "esbuild",
          sourcemap: true,
          cssCodeSplit: false,
          rollupOptions: {
            output: {
              inlineDynamicImports: true,
            },
          },
        }
  };
});