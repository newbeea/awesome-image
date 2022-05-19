/* eslint-disable react/no-unknown-property */
import type { PropType, SetupContext } from 'vue-demi'
import {
  Transition,
  computed,
  defineComponent,
  inject,
  isVue2,
  ref,
  toRefs,
} from 'vue-demi'
import { useLazy } from '../composables/lazy'
import { useResponsive } from '../composables/responsive'
import type { AsImageOptions, ImageOptions, ImageUrlGenerator } from '../interface'
import imageUrlGeneratorDefault from '../composables/default-image-provider'

import { useMergedOptions } from '../composables/merge-options'
import style from './style.module.scss'

export const defaultOptions: AsImageOptions = {
  quanlity: 0,
  format: '',
  lazy: false,
  placeholderLazyOffset: '0px',
  imageLazyOffset: '0px',
  responsive: false,
  progressive: false,
  breakpoints: [640, 768, 1024, 1280, 1536],
  sizes: '100vw',
  imageUrlGenerator: imageUrlGeneratorDefault,
  duration: 1,
  autoWebp: false,
}

export default defineComponent({
  name: 'ImageComponent',
  components: {
    Transition,
  },
  props: {
    src: { type: String, default: '' },
    width: { type: Number },
    height: { type: Number },
    quanlity: { type: Number, required: false },
    format: { type: String, required: false },
    lazy: { type: Boolean, default: false },
    placeholderLazyOffset: { type: String, required: false },
    imageLazyOffset: { type: String, required: false },
    responsive: { type: Boolean, required: false },
    progressive: { type: Boolean, required: false },
    breakpoints: { type: Array as PropType<Array<number>>, required: false },
    sizes: { type: String, required: false },
    imageUrlGenerator: { type: Function as any, required: false },
    toGroup: { type: Function as any, required: false },
    duration: { type: Number, required: false },
    autoWebp: { type: Boolean, required: false },
  },
  emits: ['image-loaded', 'placeholder-loaded', 'image-error', 'placeholder-error'],
  setup(props, ctx) {
    const { emit, root } = ctx as SetupContext & {
      root: any
    }
    const {
      src,
    } = toRefs(props)

    const globalOptions: AsImageOptions = isVue2 ? root.$asImageOptions : inject<AsImageOptions>('$asImageOptions')

    const {
      responsive,
      progressive,
      lazy,
      placeholderLazyOffset,
      imageLazyOffset,
      breakpoints,
      duration,
      imageUrlGenerator,
      quanlity,
      format,
    } = useMergedOptions(toRefs(props), globalOptions)

    const placeholder = ref<HTMLImageElement>()
    const placeholderLoaded = ref(false)
    const image = ref<HTMLImageElement>()
    const imageLoaded = ref(false)

    const ssrImageLoaded = ref(false)
    const ssrPlaceholderLoaded = ref(false)

    // generate placeholder image's srcset
    const placeholderSrcSet = progressive.value
      ? computed(() => imageUrlGenerator.value(src.value, {
        width: 48,
        blur: 2,
      }))
      : src

    // generate image's srcset
    const options: ImageOptions = {}
    if (quanlity.value)
      options.quanlity = quanlity.value
    if (format.value)
      options.format = format.value

    const imageSrcSet = responsive.value
      ? useResponsive(src, breakpoints, imageUrlGenerator, options)
      : computed(() => imageUrlGenerator.value(src.value, options))

    // generate picture's srcset
    const pictureOption: ImageOptions = Object.assign({}, options, { format: 'webp' })
    const pictureSrcSet = responsive.value
      ? useResponsive(src, breakpoints, imageUrlGenerator, pictureOption)
      : computed(() => imageUrlGenerator.value(src.value, pictureOption))

    // load data-srcset when intersection observer emitted.
    if (lazy.value) {
      useLazy(image, imageLazyOffset)
      if (progressive.value) // placeholder lazyload
        useLazy(placeholder, placeholderLazyOffset)
    }

    const onImageLoaded = (m = false) => {
      emit('image-loaded')
      if (props.toGroup) props.toGroup(image.value)
      imageLoaded.value = true
    }

    const onPlaceholderLoaded = (m = false) => {
      emit('placeholder-loaded')
      placeholderLoaded.value = true
    }

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
      ssrImageLoaded,
      ssrPlaceholderLoaded,
      lazyRef: lazy,
      durationRef: duration,
    }
  },
  render() {
    const renderImg = (type = 'image') => {
      const isImage = type === 'image'
      if (((isImage && !this.ssrImageLoaded) || (!isImage && !this.ssrPlaceholderLoaded))
      && this.$parent?.$el
      && !this.lazyRef) {
        const imgElement = this.$parent?.$el.querySelector(
          `[data-type=${type}]`,
        )
        if (imgElement?.complete) {
          if (isImage) {
            this.ssrImageLoaded = true
          }
          else {
            this.ssrPlaceholderLoaded = true
          }
        }
      }

      const hasWebglFilter = (isVue2 && this.$scopedSlots.webglfilter) || !!this.$slots.webglfilter
      let className = ''
      if (isImage) {
        if (hasWebglFilter)
          className = `${style.image} ${style.hasWebglFilter}`
        else
          className = style.image
      }
      else {
        className = style.imagePlaceholder
      }
      // can not use style.imageLoaded directly, it will be undefined in nuxt
      const imageLoaded = style.imageLoaded
      const placeholderLoaded = style.placeholderLoaded

      const attrs = {
        [this.lazyRef ? 'data-srcset' : 'srcset']: isImage ? this.imageSrcSet : this.placeholderSrcSet,
        onload: `this.classList.add("${isImage ? imageLoaded : placeholderLoaded}");`,

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
          data-type={type}
          importance={isImage ? 'auto' : 'high'}
          ref={type}
          class={className}
          style={{
            opacity: ((isImage && this.ssrImageLoaded) || (!isImage && this.ssrPlaceholderLoaded)) ? 1 : 0,
            transitionDuration: `${this.durationRef}s`,
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
