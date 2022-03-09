
import type { ImageOptions, ImageUrlGenerator } from '../interface'
const imageUrlGeneratorDefault: ImageUrlGenerator = (url: string, options: ImageOptions = {}): string => url
export default imageUrlGeneratorDefault
