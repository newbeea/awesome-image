<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent, ref } from 'vue-demi'
// import Fake3d from '@awesome-image/filter-fake3d'
// import Glitch from '@awesome-image/filter-glitch'

import { AsImage } from './'
export default defineComponent({
  name: 'App',
  components: {
    // AsImage,
    // Glitch,
  },
  data() {
    return {

    }
  },
  methods: {
    imageLoaded() {
      console.log('Image loaded')
    },
    placeholderLoaded() {
      console.log('Placeholder loaded')
    },
  },

})
</script>

<template>
  <div>
    <AsImage
      class="demoimage"
      :width="1080"
      :height="722"
      :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/ball.jpg'"
      :lazy="false"
    >
      <template #loading>
        <div class="placeholder" />
      </template>

      <!-- <template
        #webglfilter="{
          image
        }"
      >
        <Glitch :image="image" />
      </template> -->
    </AsImage>
    <AsImage
      class="demoimage"
      :width="1080"
      :height="722"
      :src="'//d3skwsdk169y0b.cloudfront.net/image/product/1.jpg'"
    >
      <template #loading>
        <div class="placeholder" />
      </template>
    </AsImage>
    <AsImage
      class="demoimage"
      :width="1080"
      :height="722"
      :src="'//d3skwsdk169y0b.cloudfront.net/image/product/2.jpg'"
      :lazy="true"
      :progressive="true"
      :responsive="true"
      :image-lazy-offset="'0px'"
    >
      <template #loading>
        <div class="placeholder" />
      </template>
    </AsImage>
    <AsImage
      class="demoimage"
      :width="1080"
      :height="722"
      :src="'//d3skwsdk169y0b.cloudfront.net/image/product/3.jpg'"
      :lazy="true"
      :progressive="true"
      :responsive="true"
    >
      <template #loading>
        <div class="placeholder" />
      </template>
    </AsImage>
    sfsdf
  </div>
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
.demoimage {
  width: 100%;
}
.placeholder {
  width: 100%;
  height: 100%;

  background: #eee;
  color: rgb(78, 78, 78);
}
</style>
