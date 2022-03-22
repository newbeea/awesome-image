<template>
  <div @click="change">
    <AsImage
      class="banner"
      :width="1332"
      :height="785"
      :src="'/banner.jpg'"
      :lazy="true"
      :progressive="true"
    >
      <template #loading>
        <div class="placeholder"></div>
      </template>
      <template #webglfilter="{ image }">
        <div>
          <component :is="component" :image="image" depth="/banner-depth.png"></component>
        </div>
      </template>
    </AsImage>
  </div>
</template>
<script>
import Fake3d from '@vue-awesome-image/filter-fake3d'

export default {
  components: {
    Fake3d,
  },
  data() {
    return {
      component: 'Glitch',
    }
  },
  methods: {
    change() {
      this.component = 'Fake3d'
    },
  },
}
</script>
<style>
.placeholder {
  width: 100%;
  height: 100%;
  background-color: #eee;
}
</style>
