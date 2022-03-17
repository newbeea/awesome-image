import Vue from 'vue'
import AsImage from '@vue-awesome-image/as-image'
import { imageUrlGeneratorFP } from '@vue-awesome-image/services'

import '@vue-awesome-image/as-image/dist/style.css'
import './reset.css'
Vue.use(AsImage, {
  imageUrlGenerator: imageUrlGeneratorFP
})

// export default ({ app }, inject) => {
//   // Set the function directly on the context.app object
//   inject('imageUrlGenerator', imageUrlGeneratorFP)
// }