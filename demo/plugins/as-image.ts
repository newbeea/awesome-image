
import { AsImage } from '@awesome-image/image'
import { imageUrlGeneratorFP } from '@awesome-image/services'

// @ts-expect-error #app resolved by Nuxt3
import type { NuxtApp } from '#app'
import { defineNuxtPlugin } from '#app'
export default defineNuxtPlugin((nuxt: NuxtApp) => {
  nuxt.vueApp.use(AsImage, {
    imageUrlGenerator: imageUrlGeneratorFP,
  })
})
