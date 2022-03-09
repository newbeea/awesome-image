<script setup lang="ts">
import AsImage from '@vue-awesome-image/as-image'
import '@vue-awesome-image/as-image/dist/style.css'
</script>

<template>
  <div>
    <div>
      <div>
        <AsImage
          class="banner"
          :width="999"
          :height="1424"
          :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/dress.jpg'"
          :lazy="false"
          :duration="2"
          :quantity="90"
          format="png"
          :auto-webp="true"
          :progressive="true"
          :responsive="true"

        >
          <template #loading>
            <div class="placeholder" />
          </template>

          <!-- <template
            #webglfilter="{
              image
            }"
          >
            <Fake3d :image="image" depth="//d3skwsdk169y0b.cloudfront.net/image/fake3d/dress-depth.jpg" />
          </template> -->
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
