import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Assets": path.resolve(__dirname, "src/assets"),
      "@Adapters": path.resolve(__dirname, "src/adapters"), 
      "@Components": path.resolve(__dirname, "src/components"), 
      "@Context": path.resolve(__dirname, "src/context"), 
      "@Hooks": path.resolve(__dirname, "src/hooks"),
      "@Middleware": path.resolve(__dirname, "src/middleware"), 
      "@Pages": path.resolve(__dirname, "src/pages"), 
      "@Routes": path.resolve(__dirname, "src/routes")
    },
  },
})
