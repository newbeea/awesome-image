import Vue from 'vue'
import { AsImage } from '@awesome-image/image'
import { imageUrlGeneratorFP } from '@awesome-image/services'
import Glitch from '@awesome-image/filter-glitch'
import Crt from '@awesome-image/filter-crt'
import Ascii from '@awesome-image/filter-ascii'
import Hexagon from '@awesome-image/filter-hexagon'
import '@awesome-image/image/dist/style.css'
import { AsTransition } from '@awesome-image/transition'
import '@awesome-image/transition/dist/style.css'
Vue.use(AsImage, {
  imageUrlGenerator: imageUrlGeneratorFP,
})
Vue.use(Glitch)
Vue.use(Crt)
Vue.use(Ascii)
Vue.use(Hexagon)
Vue.use(AsTransition)
