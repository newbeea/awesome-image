import type { ImageOptions, ImageUrlGenerator } from '../../as-image/src/interface'

const imageUrlGeneratorImagekit: ImageUrlGenerator = (url: string, options: ImageOptions = {}): string => {
  const params: Array<string> = []
  if (options.width)
    params.push(`w-${options.width}`)
  if (options.blur)
    params.push(`bl-${options.blur * 5}`)
  if (options.quantity)
    params.push(`q-${options.quantity}`)
  if (options.format)
    params.push(`f-${options.format}`)

  const query = `tr=${params.join(',')}`

  if (/(.+\?$)|(.+\?.+&$)/.test(url))
    return url + query
  else if (/.+\?.+/.test(url))
    return `${url}&${query}`
  else
    return `${url}?${query}`
}

export { imageUrlGeneratorImagekit }
