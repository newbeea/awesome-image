import type { Ref } from 'vue-demi'

export function useDefaultImageProvider(url: Ref<string>, querystring: Record<string, string | number> = {}) {
  return url
}
