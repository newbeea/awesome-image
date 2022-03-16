import path from 'path'
import { defineNuxtConfig } from 'nuxt3'
// import '@nuxt3/apollo-module'
// import '@nuxt3/graphql-codegen-module'
// import '@unocss/nuxt'
import viteSvgIcons from 'vite-plugin-svg-icons'
export default defineNuxtConfig({
  app: {
    // cdnURL: 'https://d17a2275ko4nj4.cloudfront.net', // upload .output/server/public to cdn when using serverless
  },
  buildModules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@intlify/nuxt3',
  ],
  build: {
    transpile: ['@vue-awesome-image/as-image', '@vue-awesome-image/as-image-group', '@icon-park/vue-next'],
  },
  unocss: {
    uno: true,
    attributify: true,
    preflight: true,
    icons: {
      scale: 1.2,
    },
    rules: [
      ['text-apollo', { color: '#112B49' }],
    ],
    shortcuts: [
      ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ],
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
    plugins: [
      viteSvgIcons({
        iconDirs: [path.resolve(process.cwd(), 'assets/svgs/')],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
  },
  intlify: {
    localeDir: 'locales', // set the `locales` directory at source directory of your Nuxt application
    vueI18n: {
    },
  },
})
