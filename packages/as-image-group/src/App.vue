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

    const next = () => {
      activeIndex.value += 1
    }
    const prev = () => {
      activeIndex.value -= 1
    }

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
    return {
      activeIndex,
      next,
      prev,
      customTransition,
    }
  },

})
</script>

<template>
  <div @click="prev">
    Prev
  </div>
  <div @click="next">
    Next
  </div>
  <AsImageGroup
    v-model="activeIndex" :transition="'directionalwrap'"
  >
    <template
      #images="{
        onImageLoaded
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
        :to-group="onImageLoaded(0)"
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
        :to-group="onImageLoaded(1)"
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
        :to-group="onImageLoaded(2)"
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
        :to-group="onImageLoaded(3)"
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
