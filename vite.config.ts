import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { CompileTsServiceWorker } from './compile-service-workers-ts.plugin'

const base = '/lets/'

const swFile = 'sw-custom.ts'

const ReactCompilerConfig = {}

export default defineConfig({
  base,
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          swiper: ['swiper'],
          reactColor: ['react-color'],
          tesseract: ['tesseract.js'],
          html2canvas: ['html2canvas'],
          popper: ['@popperjs/core'],
          tanstack: ['@tanstack/react-router', '@tanstack/react-query'],
          mui: ['@mui/material'],
        },
      },
    },
  },
  plugins: [
    TanStackRouterVite({ target: 'react' }),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    svgr(),
    basicSsl(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [new RegExp('^/lets/')],
      },
      workbox: {
        importScripts: [swFile.replace('.ts', '.js')],
        navigateFallbackAllowlist: [new RegExp('^/lets/')],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/apis\.google\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-api-cache',
              expiration: {
                maxEntries: 8,
                maxAgeSeconds: 60 * 60 * 24 * 21, // <== 21 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 8,
                maxAgeSeconds: 60 * 60 * 24 * 300, // <== 300 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 8,
                maxAgeSeconds: 60 * 60 * 24 * 300, // <== 300 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      includeAssets: ['logo.webp', '192.png', 'favicon.ico'],
      manifest: {
        name: 'Lets Bike',
        short_name: 'Lets Bike',
        description: 'Lets Bike',
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
    CompileTsServiceWorker(),
  ],
  resolve: {
    conditions: ['mui-modern', 'module', 'browser', 'development|production'],
  },
  server: {
    port: 8000,
  },
})
