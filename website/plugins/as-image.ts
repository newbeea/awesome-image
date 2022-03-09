
import VueAsImage from '@vue-awesome-image/as-image'
import '@vue-awesome-image/as-image/dist/style.css'
import { imageUrlGeneratorFP } from '@vue-awesome-image/services'

// @ts-expect-error #app resolved by Nuxt3
import { defineNuxtPlugin, NuxtApp } from '#app'
export default defineNuxtPlugin((nuxt: NuxtApp) => {
  nuxt.vueApp.use(VueAsImage, {
    imageUrlGenerator: imageUrlGeneratorFP
  })
  
})
