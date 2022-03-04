import { createApp } from 'vue-demi'
import { useFpProvider } from '@vue-awesome-image/providers'
import App from './App.vue'
import VueAwesomeImage from '.'
const app = createApp(App)
app.use(VueAwesomeImage, {
  imageProvider: useFpProvider,
})
app.mount('#app')
