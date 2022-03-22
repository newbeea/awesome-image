
import type { App } from 'vue-demi'
import AsFilterGlitch from './components/index.vue'

export { AsFilterGlitch }
export default {
  install: (app: App) => {
    app.component(AsFilterGlitch.name, AsFilterGlitch)
  },
}
