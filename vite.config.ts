import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

const base = 'lets'

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          mui: ['@mui/material'],
        },
      },
    },
  },
  plugins: [react(), basicSsl()],
  server: {
    port: 8000,
  },
})
