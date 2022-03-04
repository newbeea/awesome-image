import type { Ref } from 'vue-demi'
import { computed } from 'vue-demi'

export function useFpProvider(url: Ref<string>, options: Record<string, string | number> = {}) {
  console.log('🚀 ~ file: index.ts ~ line 5 ~ useFpProvider ~ options', options)
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
