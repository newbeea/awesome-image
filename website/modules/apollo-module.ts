import { fileURLToPath } from 'url'
import { dirname, resolve } from 'pathe'
import { defineNuxtModule, addTemplate, addPluginTemplate } from '@nuxt/kit'

export interface ApolloModuleOptions {
  uri: string
}
export default defineNuxtModule<ApolloModuleOptions>({

  meta: {
    name: '@nuxt3/apollo-module',
    configKey: 'apollo',
  },
  setup(options) {
    const __dirname__ = dirname(fileURLToPath(import.meta.url))
    console.log(121231231)
    // save options to apollo.options.mjs
    addTemplate({
      filename: 'apollo.options.mjs',
      getContents: () => `export default ${JSON.stringify(options)}`,
    })

    // add apollo plugin ( see plugin.ts ) to server and client
    addPluginTemplate({
      src: resolve(__dirname__, './plugin.mjs'),
      mode: 'all',
    })
  },
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    apollo?: ApolloModuleOptions
  }
  interface NuxtOptions {
    apollo?: ApolloModuleOptions
  }
}
