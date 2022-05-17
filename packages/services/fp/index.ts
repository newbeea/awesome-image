import type { ImageOptions, ImageUrlGenerator } from '../../image/src/interface'

const imageUrlGeneratorFP: ImageUrlGenerator = (url: string, options: ImageOptions = {}): string => {
  const query: Array<string> = []
  if (options.width)
    query.push(`w=${options.width}`)
  if (options.blur)
    query.push(`b=${options.blur}`)
  if (options.quanlity)
    query.push(`q=${options.quanlity}`)
  if (options.format)
    query.push(`f=${options.format}`)

  if (!query.length) return url

  if (/(.+\?$)|(.+\?.+&$)/.test(url)) // a.jpg? a.jpg?id=1&
    return url + query.join('&')
  else if (/.+\?.+/.test(url)) // a.jpg?id
    return `${url}&${query.join('&')}`
  else // a.jpg
    return `${url}?${query.join('&')}`
}

export { imageUrlGeneratorFP }
