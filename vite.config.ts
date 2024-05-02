import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@lib/services": path.resolve(__dirname, "./src/lib/services"),
      "@lib/hooks": path.resolve(__dirname, "./src/lib/hooks"),
    },
  },
});
