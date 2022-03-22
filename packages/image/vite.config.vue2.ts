import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import vueJsx from '@vitejs/plugin-vue-jsx'
import rmTransition from './vite-plugin-vue2-transition'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  plugins: [rmTransition(), createVuePlugin(), vueJsx()],
  build: {
    outDir: './dist/vue2',

    lib: {
      formats: ['es', 'umd', 'cjs'],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: (format) => {
        if (format === 'es') return 'index.es.js'
        else if (format === 'umd') return 'index.umd.js'
        else if (format === 'cjs') return 'index.js'
      },
      name: 'AsImage',
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue', 'vue-demi'],
      output: {
        globals: {
          'vue': 'Vue',
          'vue-demi': 'VueDemi',
        },
      },
    },
  },
})
