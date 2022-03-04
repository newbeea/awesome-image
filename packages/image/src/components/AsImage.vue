<script lang="ts">
import type { PropType } from 'vue-demi'
import { defineComponent, inject, ref, toRefs } from 'vue-demi'
import { useLazy } from '../composables/lazy'
import { useResponsive } from '../composables/responsive'
import type { ImageOptions, ImageProvider } from '../interface'
import { useDefaultImageProvider } from '../composables/default-image-provider'

export default defineComponent({
  name: 'AsImage',
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

    const placeholder = ref(null)
    const image = ref(null)
    let imageDom = ref<HTMLImageElement | undefined>()
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
})

</script>

<template>
  <div class="image-wrapper">
    <div class="image-background">
      <slot name="loading" />
    </div>
    <div class="image-placeholder-wrapper">
      <img
        v-if="progressive"
        ref="placeholder"
        class="image-placeholder"
        :style="{
          opacity: 0,
          'transition-duration': duration + 's',
        }"
        :width="width"
        :height="height"
        v-bind="$attrs"
        :srcset="lazy ? '' : placeholderSrcSet"
        :data-srcset="lazy ? placeholderSrcSet: ''"
        :sizes="sizes"
        onload="this.classList += ' placeholder-loaded'"
      >
    </div>
    <picture>
      <source :srcset="pictureSrcSet" type="image/webp">
      <img
        ref="image"
        crossorigin="anonymous"
        class="image"
        :class="{
          'has-webgl-filter': $slots.webglFilter && imageLoaded
        }"
        :style="{
          opacity: 0,
          'transition-duration': duration + 's',
        }"
        :width="width"
        :height="height"
        v-bind="$attrs"
        :srcset="lazy ? '' : imageSrcSet"
        :data-srcset="lazy ? imageSrcSet: ''"
        :sizes="sizes"
        onload="this.classList += ' image-loaded'"
      >
    </picture>
    <transition name="fade">
      <slot v-if="imageLoaded" name="webglFilter" :image="imageDom" />
    </transition>
  </div>
</template>
<style lang="scss">

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.image-wrapper {
  overflow: hidden;
  position: relative;
  display: inline-block;
  .image-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -3;
  }
  .image-placeholder-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -2;
    img {
      filter: blur(10px);
      width: 100%;
      height: 100%;
    }
  }
}

img {
  width: 100%;
  height: 100%;
  transition: opacity;
}
img.has-webgl-filter {
  position: absolute;
  z-index: -1;
}
img[srcset=""] { visibility: hidden; opacity: 0;}
img.placeholder-loaded {
  opacity: 1 !important;

}
img.image-loaded {
  opacity: 1 !important;

}

</style>
