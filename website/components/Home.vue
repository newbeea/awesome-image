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
const products = [
  '//d3skwsdk169y0b.cloudfront.net/image/product/2.jpg',
  '//d3skwsdk169y0b.cloudfront.net/image/product/3.jpg',
  '//d3skwsdk169y0b.cloudfront.net/image/product/4.jpg',
]
const images = [
  '//d3skwsdk169y0b.cloudfront.net/image/banner/1.jpg',
  '//d3skwsdk169y0b.cloudfront.net/image/banner/2.jpg',
  '//d3skwsdk169y0b.cloudfront.net/image/banner/3.jpg',
  '//d3skwsdk169y0b.cloudfront.net/image/banner/4.jpg',
  '//d3skwsdk169y0b.cloudfront.net/image/banner/5.jpg'
]
</script>

<template>
  <div class="main">
    <div>
      <div>
        <AsImage
          class="banner"
          :width="2800"
          :height="1400"
          :src="'//d3skwsdk169y0b.cloudfront.net/image/banner/3.jpg'"
          :format="'png'"
          :progressive="true"
          :responsive="true"
        >
          <template #loading>
            <div class="placeholder" />
          </template>
        </AsImage>
        <Highlight :code="src1"></Highlight>
      </div>
      <div my-10>
        <div text-4xl mb-3>Vue Awesome Image</div>
        <div text-2xl py-2>{{ $t('info.feature.title') }}</div>
        <div text-xl my-2><a href="">{{ $t('info.lazyload.title') }}</a></div>
        <div pb-2>{{ $t('info.lazyload.desc') }}</div>
        <div text-xl my-2><a href="">{{ $t('info.responsive.title') }}</a></div>
        <div pb-2>{{ $t('info.responsive.desc') }}</div>
        <div text-xl my-2><a href="">{{ $t('info.progressive.title') }}</a></div>
        <div pb-2>{{ $t('info.progressive.desc') }}</div>
        <div text-xl my-2><a href="">{{ $t('info.webp.title') }}</a></div>
        <div pb-2>{{ $t('info.webp.desc') }}</div>
        <div text-xl my-2><a href="">{{ $t('info.service.title') }}</a></div>
        <div pb-2>{{ $t('info.service.desc') }}</div>
        <div text-xl my-2><a href="">{{ $t('info.filter.title') }}</a></div>
        <div pb-2>{{ $t('info.filter.desc') }}</div>
        <div text-xl my-2><a href="">{{ $t('info.swiper.title') }}</a></div>
        <div pb-2>{{ $t('info.swiper.desc') }}</div>

      </div>
      <div>
        <div text-xl mt-10>{{ $t('demo.basic.title')}}</div>
        <div>{{ $t('demo.basic.desc')}}</div>
        <AsImage
          v-for="(src, key) in products"
          :key="key"
          class="banner"
          :width="1408"
          :height="1408"
          :src="src"
          :lazy="true"
          :autoWebp="true"
          :responsive="true"
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
        <div text-xl mt-10>{{ $t('webglFilter.title')}}</div>
        <div>{{ $t('webglFilter.description')}}</div>
        <AsImage
          class="banner"
          :width="2800"
          :height="1400"
          :src="'//d3skwsdk169y0b.cloudfront.net/image/fake3d/7.jpg'"
        >
          <template #loading>
            <div class="placeholder" />
          </template>

          <template
            #webglfilter="{
              image
            }"
          >
            <Fake3d :image="image" depth="//d3skwsdk169y0b.cloudfront.net/image/fake3d/7-map.jpg" :scaleX="0.5" :scaleY="0.8" />
          </template>
        </AsImage>
        <Highlight :code="src3"></Highlight>
      </div>

      <div>
        <div text-xl mt-10>{{ $t('transition.title')}}</div>
        <div>{{ $t('transition.description')}}</div>
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
              :width="2800"
              :height="1400"
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
