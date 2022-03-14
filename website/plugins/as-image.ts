
import VueAsImage from '@vue-awesome-image/as-image'
import '@vue-awesome-image/as-image/dist/style.css'
import { imageUrlGeneratorFP } from '@vue-awesome-image/services'
// import 'highlight.js/styles/atom-one-dark.css'
// import hljs from 'highlight.js';

// @ts-expect-error #app resolved by Nuxt3
import { defineNuxtPlugin, NuxtApp } from '#app'
export default defineNuxtPlugin((nuxt: NuxtApp) => {
  nuxt.vueApp.use(VueAsImage, {
    imageUrlGenerator: imageUrlGeneratorFP
  })
  // nuxt.vueApp.directive('highlight', {
  //   mounted(el) {
  //     let blocks = el.querySelectorAll('pre code')
  //     for (let i = 0; i < blocks.length; i++) {
  //       // blocks[i].innerHTML = blocks[i].innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  //       hljs.highlightElement(blocks[i])
  //     }
  //   }
  // })
  
})
