import { createHttpLink, InMemoryCache, ApolloClient } from '@apollo/client/core'
import { provideApolloClient, DefaultApolloClient } from '@vue/apollo-composable'
import { defineNuxtPlugin } from '#app'
import apolloOptions from '#build/apollo.options.mjs'

const plugin = defineNuxtPlugin((nuxt) => {
  const httpLink = createHttpLink({
    uri: apolloOptions.uri,
  })
  let apolloClient
  const cache = new InMemoryCache()
  if (process.server) {
    apolloClient = new ApolloClient({
      ssrMode: true,
      link: httpLink,
      cache: new InMemoryCache(),
    })
    nuxt.hook('app:rendered', () => {
      nuxt.payload.data.apollo = apolloClient.extract()
    })
  }
  else {
    cache.restore(nuxt.payload.data.apollo)
    apolloClient = new ApolloClient({
      link: httpLink,
      cache,
    })
  }
  provideApolloClient(apolloClient)
  nuxt.provide('apollo', { DefaultApolloClient, apolloClient })
})

export { plugin as default }
