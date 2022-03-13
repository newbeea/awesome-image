<script setup lang="ts">
import Fake3d from '@vue-awesome-image/filter-fake3d'
import AsImageGroup from '@vue-awesome-image/as-image-group'
import '@vue-awesome-image/as-image-group/dist/style.css'
import {ArrowCircleLeft, ArrowCircleRight} from '@icon-park/vue-next';
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
  <div mx-auto pt-10 max-w-1024px>
    <div>
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
              <template #loading>
                <div class="placeholder" />
              </template>
            </AsImage>
            
          </template>
        </AsImageGroup>

    </div>
    <div p-3>
      <div>
        <ArrowCircleLeft text-3xl mr-3 text-gray-700 @click="prev"></ArrowCircleLeft> 
      
        <ArrowCircleRight text-3xl text-gray-700 @click="next"></ArrowCircleRight> 
        </div>
      <div>Current: {{current}}</div>
      <div cursor-pointer @click="setActiveItem">Set index = 2</div>

      <div py-10>
        <div text-2xl>{{ $t('attrs.name') }}</div>
        <div flex>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('attrs.name')}}</div>
            <div text-xs py-1>initial-index</div>
            <div text-xs py-1>auto-play</div>
            <div text-xs py-1>interval</div>
            <div text-xs py-1>transition</div>
          </div>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('desc')}}</div>
            <div text-xs py-1>{{ $t('attrs.initIndex')}}</div>
            <div text-xs py-1>{{ $t('attrs.autoPlay')}}</div>
            <div text-xs py-1>{{ $t('attrs.interval')}}</div>
            <div text-xs py-1>{{ $t('attrs.transition')}}</div>
          </div>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('type')}}</div>
            <div text-xs py-1>number</div>
            <div text-xs py-1>boolean</div>
            <div text-xs py-1>number</div>
            <div text-xs py-1>Transition</div>
          </div>
          
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('optional')}}</div>
            <div text-xs py-1>-</div>
            <div text-xs py-1>-</div>
            <div text-xs py-1>-</div>
            <div text-xs py-1>-</div>
          </div>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('default')}}</div>
            <div text-xs py-1>0</div>
            <div text-xs py-1>true</div>
            <div text-xs py-1>3000</div>
            <div text-xs py-1>{ name: "default"}</div>
          </div>  
        </div>
       
       
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
