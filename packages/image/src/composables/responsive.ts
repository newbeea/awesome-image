
import type { Ref } from 'vue-demi'
import { computed } from 'vue-demi'
import type { ImageProvider } from '../interface'

export function useResponsive(src: Ref<any>, breakpoints: Ref<Array<number>>, useImageProvider: ImageProvider, options: any = {}) {
  const srcset = computed(() => breakpoints.value.map((size) => {
    const url = useImageProvider(src, Object.assign({
      width: size,
    }, options))
    console.log('🚀 ~ file: responsive.ts ~ line 11 ~ srcset ~ url', options)
    return `${url.value} ${size}w`
  }).join(', '))
  return srcset
}
