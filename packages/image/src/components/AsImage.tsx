/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-unknown-property */
import type { PropType } from 'vue-demi'
import { Transition, defineComponent, inject, onMounted, ref, toRefs } from 'vue-demi'
import { useLazy } from '../composables/lazy'
import { useResponsive } from '../composables/responsive'
import type { ImageOptions, ImageProvider } from '../interface'
import { useDefaultImageProvider } from '../composables/default-image-provider'
import './style.scss'
export default defineComponent({
  name: 'AsImage',
  components: { Transition },
  props: {
    src: { type: String, default: '' },
    width: { type: Number },
    height: { type: Number },
    quantity: { type: Number, default: 0 },
    format: { type: String, default: '' },
    lazy: { type: Boolean, default: false },
    placeholderLazyOffset: { type: String, default: '2000px' },
    imageLazyOffset: { type: String, default: '1000px' },
    responsive: { type: Boolean, default: false },
    progressive: { type: Boolean, default: true },
    breakpoints: { type: Array as PropType<Array<number>>, default: () => [360, 540, 720, 900, 1080] },
    sizes: { type: String, default: '100vw' },
    imageProvider: { type: Function as PropType<ImageProvider>, default: useDefaultImageProvider },
    duration: { type: Number, default: 1 },
  },
  setup(props) {
    const {
      src,
      responsive,
      progressive,
      lazy,
      placeholderLazyOffset,
      imageLazyOffset,
      breakpoints,
      imageProvider,
      quantity,
      format,
    } = toRefs(props)

    const placeholder = ref<HTMLImageElement>()
    const image = ref<HTMLImageElement>()
    let imageDom = ref<HTMLImageElement>()
    let imageLoaded = ref(false)

    const useImageProvider = inject<ImageProvider>('useImageProvider', imageProvider.value)

    const placeholderSrcSet = progressive.value
      ? useImageProvider(src, {
        width: 48,
        blur: 2,
      })
      : src

    const options: ImageOptions = {}
    if (quantity.value)
      options.quantity = quantity.value
    if (format.value)
      options.format = format.value

    const imageSrcSet = responsive.value
      ? useResponsive(src, breakpoints, useImageProvider, options)
      : useImageProvider(src, options)

    const pictureOption: ImageOptions = Object.assign({}, options, { format: 'webp' })
    const pictureSrcSet = responsive.value
      ? useResponsive(src, breakpoints, useImageProvider, pictureOption)
      : useImageProvider(src, pictureOption)

    if (lazy.value) {
      const { loaded, image: img } = useLazy(image, imageLazyOffset)
      imageLoaded = loaded
      imageDom = img
      if (progressive.value)
        useLazy(placeholder, placeholderLazyOffset)
    }

    onMounted(() => {
      if (image.value?.complete)
        imageLoaded.value = true
    })
    return {
      placeholderSrcSet,
      imageLoaded,
      imageSrcSet,
      pictureSrcSet,
      imageDom,
      image,
      placeholder,
    }
  },
  render() {
    const renderImg = (type = 'image') => {
      const isImage = type === 'image'
      const className = isImage
        ? `image${this.$slots.webglFilter && this.imageLoaded ? 'has-webgl-filter' : ''}`
        : 'image-placeholder'
      const src = {
        [this.lazy ? 'data-srcset' : 'srcset']: isImage ? this.imageSrcSet : this.placeholderSrcSet,
      }
      return (
        <img
          {...this.$attrs}
          crossorigin="anonymous"
          ref={isImage ? 'image' : 'placeholder'}
          class={className}
          style={{
            opacity: 0,
            transitionDuration: `${this.duration}s`,
          }}
          width={this.width}
          height={this.height}
          {...src}
          sizes={this.sizes}
          onLoad={() => { this.imageLoaded = true }}
          onload={`this.classList += " ${type}-loaded";`}
        />
      )
    }

    const renderPicture = () => {
      return (
        <picture>
          <source srcset={this.pictureSrcSet} type="image/webp" />
          {renderImg()}
        </picture>
      )
    }
    return (
      <div class="image-wrapper">
        <div class="image-background">
          {this.$slots.loading?.()}
        </div>
        <div class="image-placeholder-wrapper">
          {renderImg('placeholder')}
        </div>
        {renderPicture()}
        <transition name="fade">
          {this.imageLoaded ? this.$slots.webglFilter?.() : null}
        </transition>
      </div>
    )
  },
})
