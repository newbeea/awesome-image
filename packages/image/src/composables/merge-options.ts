import type { ToRefs } from 'vue-demi'
import { ref } from 'vue-demi'
import type { AsImageOptions } from '../interface'
import imageUrlGeneratorDefault from '../composables/default-image-provider'

const defaultOptions: AsImageOptions = {
  quanlity: 0,
  format: '',
  lazy: false,
  placeholderLazyOffset: '0px',
  imageLazyOffset: '0px',
  responsive: false,
  progressive: false,
  breakpoints: [640, 768, 1024, 1280, 1536],
  sizes: '100vw',
  imageUrlGenerator: imageUrlGeneratorDefault,
  duration: 1,
  autoWebp: false,
}

export function useMergedOptions(props: ToRefs<AsImageOptions>, globals: AsImageOptions = {}) {
  const mergedOptions: any = {};
  (Object.keys(defaultOptions) as (keyof AsImageOptions)[]).forEach((key) => {
    mergedOptions[key] = (props[key]?.value ? props[key] : undefined) ?? ref(globals[key] ?? defaultOptions[key])
  })
  return mergedOptions as ToRefs<Required<AsImageOptions>>
}
