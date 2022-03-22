
import type { App } from 'vue-demi'
import AsTransition from './components/Transition.vue'

export { AsTransition }
export default {
  install: (app: App) => {
    app.component(AsTransition.name, AsTransition)
  },
}
