<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent, ref } from 'vue-demi'
import { AsImage } from '@awesome-image/image'
import '@awesome-image/image/dist/style.css'
import { AsTransition } from './index'
export default defineComponent({
  name: 'App',
  components: {
    AsTransition,
    AsImage,
  },
  setup() {
    const activeIndex = ref(0)

    const customTransition = {
      shader: `
        uniform float speed;
        vec4 transition(vec2 uv) {
          vec4 a = getFromColor(uv);
          vec4 b = getToColor(uv);
          if ( next )
            return mix(a, b, step(uv.x, progress));
          else
            return mix(b, a, step(uv.x, 1. - progress));
        }

      `,
      uniforms: {
      },
    }

    const banner = ref<typeof AsTransition>()
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
  <AsTransition
    ref="banner"
    :transition="customTransition"
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
  </AsTransition>
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
