/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-unknown-property */
import type { PropType } from 'vue-demi'
import {
  Transition,
  computed,
  defineComponent,
  defineEmits,
  inject,
  isVue2,
  onMounted,
  ref,
  toRefs,
} from 'vue-demi'

import { useLazy } from '../composables/lazy'
import { useResponsive } from '../composables/responsive'
import type { ImageOptions, ImageUrlGenerator } from '../interface'
import imageUrlGeneratorDefault from '../composables/default-image-provider'
import style from './style.module.scss'
export default defineComponent({
  name: 'AsImage',
  components: {
    Transition,
  },
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
    imageUrlGenerator: { type: Function as any, default: imageUrlGeneratorDefault },
    duration: { type: Number, default: 1 },
    autoWebp: { type: Boolean, default: true },
  },
  emits: ['image-loaded', 'placeholder-loaded', 'image-error', 'placeholder-error'],
  setup(props, { emit }) {
    const {
      src,
      responsive,
      progressive,
      lazy,
      placeholderLazyOffset,
      imageLazyOffset,
      breakpoints,
      imageUrlGenerator,
      quantity,
      format,
    } = toRefs(props)

    const placeholder = ref<HTMLImageElement>()
    const placeholderLoaded = ref(false)
    const image = ref<HTMLImageElement>()
    const imageLoaded = ref(false)

    const generator = inject<ImageUrlGenerator>('imageUrlGenerator', imageUrlGenerator.value)
    console.log('🚀 ~ file: AsImage.tsx ~ line 61 ~ setup ~ imageProvider.value', imageUrlGenerator.value)
    console.log('🚀 ~ file: AsImage.tsx ~ line 61 ~ setup ~ useImageProvider', generator)

    const placeholderSrcSet = progressive.value
      ? computed(() => generator(src.value, {
        width: 48,
        blur: 2,
      }))
      : src

    const options: ImageOptions = {}
    if (quantity.value)
      options.quantity = quantity.value
    if (format.value)
      options.format = format.value

    const imageSrcSet = responsive.value
      ? useResponsive(src, breakpoints, generator, options)
      : computed(() => generator(src.value, options))

    const pictureOption: ImageOptions = Object.assign({}, options, { format: 'webp' })
    const pictureSrcSet = responsive.value
      ? useResponsive(src, breakpoints, generator, pictureOption)
      : computed(() => generator(src.value, pictureOption))

    if (lazy.value) {
      useLazy(image, imageLazyOffset)
      if (progressive.value)
        useLazy(placeholder, placeholderLazyOffset)
    }

    const onImageLoaded = () => {
      if (image.value?.complete && !imageLoaded.value) {
        emit('image-loaded')
        imageLoaded.value = true
      }
    }

    const onPlaceholderLoaded = () => {
      if (placeholder.value?.complete && !placeholderLoaded.value) {
        emit('placeholder-loaded')
        placeholderLoaded.value = true
      }
    }

    onMounted(() => {
      onPlaceholderLoaded()
      onImageLoaded()
    })

    return {
      placeholderSrcSet,
      imageLoaded,
      imageSrcSet,
      pictureSrcSet,
      image,
      placeholder,
      onImageLoaded,
      onPlaceholderLoaded,
    }
  },
  render() {
    const renderImg = (type = 'image') => {
      const isImage = type === 'image'
      const hasWebglFilter = (isVue2 && this.$scopedSlots.webglfilter) || !!this.$slots.webglfilter
      let className = ''
      if (isImage) {
        if (hasWebglFilter && this.imageLoaded)
          className = `${style.image} ${style.hasWebglFilter} ${style.imageLoaded}`
        else
          className = style.image
      }
      else {
        className = style.imagePlaceholder
      }
      console.log('🚀 ~ file: AsImage.tsx ~ line 121 ~ renderImg ~ className', className)

      const attrs = {
        [this.lazy ? 'data-srcset' : 'srcset']: isImage ? this.imageSrcSet : this.placeholderSrcSet,
        onload: `this.classList.add("${isImage ? style.imageLoaded : style.placeholderLoaded}");console.log(313123123)`,

      }
      if (hasWebglFilter)
        attrs.crossorigin = 'anonymous'

      const src = isVue2
        ? {
          attrs,
        }
        : attrs
      return (
        <img
          // {...this.$attrs}
          // crossorigin="anonymous"
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
          onLoad={isImage ? this.onImageLoaded : this.onPlaceholderLoaded}
        />
      )
    }

    const renderPicture = () => {
      return this.autoWebp
        ? (
          <picture>
            <source srcset={this.pictureSrcSet} type="image/webp" />
            {renderImg()}
          </picture>
        )
        : renderImg()
    }
    const renderWebglFilter = () => {
      return isVue2
        ? this.$scopedSlots.webglfilter?.({
          image: this.image,
        })
        : this.$slots.webglfilter?.({
          image: this.image,
        })
    }
    return (
      <div class={style.imageWrapper}>
        <div class={style.imageBackground}>
          {isVue2
            ? this.$slots.loading
            : this.$slots.loading?.()}
        </div>
        <div class={style.imagePlaceholderWrapper}>
          {renderImg('placeholder')}
        </div>
        {renderPicture()}
        <transition name="fade">
          {this.imageLoaded
            ? renderWebglFilter()
            : null}
        </transition>
      </div>
    )
  },
})
