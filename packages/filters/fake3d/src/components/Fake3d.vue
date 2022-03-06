<script lang="ts">
import { GLWidget, Texture, Vector2 } from '@gl-widget/gl-widget'
import { computed, defineComponent, onMounted, PropType, ref } from 'vue-demi'
type Mouse = {
  x: number
  y: number
}
export default defineComponent({
  props: {
    image: { type: HTMLImageElement, default: () => new Image() },
    depth: { type: String, default: ''},
    scaleX: { default: 1 },
    scaleY: { default: 1 },
    mouse: {
      type: Object as PropType<Mouse> | null,
      default: null,
    },
  },
  setup(props) {
    const webglContainer = ref<HTMLElement>()

    const mouse = new Vector2(0, 0)

    const mouseTarget = {
      x: -1,
      y: -1,
    }
    const onMouseMove = (event: MouseEvent) => {
      if (!webglContainer.value) return
      mouseTarget.x = 1 - event.offsetX * 2 / webglContainer.value.clientWidth
      mouseTarget.y = 1 - event.offsetY * 2 / webglContainer.value.clientHeight
    }
    onMounted(() => {
      if (!webglContainer.value) return

      const glWidget = new GLWidget({
        element: webglContainer.value,
      })

      glWidget.setSize(webglContainer.value.clientWidth, webglContainer.value.clientWidth / props.image.naturalWidth * props.image.naturalHeight, { width: '100%' })
      const resolution = glWidget.getSize()

      const image = new Texture(props.image as HTMLImageElement)
      const depth = new Texture(props.depth)
      const shader = {
        fragmentShader: `
          precision highp float;
          uniform vec2 mouse; 
          uniform vec2 resolution;
          uniform vec2 imageAspect;
          uniform sampler2D     image;
          uniform sampler2D     imageDepth;
          uniform float scaleX;
          uniform float scaleY;
          void main () {
            vec2 uv = gl_FragCoord.xy/resolution.xy;
            vec2 vUv = (uv - vec2(0.5)) * imageAspect + vec2(0.5);
            // vUv *= (mouse.x * 0.5 + 0.5) * 0.01 + 0.99;
            vec4 c = texture2D(imageDepth, vUv);
            vec2 fake3d = vec2(vUv.x + (c.r - 0.5)* mouse.x / 30. * scaleX, vUv.y - (c.r - 0.5)*mouse.y / 30. * scaleY);
            gl_FragColor = texture2D(image, fake3d);
          }
        `,
        uniforms: {
          image: {
            value: image,
          },
          mouse: {
            value: mouse,
          },
          imageDepth: {
            value: depth,
          },
          resolution: {
            value: resolution,
          },
          imageAspect: {
            value: new Vector2(1, 1),
          },
          scaleX: {
            value: props.scaleX,
          },
          scaleY: {
            value: props.scaleY,
          },
        },
      }

      const imageAspect = props.image.naturalHeight / props.image.naturalWidth
      let a1, a2
      if (resolution.y / resolution.x < imageAspect) {
        a1 = 1
        a2 = (resolution.y / resolution.x) / imageAspect
      }
      else {
        a1 = (resolution.x / resolution.y) * imageAspect
        a2 = 1
      }
      shader.uniforms.imageAspect.value = new Vector2(a1, a2)

      if (!props.mouse)
        webglContainer.value.addEventListener('mousemove', onMouseMove, false)

      function animate() {
        if (!props.mouse) {
          mouse.x += (mouseTarget.x - mouse.x) * 0.05
          mouse.y += (mouseTarget.y - mouse.y) * 0.05
        }
        else {
          mouse.x = props.mouse.x
          mouse.y = props.mouse.y
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
  <div ref="webglContainer" class="webgl-filter">
  </div>
</template>
<style lang="scss">

</style>
