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
    quanlity: { type: Number, required: false },
    format: { type: String, default: '' },
    lazy: { type: Boolean, default: false },
    placeholderLazyOffset: { type: String, default: '0px' },
    imageLazyOffset: { type: String, default: '0px' },
    responsive: { type: Boolean, default: false },
    progressive: { type: Boolean, default: false },
    breakpoints: { type: Array as PropType<Array<number>>, default: () => [640, 768, 1024, 1280, 1536] },
    sizes: { type: String, default: '100vw' },
    imageUrlGenerator: { type: Function as any, default: imageUrlGeneratorDefault },
    toGroup: { type: Function as any, required: false },
    duration: { type: Number, default: 1 },
    autoWebp: { type: Boolean, default: false },
  },
  emits: ['image-loaded', 'placeholder-loaded', 'image-error', 'placeholder-error'],
  setup(props, { emit, root }) {
    const {
      src,
      responsive,
      progressive,
      lazy,
      placeholderLazyOffset,
      imageLazyOffset,
      breakpoints,
      imageUrlGenerator,
      quanlity,
      format,
    } = toRefs(props)

    const placeholder = ref<HTMLImageElement>()
    const placeholderLoaded = ref(false)
    const image = ref<HTMLImageElement>()
    const imageLoaded = ref(false)

    const generator = isVue2 ? root.$imageUrlGenerator : inject<ImageUrlGenerator>('imageUrlGenerator', imageUrlGenerator.value)

    // generate placeholder image's srcset
    const placeholderSrcSet = progressive.value
      ? computed(() => generator(src.value, {
        width: 48,
        blur: 2,
      }))
      : src

    // generate image's srcset
    const options: ImageOptions = {}
    if (quanlity.value)
      options.quantity = quanlity.value
    if (format.value)
      options.format = format.value

    const imageSrcSet = responsive.value
      ? useResponsive(src, breakpoints, generator, options)
      : computed(() => generator(src.value, options))

    // generate picture's srcset
    const pictureOption: ImageOptions = Object.assign({}, options, { format: 'webp' })
    const pictureSrcSet = responsive.value
      ? useResponsive(src, breakpoints, generator, pictureOption)
      : computed(() => generator(src.value, pictureOption))

    // load data-srcset when intersection observer emitted.
    if (lazy.value) {
      useLazy(image, imageLazyOffset)
      if (progressive.value) // placeholder lazyload
        useLazy(placeholder, placeholderLazyOffset)
    }

    const onImageLoaded = () => {
      if (image.value?.complete && !imageLoaded.value) {
        emit('image-loaded')
        if (props.toGroup) props.toGroup(image.value)
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
      // in case of image loaded before vue mounted
      onPlaceholderLoaded()
      onImageLoaded()
    })

    return {
      placeholderSrcSet,
      imageLoaded,
      placeholderLoaded,
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

      const attrs = {
        [this.lazy ? 'data-srcset' : 'srcset']: isImage ? this.imageSrcSet : this.placeholderSrcSet,
        onload: `this.classList.add("${isImage ? style.imageLoaded : style.placeholderLoaded}");`,

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
      <div class="vue-awesome-image">
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
