<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent, ref } from 'vue-demi'
import { AsImage } from '@vue-awesome-image/as-image'
import '@vue-awesome-image/as-image/dist/style.css'
import AsImageGroup from './components/AsImageGroup.vue'
export default defineComponent({
  name: 'App',
  components: {
    AsImageGroup,
    AsImage,
  },
  setup() {
    const activeIndex = ref(0)

    const customTransition = {
      shader: `
        const float SQRT_2 = 1.414213562373;
        uniform float dots;// = 20.0;
        uniform vec2 center;// = vec2(0, 0);

        vec4 transition(vec2 uv) {
          bool nextImage = distance(fract(uv * dots), vec2(0.5, 0.5)) < ( (direction ? progress : (1. - progress)) / distance(uv, center));
          nextImage = direction ? nextImage : !nextImage;
          return nextImage ? getToColor(uv) : getFromColor(uv);
        }
      `,
      uniforms: {
        dots: {
          value: 10,
        },

      },
    }

    const banner = ref<typeof AsImageGroup>()
    const next = () => {
      banner.value?.next()
    }
    const prev = () => {
      banner.value?.prev()
    }

    const setActiveItem = () => {
      banner.value?.setActiveItem(2)
    }

    const onChange = (i, j) => {
      console.log(i, j)
      activeIndex.value = i
    }
    return {
      banner,
      next,
      prev,
      setActiveItem,
      onChange,
      activeIndex,
      customTransition,
    }
  },

})
</script>

<template>
  <div @click="prev">
    Prev
  </div>
  {{ activeIndex }}
  <div @click="next">
    Next
  </div>
  <div @click="setActiveItem">
    setActiveItem 2
  </div>
  <AsImageGroup
    ref="banner"
    :transition="{
      shader: `
// Author: gre
// License: MIT
uniform float amplitude; // = 100.0
uniform float speed; // = 50.0

vec4 transition (vec2 uv) {
  vec2 dir = uv - vec2(.5);
  float dist = length(dir);
  vec2 offset = dir * (sin(progress * dist * amplitude - progress * speed) + .5) / 30.;
  return mix(
    getFromColor(uv + offset),
    getToColor(uv),
    smoothstep(0.2, 1.0, progress)
  );
}

        `,
      uniforms: {
        amplitude: 100,
        speed: 50
      }
    }"
    :initial-index="2"
    @change="onChange"
  >
    <template
      #images="{
        toGroupWithIndex
      }"
    >
      <AsImage
        class="demoimage"
        :width="999"
        :height="1424"
        :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/mount.jpg'"
        :lazy="true"
        :duration="2"
        format="png"
        :auto-webp="true"
        :progressive="true"
        :responsive="true"
        :to-group="toGroupWithIndex(0)"
      >
        <template #loading>
          <div class="placeholder" />
        </template>
      </AsImage>
      <AsImage
        class="demoimage"
        :width="999"
        :height="1424"
        :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/canyon.jpg'"
        :lazy="true"
        :duration="2"
        format="png"
        :auto-webp="true"
        :progressive="true"
        :responsive="true"
        :to-group="toGroupWithIndex(1)"
      >
        <template #loading>
          <div class="placeholder" />
        </template>
      </AsImage>
      <AsImage
        class="demoimage"
        :width="999"
        :height="1424"
        :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/lady.jpg'"
        :lazy="true"
        :duration="2"
        format="png"
        :auto-webp="true"
        :progressive="true"
        :responsive="true"
        :to-group="toGroupWithIndex(2)"
      >
        <template #loading>
          <div class="placeholder" />
        </template>
      </AsImage>
      <AsImage
        class="demoimage"
        :width="999"
        :height="1424"
        :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/ball.jpg'"
        :lazy="true"
        :duration="2"
        format="png"
        :auto-webp="true"
        :progressive="true"
        :responsive="true"
        :to-group="toGroupWithIndex(3)"
      >
        <template #loading>
          <div class="placeholder" />
        </template>
      </AsImage>
    </template>
  </AsImageGroup>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
