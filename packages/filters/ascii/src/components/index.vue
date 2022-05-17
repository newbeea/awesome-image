<script lang="ts">
import { GLWidget, Texture } from '@gl-widget/gl-widget'
import type { PropType } from 'vue-demi'
import { defineComponent, onMounted, ref } from 'vue-demi'
import { Tween } from '@tweenjs/tween.js'
export default defineComponent({
  name: 'AsFilterAscii',
  props: {
    image: { type: Object as PropType<HTMLImageElement>, default: () => new Image() },
    pixelSize: {
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
          uniform float pixelSize;
          uniform sampler2D image;

          vec2 mapCoord( vec2 coord )
          {
              coord *= resolution.xy;

              return coord;
          }

          vec2 unmapCoord( vec2 coord )
          {

              coord /= resolution.xy;

              return coord;
          }

          vec2 pixelate(vec2 coord, vec2 size)
          {
              return floor( coord / size ) * size;
          }

          vec2 getMod(vec2 coord, vec2 size)
          {
              return mod( coord , size) / size;
          }

          float character(float n, vec2 p)
          {
              p = floor(p*vec2(4.0, -4.0) + 2.5);

              if (clamp(p.x, 0.0, 4.0) == p.x)
              {
                  if (clamp(p.y, 0.0, 4.0) == p.y)
                  {
                      if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;
                  }
              }
              return 0.0;
          }

          void main()
          {
              vec2 coord = gl_FragCoord.xy;

              // get the rounded color..
              vec2 pixCoord = pixelate(coord, vec2(pixelSize));
              pixCoord = unmapCoord(pixCoord);

              vec4 color = texture2D(image, pixCoord);

              // determine the character to use
              float gray = (color.r + color.g + color.b) / 3.0;

              float n =  65536.0;             // .
              if (gray > 0.2) n = 65600.0;    // :
              if (gray > 0.3) n = 332772.0;   // *
              if (gray > 0.4) n = 15255086.0; // o
              if (gray > 0.5) n = 23385164.0; // &
              if (gray > 0.6) n = 15252014.0; // 8
              if (gray > 0.7) n = 13199452.0; // @
              if (gray > 0.8) n = 11512810.0; // #

              // get the mod..
              vec2 modd = getMod(coord, vec2(pixelSize));

              gl_FragColor = color * character( n, vec2(-1.0) + modd * 2.0);

          }

        `,
        uniforms: {
          image: {
            value: image,
          },
          resolution: {
            value: resolution,
          },
          pixelSize: {
            value: props.pixelSize || 8,
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

      const pixelSize = {
        value: 8,
      }
      const tween = new Tween(pixelSize)
      tween.to({
        value: 10,
      }).repeat(Infinity).yoyo(true).duration(5000).start()

      function animate() {
        if (!props.pixelSize) {
          tween.update()
          shader.uniforms.pixelSize.value = pixelSize.value
        }
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
.webgl-filter {
  position: relative;
}
</style>
