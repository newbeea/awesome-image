import type { ComputedRef, Ref } from 'vue-demi'
export interface ImageOptions {
  width?: number
  height?: number
  blur?: number
  quantity?: number
  format?: string
}
export interface ImageProvider {
  (url: Ref<string>, options?: ImageOptions): ComputedRef<string> | Ref<string>
}
