<script setup lang="ts">
import 'virtual:svg-icons-register'
useMeta({
  title: 'Nuxt3 + Apollo Starter',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
  ],
  link: [
    { rel: 'shortcut icon', href: '/favicon.ico' },
  ],
})
const { setPreferredLanguage } = useLocal()
setPreferredLanguage()
</script>

<template>
  <main class="py-20 px-10 text-center">
    <NuxtPage />
    <Footer />
  </main>
</template>

<style>
@import '~/styles/main.css';
</style>
