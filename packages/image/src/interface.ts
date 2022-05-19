import type { ComputedRef, Ref } from 'vue-demi'
export interface ImageOptions {
  width?: number
  height?: number
  blur?: number
  quanlity?: number
  format?: string
}
export interface ImageUrlGenerator {
  (url: string, options: ImageOptions): string
}

export interface AsImageOptions {
  quanlity?: number
  format?: string
  lazy?: boolean
  placeholderLazyOffset?: string
  imageLazyOffset?: string
  responsive?: boolean
  progressive?: boolean
  breakpoints?: number[]
  sizes?: string
  imageUrlGenerator?: ImageUrlGenerator
  duration?: number
  autoWebp?: boolean
}
