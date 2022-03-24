
<script lang="ts">
/* eslint-disable prefer-const */
import { GLWidget, Texture, Vector2 } from '@gl-widget/gl-widget'
import type { PropType } from 'vue-demi'
import { computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue-demi'
import type { Transition } from '../transitions'
import transitions from '../transitions'
export default defineComponent({
  name: 'AsTransition',
  props: {
    initialIndex: {
      type: Number,
      default: 0,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    speed: {
      default: 50,
    },
    interval: {
      default: 3000,
    },
    transition: {
      type: Object as PropType<Transition>,
      default: () => transitions.default,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const {
      initialIndex,
      autoPlay,
      interval,
    } = toRefs(props)

    // generate shader
    const getTransition = (): Transition => {
      const transition = props.transition
      transition.uniforms = transition.uniforms || {}
      if (transition.name && !transition.shader) {
        const buildinTranstion = transitions[transition.name] || transitions.default
        transition.shader = buildinTranstion.shader
        transition.uniforms = Object.assign(buildinTranstion.uniforms, transition.uniforms)
        return transition as Transition
      }
      else if (transition.shader) {
        return transition as Transition
      }
      else {
        console.error('Buildin transition name or custom shader is needed!')
        return transitions.default
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
          uniform float ratio;
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
        ratio: {
          value: 1,
        },
        next: {
          value: 1,
        },
      },
    }

    const updateUniforms = (shaderUniforms: any, transitionUniforms: any) => {
      Object.keys(transitionUniforms).forEach((u) => {
        shaderUniforms[u] = {
          value: transitionUniforms[u],
        }
      })
    }
    updateUniforms(shader.uniforms, transition.uniforms)

    // init webgl environment
    const webglContainer = ref<HTMLElement>()

    const mount = async(width: number, height: number) => {
      console.log('mounted')
      if (!webglContainer.value) return
      const glWidget = new GLWidget({
        element: webglContainer.value,
      })

      glWidget.setSize(webglContainer.value.clientWidth, webglContainer.value.clientWidth / width * height, { width: '100%' })
      const resolution = glWidget.getSize()

      shader.uniforms.resolution.value = resolution
      shader.uniforms.ratio.value = resolution.x / resolution.y

      function animate() {
      }

      glWidget.renderBackground(shader, animate)
    }

    // prepare image
    const imageMap = ref<Record<number | string, Texture>>({})

    const countMap: any = {}
    const toGroupWithIndex = (index: number) => {
      countMap[index] = true
      return (image: any) => {
        imageMap.value[index] = new Texture(image.currentSrc, () => {
          if (index === initialIndex.value) {
            shader.uniforms.imageFrom.value = imageMap.value[initialIndex.value]
            setTimeout(() => {
              mount(imageMap.value[initialIndex.value].image.width, imageMap.value[initialIndex.value].image.height)
            }, 1000)
          }
        })
      }
    }

    // slide and animate
    let current = initialIndex.value
    const step = 2500 / props.speed
    console.log(step)
    let progress = step
    let rAF: number
    const animate = () => {
      progress = progress % step + 1
      shader.uniforms.progress.value = progress / step
      if (progress < step) {
        rAF = requestAnimationFrame(animate)
      }
    }
    const slide = (from: number, to: number) => {
      shader.uniforms.next.value = to > from
      const length = Object.keys(countMap).length

      from = (from < 0 ? from + length : from) % length
      to = (to < 0 ? to + length : to) % length
      if (from === to) return

      current = to
      emit('change', to, from)

      shader.uniforms.imageFrom.value = imageMap.value[from]
      shader.uniforms.imageTo.value = imageMap.value[to]

      progress = 0
      shader.uniforms.progress.value = progress

      cancelAnimationFrame(rAF)
      rAF = requestAnimationFrame(animate)
    }

    let autoPlayHandler: NodeJS.Timer

    const prev = () => {
      clearInterval(autoPlayHandler)
      slide(current, current - 1)
    }

    const next = () => {
      clearInterval(autoPlayHandler)
      slide(current, current + 1)
    }

    const setActiveItem = (activeIndex: number) => {
      clearInterval(autoPlayHandler)
      slide(current, activeIndex)
    }

    onMounted(() => {
      if (autoPlay.value) {
        autoPlayHandler = setInterval(() => {
          slide(current, current + 1)
        }, interval.value)
      }
    })

    return {
      prev,
      next,
      setActiveItem,
      webglContainer,
      toGroupWithIndex,
    }
  },
})

</script>

<template>
  <div ref="webglContainer" class="vue-awesome-image-group">
    <slot name="images" :toGroupWithIndex="toGroupWithIndex" />
  </div>
</template>
<style lang="scss">
.vue-awesome-image-group {
  position: relative;
  .vue-awesome-image:not(:first-child) {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    opacity: 0;
  }
  canvas {
    vertical-align: bottom;
  }
}
</style>
