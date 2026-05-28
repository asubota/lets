import fs from 'node:fs'

import babel from '@rolldown/plugin-babel'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'

import { CompileTsServiceWorker } from './compile-service-workers-ts.plugin'

const base = '/lets/'
const pemFilesExist = fs.existsSync('localhost+2-key.pem') && fs.existsSync('localhost+2.pem')
const swFile = 'sw-custom.ts'

const domains = [
  'velogo',
  'paul-lange-ukraine',
  'b2b.veloportal',
  'obod.com',
  'kopylbros',
  'b2b.velotrade',
  'adm-import',
  'sporttop',
  'veloplaneta',
  'sport-device',
]

const escapedDomains = domains.map((d) => d.replace(/\./g, '\\.'))
const imageRegexString = `https?.+(?:${escapedDomains.join('|')}).+(?:webp|png|jpe?g)$`
const imageRegex = new RegExp(imageRegexString, 'i')

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react'
          }
          if (id.includes('node_modules/swiper/')) {
            return 'swiper'
          }
          if (id.includes('node_modules/html2canvas/')) {
            return 'html2canvas'
          }
          if (id.includes('node_modules/@popperjs/')) {
            return 'popper'
          }
          if (id.includes('node_modules/@tanstack/react-router') || id.includes('node_modules/@tanstack/react-query')) {
            return 'tanstack'
          }
          if (id.includes('node_modules/@mui/material')) {
            return 'mui'
          }
        },
      },
    },
  },
  plugins: [
    tanstackRouter({ target: 'react' }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    svgr(),
    ...(pemFilesExist ? [] : [basicSsl()]),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [new RegExp('^/lets/')],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
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
              cacheableResponse: { statuses: [0, 200] },
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
              cacheableResponse: { statuses: [0, 200] },
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
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: imageRegex,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 60 * 60 * 24 * 31, // cache for 31 days
              },
              cacheableResponse: { statuses: [0, 200] },
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
    ...(pemFilesExist && {
      https: {
        key: fs.readFileSync('localhost+2-key.pem'),
        cert: fs.readFileSync('localhost+2.pem'),
      },
    }),
  },
})
