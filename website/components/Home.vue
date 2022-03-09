<script setup lang="ts">
import Fake3d from '@vue-awesome-image/filter-fake3d'

</script>

<template>
  <div>
    <div>
      <div>
        <AsImage
          class="banner"
          :width="1080"
          :height="722"
          :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/mount.jpg'"
          :lazy="true"
          :duration="2"
          format="png"
          :auto-webp="true"
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
            <Fake3d :image="image" depth="//d3skwsdk169y0b.cloudfront.net/image/fake3d/mount-map.jpg" />
          </template>
        </AsImage>
        <NuxtLink
          class="btn m-3 text-sm"
          to="/restful/page-view"
        >
          RESTful Api
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style>
.banner {
  width: 100%;
}
.placeholder {
  width: 100%;
  height: 100%;
  background: #eee;
  color: rgb(78, 78, 78);
}
</style>
