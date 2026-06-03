import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  publicDir: false,
  plugins: [react()],
  build: {
    outDir: "dist-lib",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "edukuk",
      formats: ["es", "cjs"],
      fileName: (format) => `edukuk.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "i18next",
        "react-i18next",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
  },
});
