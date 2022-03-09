
import type { App } from 'vue-demi'
import AsImage from './components/AsImage'
import type { ImageUrlGenerator } from './interface'

export { AsImage }
export default {
  install: (app: App, options: {
    imageUrlGenerator?: ImageUrlGenerator
  } = {}) => {
    if (options.imageUrlGenerator) {
      app.config.globalProperties.$useImageProvider = options.imageUrlGenerator
      app.provide('imageUrlGenerator', options.imageUrlGenerator)
    }
    app.component('AsImage', AsImage)
  },
}
