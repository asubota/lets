import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

const base = '/lets/'

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          swiper: ['swiper'],
          mui: ['@mui/material'],
        },
      },
    },
  },
  plugins: [
    react(),
    TanStackRouterVite(),
    svgr(),
    basicSsl(),
    VitePWA({
      scope: '/lets/',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [new RegExp('/lets/')],
      },
      workbox: {
        importScripts: ['sw-4.js'],
        navigateFallbackAllowlist: [new RegExp('/lets/')],
      },
      manifest: {
        name: 'Lets Bike',
        short_name: 'Lets Bike',
        description: '',
        theme_color: '#ea2b06',
        background_color: '#525252',
        display: 'standalone',
        icons: [
          {
            src: `${base}192.png`,
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    port: 8000,
  },
})
