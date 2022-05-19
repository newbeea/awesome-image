
import type { Ref } from 'vue-demi'
import { computed } from 'vue-demi'
import type { ImageUrlGenerator } from '../interface'

export function useResponsive(src: Ref<any>, breakpoints: Ref<Array<number>>, imageUrlGenerator: Ref<ImageUrlGenerator>, options: any = {}) {
  const srcset = computed(() => breakpoints.value.map((size) => {
    const url = imageUrlGenerator.value(src.value, Object.assign({
      width: size,
    }, options))
    return `${url} ${size}w`
  }).join(', '))
  return srcset
}
