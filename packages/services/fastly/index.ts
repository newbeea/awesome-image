import type { ImageOptions, ImageUrlGenerator } from '../../as-image/src/interface'

const imageUrlGeneratorFastly: ImageUrlGenerator = (url: string, options: ImageOptions = {}): string => {
  const query: Array<string> = Object.entries(options).map(kv => `${kv[0]}=${kv[1]}`)

  if (/(.+\?$)|(.+\?.+&$)/.test(url))
    return url + query.join('&')
  else if (/.+\?.+/.test(url))
    return `${url}&${query.join('&')}`
  else
    return `${url}?${query.join('&')}`
}

export { imageUrlGeneratorFastly }
