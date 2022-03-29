<script setup lang="ts">
import { AsFilterGlitch } from '@awesome-image/filter-glitch'
import { AsTransition } from '@awesome-image/transition'
import '@awesome-image/transition/dist/style.css'
import '@awesome-image/image/dist/style.css'

const src1 = `
  <AsImage
    class="banner"
    :width="2800"
    :height="1400"
    :src="'//d3skwsdk169y0b.cloudfront.net/image/banner/3.jpg'"
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
      <AsFilterGlitch :image="image" />
    </template>
  </AsImage>
`
const src4 = `
  <AsTransition
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
  </AsTransition>
`

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
  '//d3skwsdk169y0b.cloudfront.net/image/banner/5.jpg',
]
</script>

<template>
  <div class="main" pb-20>
    <div>
      <div>
        <div text-xl mt-10>
          SSR: Load before hydrating
        </div>
        <AsImage
          class="banner"
          :width="2800"
          :height="1400"
          :src="'//d3skwsdk169y0b.cloudfront.net/image/banner/3.jpg'"
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
        <div text-xl mt-10>
          {{ $t('demo.basic.title') }}
        </div>
        <!-- <div>{{ $t('demo.basic.desc')}}</div> -->
        <AsImage
          v-for="(src, key) in products"
          :key="key"
          class="banner"
          :width="1408"
          :height="1408"
          :src="src"
          :lazy="true"
          :responsive="true"
          :progressive="true"
          :auto-webp="true"
          image-lazy-offset="0px"
        >
          <template #loading>
            <div class="placeholder" />
          </template>
        </AsImage>

        <Highlight :code="src2"></Highlight>
      </div>

      <div>
        <div text-xl mt-10>
          <NuxtLink to="/webgl-filter" text-blue-500>
            {{ $t('webglFilter.title') }}
          </NuxtLink>
        </div>
        <!-- <div>{{ $t('webglFilter.description')}}</div> -->
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
            <AsFilterGlitch :image="image" />
          </template>
        </AsImage>
        <Highlight :code="src3"></Highlight>
      </div>

      <div>
        <div text-xl mt-10 mb-3>
          <NuxtLink to="/transition" text-blue-500>
            WebGL Transition
          </NuxtLink>
        </div>
        <!-- <div>{{ $t('transition.description') }}</div> -->
        <!-- <div>
          <span class="carousel-btn" @click="prev">prev</span><span class="carousel-btn" @click="next">next</span>
        </div> -->
        <AsTransition
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
              v-for="(src, i) in images"
              :key="i"
              class="banner"
              :width="2800"
              :height="1400"
              :src="src"
              :to-group="toGroupWithIndex(i)"
            >
              <template #loading>
                <div class="placeholder" />
              </template>
            </AsImage>
          </template>
        </AsTransition>
        <Highlight :code="src4"></Highlight>
      </div>
    </div>
  </div>
</template>
<style>

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
