import { createApp } from 'vue-demi'
import { imageUrlGeneratorFP } from '@vue-awesome-image/services'
import App from './App.vue'
import VueAwesomeImage from '.'
const app = createApp(App)
app.use(VueAwesomeImage, {
  imageUrlGenerator: imageUrlGeneratorFP,
})
app.mount('#app')
