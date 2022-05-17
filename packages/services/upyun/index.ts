import type { ImageOptions, ImageUrlGenerator } from '../../image/src/interface'

const imageUrlGeneratorUpyun: ImageUrlGenerator = (url: string, options: ImageOptions = {}): string => {
  const query: Array<string> = []
  if (options.width)
    query.push(`fw/${options.width}`)
  if (options.blur)
    query.push(`gaussblur/${options.blur * 5}x${options.blur * 5}`)
  if (options.quanlity)
    query.push(`quality/${options.quanlity}`)
  if (options.format)
    query.push(`format/${options.format}`)

  return `${url}!/${query.join('/')}`
}

export { imageUrlGeneratorUpyun }
