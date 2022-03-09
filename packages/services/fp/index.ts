import type { ImageOptions, ImageUrlGenerator } from '../../as-image/src/interface'

const imageUrlGeneratorFP: ImageUrlGenerator = (url: string, options: ImageOptions = {}): string => {
  const query: Array<string> = []
  if (options.width)
    query.push(`w=${options.width}`)
  if (options.blur)
    query.push(`b=${options.blur}`)
  if (options.quantity)
    query.push(`q=${options.quantity}`)
  if (options.format)
    query.push(`f=${options.format}`)

  if (/(.+\?$)|(.+\?.+&$)/.test(url))
    return url + query.join('&')
  else if (/.+\?.+/.test(url))
    return `${url}&${query.join('&')}`
  else
    return `${url}?${query.join('&')}`
}

export { imageUrlGeneratorFP }
