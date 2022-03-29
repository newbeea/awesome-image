<template>
  <div>
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
        <as-filter-glitch :image="image" :scale="20" depth="/banner-depth.png"></as-filter-glitch>
      </template>
    </AsImage>
  </div>
</template>

<style>
.placeholder {
  width: 100%;
  height: 100%;
  background-color: #eee;
}
</style>
