<script setup lang="ts">
import Fake3d from '@vue-awesome-image/filter-fake3d'
import AsImageGroup from 'as-image-group'
import 'as-image-group/dist/style.css'
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

      <div py-10>
        <div text-2xl>{{ $t('event.name') }}</div>
        <div flex>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('event.name')}}</div>
            <div text-xs py-1>change</div>
          </div>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('desc')}}</div>
            <div text-xs py-1>{{ $t('event.change.desc')}}</div>

          </div>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('event.callback')}}</div>
            <div text-xs py-1>{{ $t('event.change.params')}}</div>
          </div>
        </div>
      </div>
      <div py-10>
        <div text-2xl>{{ $t('method.name') }}</div>
        <div flex>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('method.name')}}</div>
            <div text-xs py-1>prev</div>
            <div text-xs py-1>next</div>
            <div text-xs py-1>setActiveItem</div>
          </div>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('desc')}}</div>
            <div text-xs py-1>{{ $t('method.prev.desc')}}</div>
            <div text-xs py-1>{{ $t('method.next.desc')}}</div>
            <div text-xs py-1>{{ $t('method.setActiveItem.desc')}}</div>

          </div>
          <div w-full>
            <div text-1xl pb-2 pt-4>{{ $t('method.params')}}</div>
            <div text-xs py-1>-</div>
            <div text-xs py-1>-</div>
            <div text-xs py-1>{{ $t('method.setActiveItem.params')}}</div>
          </div>
        </div>
      </div>

      <div py-10>
        <div text-2xl pb-5>{{ $t('usage.basic') }}</div>
        <iframe src="https://codesandbox.io/embed/exciting-albattani-nncsy7?fontsize=14&hidenavigation=1&theme=dark"
          style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
          title="image-group-basic"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
      </div>

      <div py-10>
        <div text-2xl>Transition</div>
        <div text-1xl pb-2 pt-4>{{ $t('usage.transition.buildin') }} <a text-blue-500 href="https://github.com/newbeea/as-image/blob/master/packages/as-image-group/src/transitions.ts">More</a></div>
        <div text-xs py-1>
          {
            "name": "default"
          }
          {
            "name": "windowslice"
          }
          {
            "name": "directionalwrap"
          }
        </div>


        <div text-1xl pb-2 pt-4>gl-transition <a text-blue-500 href="https://github.com/gl-transitions/gl-transitions">More</a></div>
        <div text-xs py-1>{{ $t('usage.transition.gl')}}</div>
        <iframe src="https://codesandbox.io/embed/image-group-transition-b81gdl?fontsize=14&hidenavigation=1&theme=dark"
          style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
          title="image-group-transition"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>


        <div text-1xl pb-2 pt-4>{{ $t('usage.transition.custom') }} <a text-blue-500 href="https://github.com/newbeea/as-image/blob/master/packages/as-image-group/src/transitions.ts">More</a></div>
        <div text-xs py-1>{{ $t('usage.transition.uniform') }}: progress(0-1), next(boolean, true: next, false: prev)</div>
        <div text-xs py-1>Example:</div>
        <pre text-xs py-1>
{
  "shader": `
    uniform float count; // = 10.0
    uniform float smoothness; // = 0.5
    vec4 transition (vec2 p) {
      float pr = smoothstep(-smoothness, 0.0, p.x - progress * (1.0 + smoothness));
      float s = step(pr, fract(count * p.x));
      return mix(getFromColor(p), getToColor(p), s);
    }
  `,
  "uniforms": {
    count: 10,
    smoothness: 0.5,
  },
}
          
        </pre>
        <iframe src="https://codesandbox.io/embed/image-group-transition-custom-xk355h?fontsize=14&hidenavigation=1&theme=dark"
          style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
          title="image-group-transition-custom"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        ></iframe>
        
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
