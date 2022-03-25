<template>
  <div @click="change">
    <AsImage
      class="banner"
      :width="1332"
      :height="785"
      :src="'/mount.jpg'"
      :lazy="true"
      :progressive="true"
    >
      <template #loading>
        <div class="placeholder"></div>
      </template>
      <template #webglfilter="{ image }">
        <div>
          <component :is="component" :image="image" :scale="20" depth="/mount-map.jpg"></component>
        </div>
      </template>
    </AsImage>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      index: 0,
      timer: null,
      filters: [
        'glitch',
        'crt',
        'ascii',
      ],
      component: 'as-filter-fake3d',
    }
  },
  mounted() {
    // this.timer = setInterval(() => {
    //   this.change()
    // }, 2000)
  },
  unmounted() {
    clearInterval(this.timer)
  },
  methods: {
    change() {
      this.index += 1
      this.index %= this.filters.length
      this.component = `as-filter-${this.filters[this.index]}`
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
