<script lang="ts">
import { GLWidget, Texture } from '@gl-widget/gl-widget'
import type { PropType } from 'vue-demi'
import { defineComponent, onMounted, ref } from 'vue-demi'

export default defineComponent({
  props: {
    image: { type: Object as PropType<HTMLImageElement>, default: () => new Image() },
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
          precision highp float;
          uniform vec2 resolution;
          uniform float time;
          uniform sampler2D image;
          float rand () {
            return fract(sin(time)*1e4);
          }
          void main () {
            vec2 uv = gl_FragCoord.xy/resolution.xy;
            vec2 uvR = uv;
            vec2 uvB = uv;

            if (sin(time) > -0.2) {
              uvR.x = uv.x * 1.0 - rand() * 0.02 * 0.8;
              uvB.y = uv.y * 1.0 + rand() * 0.02 * 0.8;

              if(uv.y < rand() && uv.y > rand() -0.1)
              {
                uv.x = (uv + 0.02 * rand()).x;
              }
            }

            vec4 c;
            c.r = texture2D(image, uvR).r;
            c.g = texture2D(image, uv).g;
            c.b = texture2D(image, uvB).b;
            c.a = 1.;

            gl_FragColor = c;
          }
        `,
        uniforms: {
          image: {
            value: image,
          },
          resolution: {
            value: resolution,
          },
          time: {
            value: 0,
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

      function animate() {
        shader.uniforms.time.value += 0.01
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
