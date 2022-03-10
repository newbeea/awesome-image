
<script lang="ts">
/* eslint-disable prefer-const */
import { GLWidget, Texture, Vector2 } from '@gl-widget/gl-widget'
import type { PropType } from 'vue-demi'
import { computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue-demi'
import type { Transition } from './transitions'
import transitions from './transitions'
type Transitions = Array<Transition | String>
export default defineComponent({
  props: {
    modelValue: Number,
    transition: {
      type: Object as PropType<Transition | String>,
      default: () => transitions.default,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    console.log('setup')
    const {
      modelValue,
    } = toRefs(props)

    const getTransition = (): Transition => {
      const transition = props.transition
      if (typeof (transition) === 'string') {
        return transitions[transition] || transitions.default
      }
      else {
        return transition as Transition
      }
    }
    const transition = getTransition()

    const shader: any = {
      fragmentShader: `
          precision highp float;
          uniform vec2 mouse; 
          uniform vec2 resolution;
          uniform vec2 imageAspect;
          uniform sampler2D     imageFrom;
          uniform sampler2D     imageTo;
          uniform float scaleX;
          uniform float scaleY;
          uniform float progress;
          uniform bool next;
          vec4 getFromColor(vec2 uv) {
            return texture2D(imageFrom, uv);
          }
          vec4 getToColor(vec2 uv) {
            return texture2D(imageTo, uv);
          }

          ${transition.shader}

          void main () {
            vec2 uv = gl_FragCoord.xy/resolution.xy;
            vec2 vUv = (uv - vec2(0.5)) * imageAspect + vec2(0.5);
            gl_FragColor = transition(vUv);
          }
        `,
      uniforms: {
        imageFrom: {
          value: null,
        },
        imageTo: {
          value: null,
        },
        resolution: {
          value: null,
        },
        imageAspect: {
          value: new Vector2(1, 1),
        },
        progress: {
          value: 0,
        },
        next: {
          value: 1,
        },
      },
    }
    Object.assign(shader.uniforms, transition.uniforms)
    const webglContainer = ref<HTMLElement>()

    const imageMap = ref<Record<number | string, Texture>>({})

    const countMap: any = {}

    const mount = async(width: number, height: number) => {
      if (!webglContainer.value) return
      const glWidget = new GLWidget({
        element: webglContainer.value,
      })

      console.log('onMounted', width, height)
      glWidget.setSize(webglContainer.value.clientWidth, webglContainer.value.clientWidth / width * height, { width: '100%' })
      const resolution = glWidget.getSize()

      shader.uniforms.resolution.value = resolution

      function animate() {
      }

      glWidget.renderBackground(shader, animate)
    }
    const onImageLoaded = (index: number) => {
      countMap[index] = true
      return (image: any) => {
        imageMap.value[index] = new Texture(image.currentSrc, () => {
          if (index === 0) {
            shader.uniforms.imageFrom.value = imageMap.value[0]
            // shader.uniforms.imageDepth.value = imageMap.value[0]
            console.log(imageMap.value[0])
            setTimeout(() => {
              mount(imageMap.value[0].image.width, imageMap.value[0].image.height)
            }, 100)
          }
        })
      }
    }

    let current = 0

    const step = 50
    let progress = step
    let interval: NodeJS.Timer
    const slide = (from: number, to: number) => {
      const length = Object.keys(countMap).length
      if (to < 0) {
        to += 10 * length
      }
      if (from < 0) {
        from += 10 * length
      }
      to = to % length
      shader.uniforms.imageFrom.value = imageMap.value[from % length]
      shader.uniforms.imageTo.value = imageMap.value[to % length]
      shader.uniforms.progress.value = 0
      progress = 0
      current = to

      clearInterval(interval)
      interval = setInterval(() => {
        progress = progress % step + 1

        shader.uniforms.progress.value = progress / step
        if (progress >= step) {
          clearInterval(interval)
          emit('update:modelValue', current)
        }
      }, 16)
    }

    watch(modelValue, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        shader.uniforms.next.value = newValue > oldValue
        slide(current, newValue)
      }
    })

    return {
      webglContainer,
      onImageLoaded,
    }
  },
})

</script>

<template>
  <div ref="webglContainer" class="vue-awesome-image-group">
    <slot name="images" :onImageLoaded="onImageLoaded" />
    <!-- {{ imageMap }} -->
    <!-- {{ images }} -->
  </div>
</template>
<style lang="scss">
.vue-awesome-image-group {
  position: relative;
  .vue-awesome-image {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    opacity: 0;
  }
}
</style>
