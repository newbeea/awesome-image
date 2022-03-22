<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent, ref } from 'vue-demi'
import { AsImage } from '@awesome-image/image'
import HelloWorld from './components/index.vue'
import '@awesome-image/image/dist/style.css'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    AsImage,
  },
  data() {
    return {
    }
  },
  mounted() {
  },

})
</script>

<template>
  <AsImage
    class="demoimage"
    :width="1080"
    :height="722"
    :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/ball.jpg'"
    :lazy="true"
    :progressive="true"
    :responsive="true"
  >
    <template #loading>
      <div class="placeholder" />
    </template>

    <template
      #webglfilter="{
        image
      }"
    >
      <HelloWorld :image="image" />
    </template>
  </AsImage>
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
</style>
