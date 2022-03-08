import type { ComputedRef, Ref } from 'vue-demi'
import { computed } from 'vue-demi'
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

const useFpProvider: ImageProvider = (url: Ref<string>, options: ImageOptions = {}): ComputedRef<string> | Ref<string> => {
  const query: Array<string> = []
  if (options.width)
    query.push(`w=${options.width}`)
  if (options.blur)
    query.push(`b=${options.blur}`)
  if (options.quantity)
    query.push(`q=${options.quantity}`)
  if (options.format)
    query.push(`f=${options.format}`)

  const newUrl = computed(() => {
    if (/(.+\?$)|(.+\?.+&$)/.test(url.value))
      return url.value + query.join('&')
    else if (/.+\?.+/.test(url.value))
      return `${url.value}&${query.join('&')}`
    else
      return `${url.value}?${query.join('&')}`
  })

  return newUrl
}

export { useFpProvider }
