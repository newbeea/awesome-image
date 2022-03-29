<template>
  <div>
    <AsImage
      class="banner"
      :width="664"
      :height="443"
      :src="'/mount.jpg'"
      :lazy="true"
      :progressive="true"
    >
      <template #loading>
        <div class="placeholder"></div>
      </template>
      <template #webglfilter="{ image }">
        <as-filter-fake3d :image="image" :scale="20" depth="/mount-map.jpg"></as-filter-fake3d>
      </template>
    </AsImage>
  </div>
</template>

<style>
.banner {
  width: 100%;
}
.placeholder {
  width: 100%;
  height: 100%;
  background-color: #eee;
}
</style>
