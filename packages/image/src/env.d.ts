/// <reference types="vite/client" />
import 'vue-demi'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
// declare module './style.module.scss'

declare module 'vue-demi' {
  interface ComponentCustomProperties {
    $scopedSlots: any
  }
}
