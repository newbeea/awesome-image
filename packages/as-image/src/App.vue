<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent, ref } from 'vue-demi'
import Fake3d from '@vue-awesome-image/filter-fake3d'

import { AsImage } from './'
export default defineComponent({
  name: 'App',
  components: {
    AsImage,
    Fake3d,
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
      :width="999"
      :height="1424"
      :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/dress.jpg'"
      :lazy="true"
      :duration="2"
      format="png"
      :auto-webp="true"
      :progressive="true"
      :responsive="true"
      @image-loaded="imageLoaded"
      @placeholder-loaded="placeholderLoaded"
    >
      <template #loading>
        <div class="placeholder" />
      </template>

      <template
        #webglfilter="{
          image
        }"
      >
        <Fake3d :image="image" depth="//d3skwsdk169y0b.cloudfront.net/image/fake3d/dress-depth.jpg" />
      </template>
    </AsImage>
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
