import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import path module

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  server: {
    host: true, // Allows access from network
    allowedHosts: ["pickmypet.local"],
  },
  resolve: {
    alias: {
      "@utils": path.resolve("./src/utils"), // Map @utils to src/utils
      "@CSS": path.resolve("./src/assets/CSS"),
      "@Consts": path.resolve("./src/Consts"),
      "@store": path.resolve("./src/store"),
      "@components": path.resolve("./src/components"),
      "@hooks": path.resolve("./src/hooks"),
    },
  },
});
