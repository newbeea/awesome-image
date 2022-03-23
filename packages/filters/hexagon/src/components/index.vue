<script lang="ts">
import { GLWidget, Texture } from '@gl-widget/gl-widget'
import type { PropType } from 'vue-demi'
import { defineComponent, onMounted, ref } from 'vue-demi'
import { Tween } from '@tweenjs/tween.js'
export default defineComponent({
  name: 'AsFilterHexagon',
  props: {
    image: { type: Object as PropType<HTMLImageElement>, default: () => new Image() },
    scale: {
      type: Number,
      required: false,
    },
  },
  setup(props) {
    const webglContainer = ref<HTMLElement>()

    onMounted(async() => {
      if (!webglContainer.value) return
      const glWidget = new GLWidget({
        element: webglContainer.value,
      })

      // valid container and image size()
      const untilSizeRight = () => {
        if (webglContainer.value?.clientWidth && props.image.naturalHeight)
          return true
        return new Promise((resolve, reject) => {
          const i = setInterval(() => {
            if (webglContainer.value?.clientWidth && props.image.naturalHeight) {
              clearInterval(i)
              resolve(true)
            }
          }, 0)
        })
      }
      await untilSizeRight()

      glWidget.setSize(webglContainer.value.clientWidth, webglContainer.value.clientWidth / props.image.naturalWidth * props.image.naturalHeight, { width: '100%' })
      const resolution = glWidget.getSize()
      const image = new Texture(props.image?.currentSrc)

      const shader = {
        fragmentShader: `
          precision mediump float;
          uniform vec2 resolution;
          uniform sampler2D image;
          uniform vec2 center;
          uniform float scale;
          uniform vec2 texSize;
          void main() {
              vec2 tex = (gl_FragCoord.xy - center) / scale;
              tex.y /= 0.866025404;
              tex.x -= tex.y * 0.5;
              
              vec2 a;
              if (tex.x + tex.y - floor(tex.x) - floor(tex.y) < 1.0) a = vec2(floor(tex.x), floor(tex.y));
              else a = vec2(ceil(tex.x), ceil(tex.y));
              vec2 b = vec2(ceil(tex.x), floor(tex.y));
              vec2 c = vec2(floor(tex.x), ceil(tex.y));
              
              vec3 TEX = vec3(tex.x, tex.y, 1.0 - tex.x - tex.y);
              vec3 A = vec3(a.x, a.y, 1.0 - a.x - a.y);
              vec3 B = vec3(b.x, b.y, 1.0 - b.x - b.y);
              vec3 C = vec3(c.x, c.y, 1.0 - c.x - c.y);
              
              float alen = length(TEX - A);
              float blen = length(TEX - B);
              float clen = length(TEX - C);
              
              vec2 choice;
              if (alen < blen) {
                  if (alen < clen) choice = a;
                  else choice = c;
              } else {
                  if (blen < clen) choice = b;
                  else choice = c;
              }
              
              choice.x += choice.y * 0.5;
              choice.y *= 0.866025404;
              choice *= scale / resolution;
              gl_FragColor = texture2D(image, choice + center / resolution);
          }

        `,
        uniforms: {
          image: {
            value: image,
          },
          resolution: {
            value: resolution,
          },
          center: {
            value: {
              x: 0.5,
              y: 0.5,
            },
          },
          scale: {
            value: props.scale || 15,
          },
        },
      }

      let currentSrc = props.image?.currentSrc
      window.addEventListener('resize', () => {
        // valid size
        if (webglContainer.value?.clientWidth && props.image.naturalHeight) {
          const width = webglContainer.value?.clientWidth
          // update webgl size
          glWidget.setSize(width, width! / props.image.naturalWidth * props.image.naturalHeight, { width: '100%' })
          shader.uniforms.resolution.value = glWidget.getSize()
          // update image if responsive image loaded
          if (props.image?.currentSrc !== currentSrc) {
            shader.uniforms.image.value = new Texture(props.image?.currentSrc)
            currentSrc = props.image?.currentSrc
          }
        }
      })

      // const scale = {
      //   value: 4,
      // }
      // const tween = new Tween(scale)
      // tween.to({
      //   value: 20,
      // }).repeat(Infinity).yoyo(true).duration(5000).start()

      function animate() {
        // if (!props.scale) {
        //   tween.update()
        //   shader.uniforms.scale.value = scale.value
        // }
      }
      glWidget.renderBackground(shader, animate)
    })

    return {
      webglContainer,
    }
  },
})

</script>

<template>
  <div ref="webglContainer" class="webgl-filter" />
</template>
<style lang="scss">

</style>
