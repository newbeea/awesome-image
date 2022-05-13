
import { isVue3 } from 'vue-demi'
import type { App } from 'vue-demi'
import AsImage from './components/Image'
import imageUrlGeneratorDefault from './composables/default-image-provider'
import type { ImageUrlGenerator } from './interface'

AsImage.install = (app: any, options: {
  imageUrlGenerator?: ImageUrlGenerator
} = {}) => {
  if (!options.imageUrlGenerator) {
    options.imageUrlGenerator = imageUrlGeneratorDefault
  }
  if (isVue3) {
    app.config.globalProperties.$asImageOptions = options
    app.provide('imageUrlGenerator', options.imageUrlGenerator)
  }
  else {
    app.prototype.$imageUrlGenerator = options.imageUrlGenerator
  }
  app.component(AsImage.name, AsImage)
}
export { AsImage }
export default AsImage
