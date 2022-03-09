import type { Ref } from 'vue-demi'
import { computed } from 'vue-demi'

function stringifyPrimitive(v: any) {
  switch (typeof v) {
    case 'string':
      return v

    case 'boolean':
      return v ? 'true' : 'false'

    case 'number':
      return isFinite(v) ? v : ''

    default:
      return ''
  }
}

function stringify(obj: any, sep?: string | undefined, eq?: string | undefined, name?: undefined) {
  sep = sep || '&'
  eq = eq || '='
  if (obj === null) { obj = undefined }

  else if (typeof obj === 'object') {
    return Object.keys(obj).map((k) => {
      const ks = encodeURIComponent(stringifyPrimitive(k)) + eq
      if (obj && Array.isArray(obj[k])) {
        return obj[k].map((v: any) => {
          return ks + encodeURIComponent(stringifyPrimitive(v))
        }).join(sep)
      }
      else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]))
      }
    }).join(sep)
  }

  if (!name) return ''
  return encodeURIComponent(stringifyPrimitive(name)) + eq
         + encodeURIComponent(stringifyPrimitive(obj))
}

export function useAppendQuery(url: Ref<string>, querystring: Record<string, string | number> = {}) {
  const newUrl = computed(() => {
    if (/(.+\?$)|(.+\?.+&$)/.test(url.value))
      return url.value + stringify(querystring)
    else if (/.+\?.+/.test(url.value))
      return `${url.value}&${stringify(querystring)}`
    else
      return `${url.value}?${stringify(querystring)}`
  })

  return newUrl
}
