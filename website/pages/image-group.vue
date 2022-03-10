<script setup lang="ts">
import Fake3d from '@vue-awesome-image/filter-fake3d'
import AsImageGroup from '@vue-awesome-image/as-image-group'
import '@vue-awesome-image/as-image-group/dist/style.css'
const activeIndex = ref(0);
</script>

<template>
  <div class="container mx-auto sm:py-10">
    <div>
        <AsImageGroup
          v-model="activeIndex" :transition="'directionalwrap'"
        >
          <template
            #images="{
              onImageLoaded
            }"
          >
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
              :to-group="onImageLoaded(0)"
            >
              <template #loading>
                <div class="placeholder" />
              </template>
            </AsImage>
          </template>
        </AsImageGroup>

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
