
import { isVue3 } from 'vue-demi'
import type { App } from 'vue-demi'
import AsImage from './components/AsImage'
import type { ImageUrlGenerator } from './interface'

export { AsImage }
export default {
  install: (app: any, options: {
    imageUrlGenerator?: ImageUrlGenerator
  } = {}) => {
    if (options.imageUrlGenerator) {
      if (isVue3) {
        app.config.globalProperties.$asImageOptions = options
        app.provide('imageUrlGenerator', options.imageUrlGenerator)
      }
      else {
        app.prototype.$imageUrlGenerator = options.imageUrlGenerator
      }
    }
    app.component('AsImage', AsImage)
  },
}
