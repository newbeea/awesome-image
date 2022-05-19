
import { isVue3 } from 'vue-demi'
import type { App, Plugin } from 'vue-demi'

import Image from './components/index'
import type { AsImageOptions } from './interface'

export type SFCWithInstall<T> = T & Plugin

Image.install = (app: any, options: AsImageOptions = {}) => {
  if (options.imageUrlGenerator) {
    if (isVue3) {
      app.provide('imageUrlGenerator', options.imageUrlGenerator)
      app.provide('$asImageOptions', options)
    }
    else {
      app.prototype.$imageUrlGenerator = options.imageUrlGenerator
      app.prototype.$asImageOptions = options
    }
  }
  app.component(Image.name, Image)
}
const AsImage = Image as SFCWithInstall<typeof Image>
export { AsImage }
export default AsImage
