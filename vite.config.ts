import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: '/',
  // inspectAttr solo in dev: escluso dai build di produzione (client e SSR)
  // così il markup renderizzato è identico ed evita mismatch di idratazione.
  plugins: [react(), ...(command === 'serve' ? [inspectAttr()] : [])],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router') || id.includes('/react/') || id.includes('/react-dom/'))
              return 'react'
            if (id.includes('@radix-ui') || id.includes('lucide-react'))
              return 'ui'
            return 'vendor'
          }
        },
      },
    },
  },
}));
