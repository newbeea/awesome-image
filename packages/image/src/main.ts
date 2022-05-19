import { createApp } from 'vue-demi'
import { imageUrlGeneratorFP } from '@awesome-image/services'
import App from './App.vue'
import { AsImage } from '.'
const app = createApp(App)
app.use(AsImage, {
  imageUrlGenerator: imageUrlGeneratorFP,
  lazy: true,
})
app.mount('#app')
