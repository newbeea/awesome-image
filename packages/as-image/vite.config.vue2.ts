import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin(), vueJsx()],
  build: {
    outDir: './dist/vue2',

    lib: {
      entry: resolve(__dirname, 'src/components/HelloWorld.vue'),
      fileName: format => `index.${format}.js`,
      name: 'HelloWorld',
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
