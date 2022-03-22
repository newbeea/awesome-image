<script setup lang="ts">
const { setLocale, locale } = useLocal()
</script>
<template>
  <div
    text="xl gray4"
    m-5
    flex
    justify-center
    gap-3
  >
    <NuxtLink i-carbon-campsite to="/" />
    <a i-carbon-logo-github href="https://github.com/newbeea/nuxt3-apollo-starter" target="__blank" />
    <DarkToggle />
    <SvgIcon
      :name="locale"
      :width="24"
      :height="24"
      color="rgb(156, 163, 175)"
      @click="setLocale(locale === 'en' ? 'zh-CN' : 'en')"
    />
  </div>
</template>
