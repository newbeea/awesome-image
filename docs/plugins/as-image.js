import Vue from 'vue'
import VueAsImage from 'as-image'
import { imageUrlGeneratorFP } from '@vue-awesome-image/services'
import Glitch from '@vue-awesome-image/filter-glitch'
import 'as-image/dist/style.css'
Vue.component('Glitch', Glitch)
Vue.use(VueAsImage, {
  imageUrlGenerator: imageUrlGeneratorFP,
})
