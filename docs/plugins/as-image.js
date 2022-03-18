import Vue from 'vue'
import VueAsImage from '@vue-awesome-image/as-image'
import { imageUrlGeneratorFP } from '@vue-awesome-image/services'
import Glitch from '@vue-awesome-image/filter-glitch'
import '@vue-awesome-image/as-image/dist/style.css'
Vue.component('Glitch', Glitch)
Vue.use(VueAsImage, {
  imageUrlGenerator: imageUrlGeneratorFP,
})
