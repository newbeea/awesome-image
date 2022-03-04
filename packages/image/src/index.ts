
import type { App } from 'vue-demi'
import AsImage from './components/AsImage'
import type { ImageProvider } from './interface'

export { AsImage }
export default {
  install: (app: App, options: {
    imageProvider?: ImageProvider
  } = {}) => {
    if (options.imageProvider) {
      app.config.globalProperties.$useImageProvider = options.imageProvider
      app.provide('useImageProvider', options.imageProvider)
    }
  },
}
