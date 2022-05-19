
import { isVue3 } from 'vue-demi'
import type { App, Plugin } from 'vue-demi'

import Image from './components/index'
import type { ImageUrlGenerator } from './interface'

export type SFCWithInstall<T> = T & Plugin

Image.install = (app: any, options: {
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
  app.component(Image.name, Image)
}
const AsImage = Image as SFCWithInstall<typeof Image>
export { AsImage }
export default AsImage
