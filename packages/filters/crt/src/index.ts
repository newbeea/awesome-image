
import type { App } from 'vue-demi'
import AsFilterAscii from './components/index.vue'

export { AsFilterAscii }
export default {
  install: (app: App) => {
    app.component(AsFilterAscii.name, AsFilterAscii)
  },
}
