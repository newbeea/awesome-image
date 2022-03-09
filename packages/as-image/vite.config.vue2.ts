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
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: format => `index.${format}.js`,
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
