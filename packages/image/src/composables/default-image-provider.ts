import type { ComputedRef, Ref } from 'vue-demi'
import type { ImageOptions, ImageProvider } from '../interface'
const useDefaultImageProvider: ImageProvider = (url: Ref<string>, options: ImageOptions = {}): ComputedRef<string> | Ref<string> => url
export default useDefaultImageProvider
