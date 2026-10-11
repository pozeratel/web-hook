import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  base: "/web-hook/",
  plugins: [react()],
  server: { proxy: { "/api": "http://127.0.0.1:3001" } },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("libphonenumber-js") ||
            id.includes("react-phone-number-input")
          )
            return "phone";
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
