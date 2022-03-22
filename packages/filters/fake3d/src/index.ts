
import type { App } from 'vue-demi'
import AsFilterFake3d from './components/index.vue'

export { AsFilterFake3d }
export default {
  install: (app: App) => {
    app.component(AsFilterFake3d.name, AsFilterFake3d)
  },
}
