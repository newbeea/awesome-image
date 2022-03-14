<script setup lang="ts">
import Fake3d from '@vue-awesome-image/filter-fake3d'
import AsImageGroup from '@vue-awesome-image/as-image-group'
import '@vue-awesome-image/as-image-group/dist/style.css'

const activeIndex = ref(0)

const src1 = `
  <AsImage
    :width="1080"
    :height="722"
    :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/mount.jpg'"
    :progressive="true"
    :responsive="true"
  >
    <template #loading>
      <div class="placeholder" />
    </template>
  </AsImage>
`
const src2 = `
  <AsImage
    :width="1080"
    :height="722"
    :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/canyon.jpg'"
    :lazy="true"
    :progressive="true"
    imageLazyOffset="0px"
  >
    <template #loading>
      <div class="placeholder" />
    </template>
  </AsImage>
`

const src3 = `
  <AsImage
    class="banner"
    :width="1080"
    :height="722"
    :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/ball.jpg'"
  >
    <template #loading>
      <div class="placeholder" />
    </template>

    <template
      #webglfilter="{
        image
      }"
    >
      <Fake3d :image="image" depth="//d3skwsdk169y0b.cloudfront.net/image/fake3d/ball-map.jpg" />
    </template>
  </AsImage>
`
const src4 = `
  <AsImageGroup
    ref="banner"
    :transition="{
      name: 'directionalwrap'
    }"
    @change="onChange"
  >
    <template
      #images="{
        toGroupWithIndex
      }"
    >
      <AsImage
        class="banner"
        :width="1080"
        :height="722"
        v-for="(src, i) in images"
        :key="i"
        :src="src"
        :to-group="toGroupWithIndex(i)"
      >
      </AsImage>
      
    </template>
  </AsImageGroup>
`

const banner = ref<typeof AsImageGroup>()
const next = () => {
  banner.value?.next()
}
const prev = () => {
  banner.value?.prev()
}

const setActiveItem = () => {
  banner.value?.setActiveItem(2)
}

const current = ref(0)
const onChange = (i, j) => {
  current.value = i
}
const images = [
  '//d3skwsdk169y0b.cloudfront.net/image/fake3d/mount.jpg',
  '//d3skwsdk169y0b.cloudfront.net/image/fake3d/lady.jpg',
  '//d3skwsdk169y0b.cloudfront.net/image/fake3d/canyon.jpg'
]
</script>

<template>
  <div class="main">
    <div>
      <div>
        <div>Responsive / Progressive / Load immediately in SSR mode</div>
        <AsImage
          class="banner"
          :width="1080"
          :height="722"
          :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/mount.jpg'"
          :progressive="true"
          :responsive="true"
        >
          <template #loading>
            <div class="placeholder" />
          </template>
        </AsImage>
        <Highlight :code="src1"></Highlight>
      </div>

      <div>
        <div>Lazy / Progressive</div>
        <AsImage
          class="banner"
          :width="1080"
          :height="722"
          :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/mount.jpg'"
          :lazy="true"
          :progressive="true"
          imageLazyOffset="0px"
          placeholderLazyOffset="0px"
        >
          <template #loading>
            <div class="placeholder" />
          </template>
        </AsImage>
        <AsImage
          class="banner"
          :width="1080"
          :height="722"
          :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/lady.jpg'"
          :lazy="true"
          :progressive="true"
          imageLazyOffset="0px"
          placeholderLazyOffset="0px"
        >
          <template #loading>
            <div class="placeholder" />
          </template>
        </AsImage>
        <AsImage
          class="banner"
          :width="1080"
          :height="722"
          :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/canyon.jpg'"
          :lazy="true"
          :progressive="true"
          imageLazyOffset="0px"
          placeholderLazyOffset="0px"
        >
          <template #loading>
            <div class="placeholder" />
          </template>
        </AsImage>
        <Highlight :code="src2"></Highlight>
      </div>

      <div>
        <div>Webgl filter</div>
        <AsImage
          class="banner"
          :width="1080"
          :height="722"
          :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/ball.jpg'"
        >
          <template #loading>
            <div class="placeholder" />
          </template>

          <template
            #webglfilter="{
              image
            }"
          >
            <Fake3d :image="image" depth="//d3skwsdk169y0b.cloudfront.net/image/fake3d/ball-map.jpg" />
          </template>
        </AsImage>
        <Highlight :code="src3"></Highlight>
      </div>

      <div>
        <div>Carousel with webgl transition</div>
        <div>
          <span class="carousel-btn" @click="prev">prev</span><span class="carousel-btn" @click="next">next</span>
        </div>
        <AsImageGroup
          ref="banner"
          :transition="{
            name: 'directionalwrap'
          }"
          @change="onChange"

        >
          <template
            #images="{
              toGroupWithIndex
            }"
          >
            <AsImage
              class="banner"
              :width="1080"
              :height="722"
              v-for="(src, i) in images"
              :key="i"
              :src="src"
              :to-group="toGroupWithIndex(i)"
            >
            </AsImage>
            
          </template>
        </AsImageGroup>
        <Highlight :code="src4"></Highlight>
      </div>
    </div>
  </div>
</template>
<style>
.main {
  padding: 20px;
}
.banner {
  width: 100%;
  margin-top: 10px;
}
.placeholder {
  width: 100%;
  height: 100%;
  background: #eee;
  color: rgb(78, 78, 78);
}
.carousel-btn {
  cursor: pointer;
  margin-right: 10px;
}

</style>
