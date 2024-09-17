import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { rollup, InputOptions, OutputOptions } from 'rollup'
import rollupPluginTypescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const base = '/lets/'

const swFile = 'sw-custom.ts'

const CompileTsServiceWorker = (): Plugin => ({
  name: 'compile-typescript-service-worker',
  async buildStart() {
    await compileServiceWorker()
  },
  async writeBundle() {
    await compileServiceWorker()
  },
  async watchChange(id) {
    if (id.endsWith(swFile)) {
      console.log('Service Worker updated. Recompiling...')
      await compileServiceWorker()
    }
  },

  async handleHotUpdate({ file }) {
    if (file.endsWith(swFile)) {
      console.log('Service Worker file changed. Recompiling...')
      await compileServiceWorker()
    }
  },
})

async function compileServiceWorker() {
  const inputOptions: InputOptions = {
    input: `src/${swFile}`,
    plugins: [rollupPluginTypescript({}), nodeResolve()],
  }

  const outputOptions: OutputOptions = {
    file: `public/${swFile.replace('.ts', '.js')}`,
    format: 'es',
  }

  const bundle = await rollup(inputOptions)
  await bundle.write(outputOptions)
  await bundle.close()
}

export default defineConfig({
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
        importScripts: [swFile.replace('.ts', '.js')],
        navigateFallbackAllowlist: [new RegExp('/lets/')],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 28, // <== 28 days
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
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 28, // <== 28 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        scope: '/lets/',
        start_url: '/lets/',
        name: 'Lets Bike',
        short_name: 'Lets Bike',
        description: '',
        theme_color: '#ea2b06',
        background_color: '#525252',
        display: 'standalone',
        icons: [
          {
            src: '/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
    CompileTsServiceWorker(),
  ],
  server: {
    port: 8000,
  },
})
