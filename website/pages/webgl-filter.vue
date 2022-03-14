<script setup lang="ts">
import Fake3d from '@vue-awesome-image/filter-fake3d'

const src = `
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


</script>

<template>
  <div class="main">
    <div>
      <div text-2xl mt-2>
        {{ $t('webglFilter.title')}}
      </div>
      <div text-base mt-2>
        {{ $t('webglFilter.description')}}
      </div>
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
      <Highlight :code="src"></Highlight>
    </div>
    <div>
      
      <div text-2xl pt-6>
        {{ $t('buildInFilter')}}
      </div>
      <div>
        <div text-xl mt-2>
          @vue-awesome-image/filter-fake3d
        </div>
        <div text-base my-2>
          {{ $t('usage.basic')}}
        </div>
        <div text-sm>
          {{ $t('usage.fake3d.usage', ['@vue-awesome-image/as-image', '@vue-awesome-image/filter-fake3d'])}}
        </div>

        <div flex>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('attrs.name')}}</div>
            <div text-xs py-1>image</div>
            <div text-xs py-1>depth</div>
          </div>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('desc')}}</div>
            <div text-xs py-1>{{ $t('attrs.image')}}</div>
            <div text-xs py-1>{{ $t('attrs.depth')}}<a text-blue-500 href="https://huggingface.co/spaces/pytorch/MiDaS">MiDas</a></div>
          </div>
        </div>
        
        <div my-10>
          {{ $t('webglFilter.description')}}
          <iframe src="https://codesandbox.io/embed/image-filter-fake3d-0673d4?fontsize=14&hidenavigation=1&theme=dark"
            style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
            title="image-filter-fake3d"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </div>

      <div>
        <div text-xl mt-2>
          @vue-awesome-image/filter-glitch
        </div>
        <div text-base my-2>
          {{ $t('usage.basic')}}
        </div>
        <div text-sm>
          {{ $t('usage.glitch.usage', ['@vue-awesome-image/as-image', '@vue-awesome-image/filter-glitch'])}}
        </div>

        <div flex>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('attrs.name')}}</div>
            <div text-xs py-1>image</div>
          </div>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('desc')}}</div>
            <div text-xs py-1>{{ $t('attrs.image')}}</div>
          </div>
        </div>

        <div my-10>
          <iframe src="https://codesandbox.io/embed/image-filter-glitch-roting?fontsize=14&hidenavigation=1&theme=dark"
            style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
            title="image-filter-glitch"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </div>
      
      
    </div>
    
    <div>
      <div text-2xl>
        {{ $t('customFilter.title')}}
      </div>
      <div text-sm mt-2>
        {{ $t('customFilter.how', ['@vue-awesome-image/filter-glitch', '@gl-widget/gl-widget'])}}
      </div>
      <div>
        <a text-sm text-blue-500 href="https://github.com/newbeea/as-image/tree/master/packages/filters/glitch">@vue-awesome-image/filter-glitch</a>
      </div>
      <div>
        <a text-sm text-blue-500 href="https://www.philxu.cn/gl-widget/gl-widget.html">@gl-widget/gl-widget</a>
      </div>
      <div mt-2>
        <div my-1>Custom filter example:</div>
        <iframe src="https://codesandbox.io/embed/image-filter-custom-1rcw2f?fontsize=14&hidenavigation=1&theme=dark"
          style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
          title="image-filter-custom"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
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
