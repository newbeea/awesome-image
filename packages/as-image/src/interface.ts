import type { ComputedRef, Ref } from 'vue-demi'
export interface ImageOptions {
  width?: number
  height?: number
  blur?: number
  quantity?: number
  format?: string
}
export interface ImageUrlGenerator {
  (url: string, options: ImageOptions): string
}
