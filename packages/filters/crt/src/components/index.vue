<script lang="ts">
import { GLWidget, Texture } from '@gl-widget/gl-widget'
import type { PropType } from 'vue-demi'
import { defineComponent, onMounted, ref } from 'vue-demi'
import { Easing, Tween } from '@tweenjs/tween.js'
export default defineComponent({
  name: 'AsFilterCrt',
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

          uniform sampler2D image;

          uniform vec4 filterArea;
          uniform vec2 dimensions;
          uniform vec2 resolution;
          const float SQRT_2 = 1.414213;

          const float light = 1.0;

          uniform float curvature;
          uniform float lineWidth;
          uniform float lineContrast;
          const bool verticalLine = false;
          uniform float noise;
          uniform float noiseSize;

          uniform float vignetting;
          uniform float vignettingAlpha;
          uniform float vignettingBlur;

          uniform float seed;
          uniform float time;

          float rand(vec2 co) {
              return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
          }

          void main(void)
          {
              vec2 pixelCoord = gl_FragCoord.xy;
              vec2 dir = vec2(gl_FragCoord.xy / dimensions - vec2(0.5, 0.5));
                      
              gl_FragColor = texture2D(image, gl_FragCoord.xy / resolution.xy);
              vec3 rgb = gl_FragColor.rgb;

              if (noise > 0.0 && noiseSize > 0.0)
              {
                  pixelCoord.x = floor(pixelCoord.x / noiseSize);
                  pixelCoord.y = floor(pixelCoord.y / noiseSize);
                  float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;
                  rgb += _noise * noise;
              }

              if (lineWidth > 0.0)
              {
                  float _c = curvature > 0. ? curvature : 1.;
                  float k = curvature > 0. ?(length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;
                  vec2 uv = dir * k;

                  float v = (verticalLine ? uv.x * dimensions.x : uv.y * dimensions.y) * min(1.0, 2.0 / lineWidth ) / _c;
                  float j = 1. + cos(v * 1.2 - time) * 0.5 * lineContrast;
                  rgb *= j;
                  float segment = verticalLine ? mod((dir.x + .5) * dimensions.x, 4.) : mod((dir.y + .5) * dimensions.y, 4.);
                  rgb *= 0.99 + ceil(segment) * 0.015;
              }

              if (vignetting > 0.0)
              {
                  float outter = SQRT_2 - vignetting * SQRT_2;
                  float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);
                  rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);
              }

              gl_FragColor.rgb = rgb;
          }


        `,
        uniforms: {
          image: {
            value: image,
          },
          resolution: {
            value: resolution,
          },
          filterArea: {
            value: {
              x: 900,
              y: 900,
            },
          },
          dimensions: {
            value: resolution,
          },
          curvature: {
            value: 1,
          },
          lineWidth: {
            value: 8,
          },
          lineContrast: {
            value: 0.3,
          },
          noise: {
            value: 0.2,
          },
          noiseSize: {
            value: 3,
          },
          vignetting: {
            value: 0.3,
          },
          vignettingAlpha: {
            value: 1,
          },
          vignettingBlur: {
            value: 0.3,
          },
          seed: {
            value: 0,
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

      const time = {
        value: 0,
      }
      const tween = new Tween(time)
      tween.to({
        value: 100,
      }).easing(Easing.Quadratic.InOut).repeat(Infinity).yoyo(true).duration(5000).start()

      function animate() {
        tween.update()
        shader.uniforms.time.value = time.value
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
