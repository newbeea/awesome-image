import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    outDir: './dist/vue3',

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
