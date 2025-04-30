import { Plugin } from 'vite'
import { InputOptions, OutputOptions, rollup } from 'rollup'
import rollupPluginTypescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

const swFile = 'sw-custom.ts'

async function compileServiceWorker() {
  const inputOptions: InputOptions = {
    input: `src/${swFile}`,
    plugins: [rollupPluginTypescript({}), nodeResolve(), terser()],
  }

  const outputOptions: OutputOptions = {
    file: `public/${swFile.replace('.ts', '.js')}`,
    format: 'es',
  }

  const bundle = await rollup(inputOptions)
  await bundle.write(outputOptions)
  await bundle.close()
}

export const CompileTsServiceWorker = (): Plugin => ({
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
