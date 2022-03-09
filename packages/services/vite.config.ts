import { resolve } from 'path'
import { defineConfig } from 'vite'
import typescript2 from 'rollup-plugin-typescript2'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [typescript2()],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      fileName: format => `index.${format}.js`,
      name: 'useImageUrl',
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
