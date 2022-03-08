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

})
</script>

<template>
  <div>
    <AsImage
      class="demoimage"
      :width="2111"
      :height="1074"
      :src="'//d3skwsdk169y0b.cloudfront.net/image/dress.jpg'"
      :lazy="true"
      :duration="2"
      :quantity="90"
      format="png"
      :auto-webp="true"
      :progressive="false"
      :responsive="true"
    >
      <template #loading>
        <div class="placeholder">
          Loading
        </div>
      </template>

      <template
        #webglfilter="{
          image
        }"
      >
        <Fake3d :image="image" depth="//d3skwsdk169y0b.cloudfront.net/image/dress-depth.jpg" />
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
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
  color: rgb(148, 148, 148);
}
</style>
